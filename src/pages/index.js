import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import ChangeTrade from "../../components/ChangeTrade";
import ChangeSubject from "../../components/ChangeSubject";
import { loadCourseObj } from "../../logics/loadCourseObj";

export default function Home({courseObj}) {

  console.log(courseObj);
  
  const [trade, setTrade] = useState("");
  const [subject, setSubject] = useState("");
  const [subjects, setSubjects] = useState([]);
  const[courses,setCourses]=useState([])
  const [start,setStart]=useState(false)
  const router=useRouter()

  useEffect(() => {
    if (localStorage.tradeHome && localStorage.subjectHome && localStorage.subjectsHome) {
      setCourses(courseObj)
      setTrade(() => localStorage.tradeHome);
      setSubject(() => localStorage.subjectHome);
      setSubjects(JSON.parse(localStorage.getItem("subjectsHome")));

    } else {
        setCourses(courseObj)
        setSubject(courseObj[0].subjects[0]);
        setTrade(courseObj[0].trade);
        setSubjects(courseObj[0].subjects);
    }
  }, []);

  return (
    <div className="flex my-6 flex-col p-4 h-full mx-auto w-2/4">
      <ChangeTrade trade={trade} courses={courses} setTrade={setTrade} setSubject={setSubject} setSubjects={setSubjects} />
      <ChangeSubject subject={subject} subjects={subjects} setSubject={setSubject} />

      <Button 
      color="success"
      variant="contained"
      onClick={()=>{
        setStart((p)=>true);
        localStorage.setItem("tradeHome", trade);
        localStorage.setItem("subjectHome", subject);
        localStorage.setItem("subjectsHome", JSON.stringify(subjects));
        router.push(`/quiz/${trade}/${subject}/1`)
      }}>start quiz</Button>

  </div>
  )  
}

export async function getServerSideProps(){
  var courseObj = await loadCourseObj()
  return {
    props:{courseObj}
  }
} 
