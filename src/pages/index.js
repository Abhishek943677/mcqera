import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, Paper } from "@mui/material";
import { loadCourseObj } from "../../logics/loadCourseObj";
import getQuickLinkData from "../../logics/getQuickLinkData";
// import { mongoConnectUser } from "../../lib/mongoConnectUser";
import QuickLinks from "../../components/home/QuickLinks";
import ChangeTrade from "../../components/question/ChangeTrade";
import ChangeSubject from "../../components/question/ChangeSubject";

// const Home = ({ courseObj, quicklinks }) => {
const Home = ({ courseObj }) => {
  const [trade, setTrade] = useState("");
  const [subject, setSubject] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [courses, setCourses] = useState([]);
  const [start, setStart] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // setIsOpen(true)
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
      <h2 className="text-2xl text-center p-1">
        Test your prepration with us. ⬇️
      </h2>
      <section className="flex  flex-col p-2 h-full mx-auto sm:w-9/12 lg:w-7/12 md:8/12 max-[640px]:w-10/12">
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
      </section>

      {/* <QuickLinks data={quicklinks} /> */}
    </div>
  );
};

// --------------------------server side stuffs ----------------------
export async function getStaticProps() {
  // const quicklinks = await getQuickLinkData();
  const courseObj = await loadCourseObj();

  // const userDb = await mongoConnectUser();
  // const collection = userDb.collection("user-list"); //accessing collection of trade

  // const userList = await collection
  //   .find({}) // finding data from trade collection with subject name
  //   .toArray();
  // console.log(userList);

  return {
    // props: { courseObj, quicklinks },
    props: { courseObj },
    revalidate: 600,
  };
}

export default Home;
