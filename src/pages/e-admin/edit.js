import axios from "axios";
import { getSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import SunEditorPanel from "../../../components/learn/SunEditorPanel";
import SuccessSnackBar from "../../../components/widgets/SuccessSnackBar";
import FailureSnackBar from "../../../components/widgets/FailureSnackBar";
import Spinner from "../../../components/widgets/Spinner";
import { useRouter } from "next/router";
import { mongoConnectExam } from "../../../lib/mongoConnectExam";

export default function Edit({ examData , examObj }) {
  console.log(examData)
  const [editorContent, setEditorContent] = useState("");

  const [examname, setExamName] = useState("");
  const [notification, setNotification] = useState("");
  const [updates, setUpdates] = useState("");

  const [openSuccessSnack, setOpenSuccessSnack] = useState(false);
  const [openFailureSnack, setOpenFailureSnack] = useState(false);
  const [sent, setSent] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setNotification(JSON.parse(examData).notification);
    setExamName(JSON.parse(examData).examname);
    setEditorContent(JSON.parse(examData).syllabus);
    setUpdates(JSON.parse(examData).updates);
  }, []);

  const handleSave = () => {
    const branch = JSON.parse(examObj).find((i) => (i.examname = examname)).branch;

    axios
      .post("/api/exam/editTopic" , {
        branch,
        examname,
        notification,
        updates,
        syllabus: editorContent,
        id: router.query.id
      },
      {timeout:10000}
    )
      .then((p) => {
        setSent(false);
        console.log(p.data);
        if (p.data.ok) {
          setOpenSuccessSnack(true);
        } else {
          setOpenFailureSnack(true);
        }
      })
      .catch((err)=>{
        setSent(false);
        setOpenFailureSnack(true);
      })
  };

  const handleChange = (content) => {
    setEditorContent(content);
  };

  return (
    <div>
      <SuccessSnackBar open={openSuccessSnack} setOpen={setOpenSuccessSnack} />
      <FailureSnackBar open={openFailureSnack} setOpen={setOpenFailureSnack} />

      {/* examname */}

      <Select
        variant="outlined"
        name="examname"
        className="my-2 w-full"
        value={examname}
        onChange={(e) => {
          setExamName(e.target.value);
        }}
      >
        {JSON.parse(examObj).map((p, i) => {
          return (
            <MenuItem key={i} value={p.examname}>
              {p.branch} / {p.examname}
            </MenuItem>
          );
        })}
      </Select>

      {/* notification section */}
      <TextField
        type="text"
        variant="outlined"
        margin="normal"
        multiline="true"
        label="Notification Link"
        required="true"
        size="medium"
        color="primary"
        className="p-2 w-full"
        onChange={(e) => setNotification(e.target.value)}
        value={notification}
      />
      {/* updates section */}
      <TextField
        type="text"
        variant="outlined"
        margin="normal"
        multiline="true"
        rows="5"
        label="Updates"
        required="true"
        size="medium"
        color="primary"
        className="p-2 w-full"
        onChange={(e) => setUpdates(e.target.value)}
        value={updates}
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
    // this is to get topicsData from server
    const res = await fetch(
      `${process.env.APP_URL}/api/exam/editTopic?id=${context.query.id}`
    );

    const { examData } = await res.json();

    const db = await mongoConnectExam(); //connection to MongoDB instance
    const collection = db.collection("examObj"); //accessing collection of learnObj

    const examObj = await collection
      .find() // finding data from trade collection with subject name
      .toArray();

    if (!examData || examData.author !== session.user.email) {
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
        examData: JSON.stringify(examData),
        examObj: JSON.stringify(examObj),
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
