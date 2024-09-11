import React, { useState, useEffect } from "react";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import SunEditorPanel from "../learn/SunEditorPanel";
import { useRouter } from "next/router";
import SuccessSnackBar from "../widgets/SuccessSnackBar";
import FailureSnackBar from "../widgets/FailureSnackBar";
import Spinner from "../widgets/Spinner";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function AddExam({ data }) {
  const [editorContent, setEditorContent] = useState("");

  const [examname, setExamName] = useState("");
  const [notification, setNotification] = useState("");
  const [updates, setUpdates] = useState("");

  const [openSuccessSnack, setOpenSuccessSnack] = useState(false);
  const [openFailureSnack, setOpenFailureSnack] = useState(false);
  const [sent, setSent] = useState(false);

  const { data: session } = useSession();

  const handleSave = () => {
    const branch = JSON.parse(data).find((i) => i.examname == examname).branch;

    axios
      .post(
        "/api/exam/save",
        {
          branch,
          examname,
          notification,
          updates,
          url: examname.replaceAll(" ", "-") + "-" + Date.now(),
          syllabus: editorContent,
          author: session.user.email,
        },
        { timeout: 10000 }
      )
      .then((p) => {
        setSent(false);
        if (p.data.ok) {
          setOpenSuccessSnack(true);
        } else {
          setOpenFailureSnack(true);
        }
      })
      .catch((err) => {
        setSent(false);
        setOpenFailureSnack(true);
      });
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
        {JSON.parse(data).map((p, i) => {
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

      <p className="text-center">WRITE THE SYLLABUS</p>
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
          {sent ? <Spinner /> : "save exam"}
        </Button>
      </div>
    </div>
  );
}
