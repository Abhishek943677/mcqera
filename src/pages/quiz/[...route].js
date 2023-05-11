import React, { useEffect, useState } from "react";
import AllQuestions from "../../../components/AllQuestions";
import PaginationModal from "../../../components/Pagination";
import ChangeSubject from "../../../components/ChangeSubject";
import { useRouter } from "next/router";
import ChangeTrade from "../../../components/ChangeTrade";
import { Button, Typography } from "@mui/material";
import { loadCourseObj } from "../../../logics/loadCourseObj";
import { mongoConnect } from "../../../lib/mongoConnect";
import { pathsArrayForQuiz } from "../../../logics/pathsArrayForQuiz";

export default function Page({
  questions,
  noOfPageForPagination,
  UserBlogPage,
  courseObj,
}) {
  const [trade, setTrade] = useState("");
  const [subject, setSubject] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [courses, setCourses] = useState([]);

  const router = useRouter();

  useEffect(() => {

    setTrade(router.query.route[0]);
    setSubject(router.query.route[1]);
    setCourses(courseObj);

    const getSubjects = courseObj.find(
      (ele) => ele.trade === router.query.route[0]
    );
    // console.log(getSubjects.subjects) // ['mos', 'dos', 'fluuid', 'concrete']

    if (getSubjects) {
      setSubjects(getSubjects?.subjects);
    } else {
      setSubjects([]);
    }
  }, []);

  //if questions change then reset all the options with no background color
  useEffect(() => {
    // console.log(questions)

    if (document.getElementsByClassName("option")) {
      const allOptionsButton = document.getElementsByClassName("option");

      for (let index = 0; index < allOptionsButton.length; index++) {
        const element = allOptionsButton[index];
        // console.log(element.textContent)
        element.style.backgroundColor = "";
        // element.classList.remove("active","no-active")
      }
    }

  }, []);

  return (
    <div>
      
      <div className="sm:w-3/4 lg:w-4/12 mx-auto mt-20 px-4 justify-center">

        {/* {" "} */}
        {/* div for trade and subject*/}
        {/* html for change trade */}
        <ChangeTrade
          className="my-auto"
          trade={trade}
          courses={courses}
          setTrade={setTrade}
          setSubject={setSubject}
          setSubjects={setSubjects}
        />

        {/* html for change subject */}
        <ChangeSubject
          subject={subject}
          subjects={subjects}
          setSubject={setSubject}
        />

        {/* change subject button */}
        <Button
          variant="contained"
          color="success"
          className="w-full mx-2"
          onClick={() => {
            console.log("clicked")
            router.push(`/quiz/${trade}/${subject}/1`);
            // window.location.href = `/quiz/${encodeURIComponent(
            // trade
            // )}/${encodeURIComponent(subject)}/1`;
          }}
        >
          change subject
        </Button>
      </div>

      {questions && questions.length === 0 ? (
        <div className="">
          <p className="text-lg text-center p-1">{`Bhosdik kuchh na h yha`}</p>
        </div>
      ) : (
        <AllQuestions questions={questions} />
      )}

      <PaginationModal
        noOfPageForPagination={noOfPageForPagination}
        currentPage={UserBlogPage}
      />
    </div>
  );
}






// paths defining 
export async function getStaticPaths() {

 const path=await pathsArrayForQuiz()

  return {
    // paths: [{ params: { route: ['electrical','network','1'] } },{ params: { route: ['electrical','network','2'] } }],
    paths: path,
    fallback:false,
  }
}



// this code runs on server
export async function getStaticProps(context) {
  var noOfPageForPagination, courseObj, stringifiedQuestion;
  var UserBlogPage = 1;
  try {
    courseObj = await loadCourseObj();

    //get userblog page from params
    if (context.params.route[2]) {
      UserBlogPage = context.params.route[2];
    }
    const skip = (UserBlogPage - 1) * 10; // how many question should skip from database for pagination purpose

    // get data from database
    const db = await mongoConnect(); // mongoConnect is a function which returns db
    const collection = db.collection(context.params.route[0]); //accessing collection of trade

    const questions = await collection
      .find({ subject: context.params.route[1] }) // finding data from trade collection with subject name
      .limit(10)
      .skip(skip)
      .toArray();

    const totalLengthOfCollection = await collection
      .find({ subject: context.params.route[1] })
      .count(); // counting number of question saved in one collection
    // console.log(totalLengthOfCollection);

    //pagination work
    noOfPageForPagination = Math.ceil(totalLengthOfCollection / 10);
    noOfPageForPagination === 0 ? (noOfPageForPagination = 1) : ""; // if there is no documents then set pagination at 1
    // console.log(noOfPageForPagination);

    stringifiedQuestion = JSON.stringify(questions); // if questions in not strigified the it it giving error at getServerSideprops

    stringifiedQuestion.length === 2 ? (stringifiedQuestion = []) : ""; // if there is no question then stringifiedQuestion.length=2
    // console.log(stringifiedQuestion); // lists array in string of questions with 10 objects 

    // context.res.setHeader(
    //   "Cache-Control",
    //   "public, s-maxage=100, stale-while-revalidate=300"
    // );

    return {
      props: {
        questions: stringifiedQuestion,
        noOfPageForPagination,
        UserBlogPage,
        courseObj,
      },
      revalidate:60,
    };
  } catch (error) {
    console.log(error)
    courseObj = await loadCourseObj();
    // console.log(error)
    return {
      props: { questions: [], courseObj, noOfPageForPagination: 1,UserBlogPage},
      revalidate: 60,
    };
  }
}












// // this code runs on server
// export async function getServerSideProps(context) {
//   var noOfPageForPagination, courseObj, stringifiedQuestion;
//   var UserBlogPage = 1;
//   try {
//     courseObj = await loadCourseObj();

//     //get userblog page from params
//     if (context.params.route[2]) {
//       UserBlogPage = context.params.route[2];
//     }
//     const skip = (UserBlogPage - 1) * 10; // how many question should skip from database for pagination purpose

//     // get data from database
//     const db = await mongoConnect(); // mongoConnect is a function which returns db
//     const collection = db.collection(context.params.route[0]); //accessing collection of trade

//     const questions = await collection
//       .find({ subject: context.params.route[1] }) // finding data from trade collection with subject name
//       .limit(10)
//       .skip(skip)
//       .toArray();

//     const totalLengthOfCollection = await collection
//       .find({ subject: context.params.route[1] })
//       .count(); // counting number of question saved in one collection
//     console.log(totalLengthOfCollection);

//     //pagination work
//     noOfPageForPagination = Math.ceil(totalLengthOfCollection / 10);
//     noOfPageForPagination === 0 ? (noOfPageForPagination = 1) : ""; // if there is no documents then set pagination at 1
//     // console.log(noOfPageForPagination);

//     stringifiedQuestion = JSON.stringify(questions); // if questions in not strigified the it it giving error at getServerSideprops

//     stringifiedQuestion.length === 2 ? (stringifiedQuestion = []) : ""; // if there is no question then stringifiedQuestion.length=2
//     // console.log(stringifiedQuestion); // lists array in string of questions with 10 objects

//     context.res.setHeader(
//       "Cache-Control",
//       "public, s-maxage=100, stale-while-revalidate=300"
//     );
//     return {
//       props: {
//         questions: stringifiedQuestion,
//         noOfPageForPagination,
//         UserBlogPage,
//         courseObj,
//       },
//     };
//   } catch (error) {
//     console.log(error)
//     courseObj = await loadCourseObj();
//     // console.log(error)
//     return {
//       props: { questions: [], courseObj, noOfPageForPagination: 1 },
//     };
//   }
// }
