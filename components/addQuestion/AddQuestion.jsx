import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import "react-quill/dist/quill.snow.css";
import Editor from "../editor/Editor";
import { useSession } from "next-auth/react";
import { Button } from "@mui/material";

import ChangeTrade from "../ChangeTrade";
import ChangeSubject from "../ChangeSubject";
import InputField from "../InputField";
import Spinner from "../widgets/Spinner";
import axios from "axios";
import SuccessSnackBar from "../widgets/SuccessSnackBar";
import FailureSnackBar from "../widgets/FailureSnackBar";

export default function AddQuestion({ courseObj }) {
  const { data: session } = useSession();

  const [trade, setTrade] = useState("");
  const [subject, setSubject] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [courses, setCourses] = useState([]);
  const [sent,setSent] =useState(false);
  const [openSuccessSnack,setOpenSuccessSnack] =useState(false)
  const [openFailureSnack,setOpenFailureSnack] =useState(false)

  const [que, setQue] = useState({
    question: "this is question",
    trueOpt: "this ans is true",
    falseOpt1: " sorry wrong",
    falseOpt2: "weong ans",
    falseOpt3: "oh no",
    detail: "wow details is amazing",
  });

  useEffect(() => {
    if (
      localStorage.tradeAdmin &&
      localStorage.subjectAdmin &&
      localStorage.subjectsAdmin
    ) {
      setCourses(courseObj);
      setTrade(() => localStorage.tradeAdmin);
      setSubject(() => localStorage.subjectAdmin);
      setSubjects(JSON.parse(localStorage.getItem("subjectsAdmin")));
    } else {
      setCourses(courseObj);
      setSubject(courseObj[0].subjects[0]);
      setTrade(courseObj[0].trade);
      setSubjects(courseObj[0].subjects);
    }
  }, []);

  const handleSave = () => {
    axios.post("/api/question/save", { que, trade, subject,id:uuidv4(),author:session.user.email }).then((p) => {
    // axios.post("/api/question/save", { que, trade, subject,id:uuidv4() }).then((p) => {
      setSent(false)
      console.log("this is data") 
      console.log(p.data)
      if(p.data.ok){
        setOpenSuccessSnack(true)
      }else{
        setOpenFailureSnack(true)
      }
    });
    // console.log(que);
    localStorage.setItem("tradeAdmin", trade);
    localStorage.setItem("subjectAdmin", subject);
    localStorage.setItem("subjectsAdmin", JSON.stringify(subjects));
  };

  const handleChangeD = (value) => {
    setQue({ ...que, detail: value });
  };
  const handleChangeQ = (e) => {
    setQue({ ...que, question: e.target.value });
  };
  const handleChangeT = (e) => {
    setQue({ ...que, trueOpt: e.target.value });
  };
  const handleChangeF1 = (e) => {
    setQue({ ...que, falseOpt1: e.target.value });
  };
  const handleChangeF2 = (e) => {
    setQue({ ...que, falseOpt2: e.target.value });
  };
  const handleChangeF3 = (e) => {
    setQue({ ...que, falseOpt3: e.target.value });
  };

  return (
    <div className="flex my-6 flex-col p-4 h-full mx-auto w-full">
      <SuccessSnackBar open={openSuccessSnack} setOpen={setOpenSuccessSnack} />
      <FailureSnackBar open={openFailureSnack} setOpen={setOpenFailureSnack} />

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

      <InputField
        label="Question"
        value={que.question}
        handleChange={handleChangeQ}
      />
      <InputField
        label="correct answer"
        value={que.trueOpt}
        handleChange={handleChangeT}
      />
      <InputField
        label="Wrong Answer 1"
        value={que.falseOpt1}
        handleChange={handleChangeF1}
      />
      <InputField
        label="Wrong Answer 2"
        value={que.falseOpt2}
        handleChange={handleChangeF2}
      />
      <InputField
        label="Wrong Answer 3"
        value={que.falseOpt3}
        handleChange={handleChangeF3}
      />

      <Editor label="write the details of the question" value={que.detail} handleChange={handleChangeD}/>

      <div className="h-fit mx-auto my-2">
        <Button
          type="submit"
          variant="contained"
          color="success"
          className="w-40"
          disabled={sent}
          onClick={(e) => {
            setSent(()=>true)
            e.preventDefault();
            handleSave();
          }}
        >
          {/* save question */}
          {sent ? <Spinner /> : "save question"}
        </Button>
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: que.detail }}
        className="border border-red-800"
      />
    </div>
  );
}
