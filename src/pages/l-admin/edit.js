import axios from "axios";
import { getSession } from "next-auth/react";
import { mongoConnectLearn } from "../../../lib/mongoConnectLearn";
import React, { useState, useEffect } from "react";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import SunEditorPanel from "../../../components/learn/SunEditorPanel";
import SuccessSnackBar from "../../../components/widgets/SuccessSnackBar";
import FailureSnackBar from "../../../components/widgets/FailureSnackBar";
import Spinner from "../../../components/widgets/Spinner";
import { useRouter } from "next/router";

export default function Edit({ topicData, data }) {
  //   console.log(JSON.parse(data));
  // console.log(JSON.parse(topicData));

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
  const router = useRouter();

  useEffect(() => {
    // console.log(router.query.id)
    setLearnObj(() => JSON.parse(data));
    setCourse(() => JSON.parse(topicData).course);
    setSubject(() => JSON.parse(topicData).subject);
    setChapter(() => JSON.parse(topicData).chapter);
    setEditorContent(() => JSON.parse(topicData).content);
    setTopicName(() => JSON.parse(topicData).topicName);

    const getSingleCourseArray = JSON.parse(data).filter(
      (item) => item.course === JSON.parse(topicData).course
    );
    // console.log(getSingleCourseArray)

    const getSingleSubjectArray = getSingleCourseArray[0].subjectArray.filter(
      (item) => item.subject === JSON.parse(topicData).subject
    );
    // console.log(getSingleSubjectArray)

    setSubjectArray(() => getSingleCourseArray[0].subjectArray);
    setChapterArray(() => getSingleSubjectArray[0].chapterArray);
  }, []);

  const handleSave = () => {
    // console.log(course, subject, chapter, topicName);
    // console.log(editorContent);
    axios
      .post("/api/learn/editTopic", {
        course,
        subject,
        chapter,
        topicName,
        content: editorContent,
        id: router.query.id,
      })
      .then((p) => {
        setSent(false);
        // console.log(p.data);
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
      <SunEditorPanel
        handleChange={handleChange}
        editorContent={editorContent}
      />

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

//---------------------- server side----------------------
export async function getServerSideProps(context) {
  // user authentication
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }

  // admin validation
  try {
    const { data } = await axios.post(`${process.env.APP_URL}/api/auth/admin`, {
      email: session.user.email,
    });

    if (!data) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
  } catch (error) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // actual server side stuffs
  // this is to get learObj from server
  try { 
    const db = await mongoConnectLearn();
    const collection = db.collection("learnObj"); //accessing collection of trade

    const learnObj = await collection
      .find() // finding data from trade collection with subject name
      .toArray();

    // this is to get topicsData from server
    const res = await fetch(
      `${process.env.APP_URL}/api/learn/editTopic?id=${context.query.id}`
    );

    const { topicData } = await res.json();
    // console.log(topicData)

    if (!topicData || topicData.author !== session.user.email) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    // at the end return the obj for page
    //   console.log(topicData)
    return {
      props: {
        topicData: JSON.stringify(topicData),
        data: JSON.stringify(learnObj),
      },
    };

  } catch (error) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
}
