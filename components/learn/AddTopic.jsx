import React, { useState, useEffect } from "react";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import SunEditorPanel from "./SunEditorPanel";
import { useRouter } from "next/router";
import SuccessSnackBar from "../widgets/SuccessSnackBar";
import FailureSnackBar from "../widgets/FailureSnackBar";
import Spinner from "../widgets/Spinner";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function AddTopic({ data }) {
  const [learnObj, setLearnObj] = useState([]);
  const [editorContent, setEditorContent] = useState("");
  const [course, setCourse] = useState("");
  const [subjectArray, setSubjectArray] = useState([]);
  const [subject, setSubject] = useState("");
  const [chapter, setChapter] = useState("");
  const [chapterArray, setChapterArray] = useState([]);
  const [topicName, setTopicName] = useState("");
  const [openSuccessSnack, setOpenSuccessSnack] = useState(false);
  const [openFailureSnack, setOpenFailureSnack] = useState(false);
  const [sent, setSent] = useState(false);

  const { data: session } = useSession();

  useEffect(() => {
    setLearnObj(() => JSON.parse(data));
    setCourse(() => JSON.parse(data)[0].course);
    setSubjectArray(() => JSON.parse(data)[0].subjectArray);
    setSubject(() => JSON.parse(data)[0].subjectArray[0].subject);
    setChapterArray(() => JSON.parse(data)[0].subjectArray[0].chapterArray);
    setChapter(() => JSON.parse(data)[0].subjectArray[0].chapterArray[0]);
  }, []);

  const handleSave = () => {
    // console.log(course, subject, chapter, topicName);
    // console.log(editorContent);
    axios
      .post("/api/learn/save", {
        course,
        subject,
        chapter,
        topicName,
        url: topicName.replaceAll(" ", "-") + "-" + Date.now(),
        content: editorContent,
        author: session.user.email,
      })
      .then((p) => {
        setSent(false);
        console.log(p.data);
        if (p.data.ok) {
          setOpenSuccessSnack(true);
        } else {
          setOpenFailureSnack(true);
        }
      });
  };

  const handleChange = (content) => {
    setEditorContent(content);
  };

  return (
    <div>
      <SuccessSnackBar open={openSuccessSnack} setOpen={setOpenSuccessSnack} />
      <FailureSnackBar open={openFailureSnack} setOpen={setOpenFailureSnack} />
      {/* change course */}
      <Select
        variant="outlined"
        name="course"
        labelId="demo-simple-select-label"
        className="my-2 w-full"
        value={course}
        onChange={(e) => {
          // onchange course we have to set Subject , subjectArray and  chapter ,chapterArray

          // subject and subjectArray is changed
          setCourse(e.target.value);
          const getSubjects = learnObj.filter(
            (p) => p.course === e.target.value
          );
          setSubjectArray(() => getSubjects[0].subjectArray);
          setSubject(() => getSubjects[0].subjectArray[0].subject);

          //   chapter and chapterArray is changed
          setChapterArray(getSubjects[0].subjectArray[0].chapterArray);
          setChapter(getSubjects[0].subjectArray[0].chapterArray[0]);
        }}
      >
        {learnObj.map((p, i) => {
          return (
            <MenuItem key={i} value={p.course} className="">
              {p.course}
            </MenuItem>
          );
        })}
      </Select>

      {/* change subject */}
      <Select
        variant="outlined"
        name="subject"
        className="my-2 w-full"
        value={subject}
        onChange={(e) => {
          setSubject(e.target.value);
          const getChapter = subjectArray.filter(
            (p) => p.subject === e.target.value
          );
          console.log(getChapter);
          setChapterArray(getChapter[0].chapterArray);
          setChapter(getChapter[0].chapterArray[0]);
        }}
      >
        {subjectArray.map((p, i) => {
          return (
            <MenuItem key={i} value={p.subject}>
              {p.subject}
            </MenuItem>
          );
        })}
      </Select>

      {/* change chapter */}
      <Select
        variant="outlined"
        name="chapter"
        className="my-2 w-full"
        value={chapter}
        onChange={(e) => {
          setChapter(e.target.value);
        }}
      >
        {chapterArray.map((p, i) => {
          return (
            <MenuItem key={i} value={p}>
              {p}
            </MenuItem>
          );
        })}
      </Select>

      {/* topic section */}
      <TextField
        type="text"
        variant="outlined"
        margin="normal"
        multiline="true"
        label="write seo friendly topic name"
        required="true"
        size="medium"
        color="primary"
        className="p-2 w-full"
        onChange={(e) => setTopicName(e.target.value)}
        value={topicName}
      />

      <p className="text-center">WRITE THE CONTENT</p>
      <SunEditorPanel handleChange={handleChange} editorContent={editorContent} />

      <div className="h-fit mx-auto my-2 w-full flex justify-center">
      <Button
        type="submit"
        variant="contained"
        color="success"
        className="w-40 mx-auto my-5"
        disabled={sent}
        onClick={(e) => {
          setSent(() => true);
          e.preventDefault();
          handleSave();
        }}
      >
        {/* save question */}
        {sent ? <Spinner /> : "save topic"}
      </Button>
      </div>
    </div>
  );
}
