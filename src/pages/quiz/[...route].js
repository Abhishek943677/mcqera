import React, { useEffect, useState } from "react";
import PaginationModal from "../../../components/Pagination";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import { loadCourseObj } from "../../../logics/loadCourseObj";
import { mongoConnect } from "../../../lib/mongoConnect";
import { NextSeo } from "next-seo";
import AllQuestions from "../../../components/question/AllQuestions";
import ChangeTrade from "../../../components/question/ChangeTrade";
import ChangeSubject from "../../../components/question/ChangeSubject";

export default function Page({
  questions,
  noOfPageForPagination,
  UserBlogPage,
  courseObj,
  serverTrade,
  serverSubject,
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

    //if questions change then reset all the options with no background color
    if (document.getElementsByClassName("option")) {
      const allOptionsButton = document.getElementsByClassName("option");
      // console.log(allOptionsButton[0])

      for (let index = 0; index < allOptionsButton.length; index++) {
        const element = allOptionsButton[index];
        element.style.backgroundColor = "";
      }
    }
  }, []);

  return (
    <div>
      {/* SEO .... */}
      <NextSeo
        title={`Questions of ${serverTrade} ${serverSubject} at page ${UserBlogPage} | Mcqera | MCQs`}
        description={`get top question of ${serverTrade} - ${serverSubject} question at page ${UserBlogPage} with answers and detailed solutions. Engage with interactive quizzes on various topics of ${serverTrade} ${serverSubject} and challenge yourself to improve your understanding and retention of key concepts.`}
        canonical={`https://mcqera.com/quiz/${serverTrade}/${serverSubject}/${UserBlogPage}`}
      />
      {/* ....SEO */}

      {/* <div className="sm:w-3/4 lg:w-4/12 mx-auto mt-20 px-4 justify-center"> */}
      <div className="sm:w-3/4 lg:w-6/12 mx-auto px-4 justify-center">
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
            router.push(`/quiz/${trade}/${subject}/1`);
          }}
        >
          change subject
        </Button>
      </div>

      <h1 className="text-xl p-1 mt-2">
        {serverSubject.charAt(0).toUpperCase() + serverSubject.slice(1)} MCQ
        Question with answer
      </h1>

      <PaginationModal
        noOfPageForPagination={noOfPageForPagination}
        currentPage={UserBlogPage}
      />

      {questions && questions.length === 0 ? (
        <div className="">
          <p className="text-lg text-center p-1">{` No Questions Uploaded, Please try again later......`}</p>
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
  const courseObj = await loadCourseObj();
  const db = await mongoConnect();

  const paths = [];

  // Use Promise.all to handle async operations within map
  await Promise.all(
    courseObj.map(async (item) => {
      const { trade, subjects } = item;

      // For each subject, perform async operations
      await Promise.all(
        subjects.map(async (subject) => {
          const collection = db.collection(trade);
          // Get the count of documents that match the subject query
          const estimatedNumberOfQuestions = await collection.countDocuments({subject});
          
          const totalPages = Math.ceil(estimatedNumberOfQuestions / 10);
          const pagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);

          // Map through the estimated page counts and create paths
          pagesArray.map((count) => {
            paths.push({
              params: {
                route: [String(trade), String(subject), String(count)],
              },
            });
          });
        })
      );
    })
  );


  return {
    paths,
    fallback: "blocking", // Choose appropriate fallback behavior
  };
}


// this code runs on server
export async function getStaticProps(context) {
  var noOfPageForPagination, courseObj, stringifiedQuestion;
  var UserBlogPage = 1;
  const questionsPerPage = 10;

  try {
    courseObj = await loadCourseObj();

    //get userblog page from params
    if (context.params.route[2]) {
      UserBlogPage = context.params.route[2];
    }
    const skip = (UserBlogPage - 1) * questionsPerPage; // how many question should skip from database for pagination purpose

    // get data from database
    const db = await mongoConnect(); // mongoConnect is a function which returns db
    const collection = db.collection(context.params.route[0]); //accessing collection of trade

    const questions = await collection
      .find({ subject: context.params.route[1] }) // finding data from trade collection with subject name
      .sort({ _id: -1 })
      .limit(questionsPerPage)
      .skip(skip)
      .toArray();
    // console.log(questions);

 
    const totalLengthOfCollection = await collection.countDocuments({subject:context.params.route[1]})

    //pagination work
    noOfPageForPagination = Math.ceil(
      totalLengthOfCollection / questionsPerPage
    );
    noOfPageForPagination === 0 ? (noOfPageForPagination = 1) : ""; // if there is no documents then set pagination at 1
    // console.log(noOfPageForPagination);

    stringifiedQuestion = JSON.stringify(questions); // if questions in not strigified the it it giving error at getServerSideprops

    stringifiedQuestion.length === 2 ? (stringifiedQuestion = []) : ""; // if there is no question then stringifiedQuestion.length=2
    // console.log(stringifiedQuestion); // lists array in string of questions with 10 objects

    // console.log(stringifiedQuestion);
    return {
      props: {
        questions: stringifiedQuestion,
        noOfPageForPagination,
        UserBlogPage,
        courseObj,
        serverTrade: context.params.route[0],
        serverSubject: context.params.route[1],
      },
      revalidate: 1200,
    };
  } catch (error) {
    // console.log(error)
    courseObj = await loadCourseObj();
    // console.log(error)
    return {
      props: {
        questions: [],
        courseObj,
        noOfPageForPagination: 1,
        UserBlogPage,
        serverTrade: context.params.route[0],
        serverSubject: context.params.route[1],
      },
      revalidate: 1200,
    };
  }
}
