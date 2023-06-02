import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, Paper } from "@mui/material";
import ChangeTrade from "../../components/ChangeTrade";
import ChangeSubject from "../../components/ChangeSubject";
import { loadCourseObj } from "../../logics/loadCourseObj";
import { clientQuickLinks } from "../../lib/sanityConnect";
import QuickLinks from "../../components/QuickLinks";
import getQuickLinkData from "../../logics/getQuickLinkData";
import { NextSeo } from "next-seo";
// import { mongoConnectUser } from "../../lib/mongoConnectUser";


const Home = ({ courseObj, quicklinks }) => {
  console.log(courseObj)

  const [trade, setTrade] = useState("");
  const [subject, setSubject] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [courses, setCourses] = useState([]);
  const [start, setStart] = useState(false);
  const router = useRouter();

  useEffect(() => {

    if (
      localStorage.tradeHome &&
      localStorage.subjectHome &&
      localStorage.subjectsHome
    ) {
      setCourses(courseObj);
      setTrade(() => localStorage.tradeHome);
      setSubject(() => localStorage.subjectHome);
      setSubjects(JSON.parse(localStorage.getItem("subjectsHome")));
    } else {
      setCourses(courseObj);
      setSubject(courseObj[0].subjects[0]);
      setTrade(courseObj[0].trade);
      setSubjects(courseObj[0].subjects);
    }
  }, []);

  return (
    <div>
      {/* seo things */}
      <NextSeo
        title="mcqera"
        description={`Discover a comprehensive collection of multiple choice questions on our website. Enhance your knowledge and test your skills with our diverse range of MCQs covering various subjects.  Join our community of learners and gain confidence in tackling multiple choice questions effectively. Start your learning journey today!`}
      />
      {/* end seo */}
      
      <header className="flex  flex-col p-2 h-full mx-auto sm:w-9/12 lg:w-7/12 md:8/12 max-[640px]:w-10/12">
        <ChangeTrade
          trade={trade}
          courses={courses}
          setTrade={setTrade}
          setSubject={setSubject}
          setSubjects={setSubjects}
        />
        <ChangeSubject
          subject={subject}
          subjects={subjects}
          setSubject={setSubject}
        />

        <Button
          color="success"
          variant="contained"
          onClick={() => {
            setStart((p) => true);
            localStorage.setItem("tradeHome", trade);
            localStorage.setItem("subjectHome", subject);
            localStorage.setItem("subjectsHome", JSON.stringify(subjects));

            router.push(`/quiz/${trade}/${subject}/1`);
          }}
        >
          start quiz
        </Button>
      </header>

      <QuickLinks data={quicklinks} />
    </div>
  );
}


export async function getStaticProps() {
  const quicklinks = await getQuickLinkData();
  var courseObj = await loadCourseObj();

  // const userDb=await mongoConnectUser()
  // const collection = userDb.collection("user-list"); //accessing collection of trade

  //     const userList = await collection
  //       .find({}) // finding data from trade collection with subject name
  //       .toArray();
  //       console.log(userList)

  return {
    props: { courseObj, quicklinks },
    revalidate: 60,
  };
}

export default Home