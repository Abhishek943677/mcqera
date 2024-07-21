import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "react-quill/dist/quill.snow.css";
import Editor from "../editor/Editor";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSession } from "next-auth/react";
import { Button } from "@mui/material";
import Spinner from "../widgets/Spinner";
import axios from "axios";
import SuccessSnackBar from "../widgets/SuccessSnackBar";
import FailureSnackBar from "../widgets/FailureSnackBar";
import { useRouter } from "next/router";
import ChangeTrade from "../question/ChangeTrade";
import ChangeSubject from "../question/ChangeSubject";

export default function AddQuestion({ courseObj, setShowAdminAPanel }) {
  const { data: session } = useSession();

  const [trade, setTrade] = useState("");
  const [subject, setSubject] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [courses, setCourses] = useState([]);
  const [sent, setSent] = useState(false);
  const [openSuccessSnack, setOpenSuccessSnack] = useState(false);
  const [openFailureSnack, setOpenFailureSnack] = useState(false);
  const [questionId, setQuestionId] = useState("");
  const router = useRouter();

  const initialQuestionState = {
    question: "",
    trueOpt: "",
    falseOpt1: "",
    falseOpt2: "",
    falseOpt3: "",
    detail: "",
  };
  const [que, setQue] = useState(initialQuestionState);

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
    axios
      .post("/api/question/save", {
        que,
        trade,
        subject,
        author: session.user.email,
      })
      .then((p) => {
        setSent(false);
        if (p.data.ok) {
          setOpenSuccessSnack(true);
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;

          // this is important line of code to reset all the fields. actually this is Jugad
          setShowAdminAPanel(() => true);
          setTimeout(() => {
            setShowAdminAPanel(() => false);
          }, 100);
        } else {
          setOpenFailureSnack(true);
        }
      });

    localStorage.setItem("tradeAdmin", trade);
    localStorage.setItem("subjectAdmin", subject);
    localStorage.setItem("subjectsAdmin", JSON.stringify(subjects));
  };

  const handleChangeD = (value) => {
    setQue({ ...que, detail: value });
  };
  const handleChangeQ = (e) => {
    // setQue({ ...que, question: e.target.value });
    setQue({ ...que, question: e });
  };

  const handleChangeT = (e) => {
    // setQue({ ...que, trueOpt: e.target.value });
    setQue({ ...que, trueOpt: e });
  };
  const handleChangeF1 = (e) => {
    // setQue({ ...que, falseOpt1: e.target.value });
    setQue({ ...que, falseOpt1: e });
  };
  const handleChangeF2 = (e) => {
    // setQue({ ...que, falseOpt2: e.target.value });
    setQue({ ...que, falseOpt2: e });
  };
  const handleChangeF3 = (e) => {
    // setQue({ ...que, falseOpt3: e.target.value });
    setQue({ ...que, falseOpt3: e });
  };

  return (
    <div className="flex my-6 flex-col h-full mx-auto w-full">
      <SuccessSnackBar open={openSuccessSnack} setOpen={setOpenSuccessSnack} />
      <FailureSnackBar open={openFailureSnack} setOpen={setOpenFailureSnack} />

      <div className="flex  flex-col p-2 h-full mx-auto sm:w-9/12 lg:w-7/12 md:8/12 max-[640px]:w-10/12">
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
      </div>

      <Editor
        label="Question"
        value={que.question}
        handleChange={handleChangeQ}
      />
      <Editor
        label="correct answer"
        value={que.trueOpt}
        handleChange={handleChangeT}
      />
      <Editor
        label="Wrong Answer 1"
        value={que.falseOpt1}
        handleChange={handleChangeF1}
      />
      <Editor
        label="Wrong Answer 2"
        value={que.falseOpt2}
        handleChange={handleChangeF2}
      />
      <Editor
        label="Wrong Answer 3"
        value={que.falseOpt3}
        handleChange={handleChangeF3}
      />

      <Editor
        label="Write the details"
        value={que.detail}
        handleChange={handleChangeD}
      />

      <div className="h-fit mx-auto my-2 w-full flex justify-center">
        <Button
          type="submit"
          variant="contained"
          color="success"
          className="w-40 mx-auto my-5"
          disabled={sent}
          onClick={(e) => {
            e.preventDefault();
            setSent(() => true);
            handleSave();
          }}
        >
          {/* save question */}
          {sent ? <Spinner /> : "save question"}
        </Button>
      </div>

      <p className="text-center">
        Details written in details section appears same as here
      </p>
      <div
        dangerouslySetInnerHTML={{ __html: que.detail }}
        id="question"
        className="border rounded-lg lg:w-[80%] md:w-full sm:w-full mx-auto p-2"
      />
    </div>
  );
}
