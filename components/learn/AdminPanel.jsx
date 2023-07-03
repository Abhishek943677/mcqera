import { Button, Divider, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import { useEffect } from "react";
import Spinner from "../widgets/Spinner";

export default function AdminPanel({ data }) {

  const [learnObj, setLearnObj] = useState([]);
  const [course, setCourse] = useState("");
  const [subjectArray, setSubjectArray] = useState([]);
  const [subject, setSubject] = useState("");
  const [chapter, setChapter] = useState("");
  const [chapterArray, setChapterArray] = useState([]);
  const [sent, setSent] = useState(false);
  const [listData, setListData] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {

    setLearnObj(() => JSON.parse(data));
    setCourse(() => JSON.parse(data)[0].course);
    setSubjectArray(() => JSON.parse(data)[0].subjectArray);
    setSubject(() => JSON.parse(data)[0].subjectArray[0].subject);
    setChapterArray(() => JSON.parse(data)[0].subjectArray[0].chapterArray);
    setChapter(() => JSON.parse(data)[0].subjectArray[0].chapterArray[0]);

  }, []);

  // to get topics on click
  const handleApi = () => {
    axios
      .post("/api/learn/topicsByAdmin", {
        course,
        chapter,
        subject,
        author: session.user.email,
      })
      .then(({ data }) => {
        // console.log(data);
        setListData(data.list);
        setSent(false);

        if (data.ok) {
          console.log(data.list);
          setListData(data.list);
        } else {
          setListData([]);
        }
      })
      .catch((error) => {
        setSent(true);
      });
  };

  // to delete the item from the list
  const handleDelete = (id) => {
    // console.log(id);
    axios.post("/api/learn/deleteTopic", { id }).then(({ data }) => {
      // console.log(data);
      const filteredList = listData.filter((item) => item._id !== id);
      setListData(filteredList);
    });
  };

  return (
    <div>
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

      {/* this is the button to get topics */}
      <div className="flex justify-center w-full">
        <Button
          className="w-60"
          color="success"
          disabled={sent}
          variant="contained"
          onClick={() => {
            setSent(true);
            handleApi();
          }}
        >
          {sent ? <Spinner /> : "get topics ..."}
        </Button>
      </div>

      {/* this section shows all the topics for editing purpose */}
      <main>
        {listData &&
          listData.length > 0 &&
          listData.map((item, index) => {
            return (
              <div className="px-2 make-com-dark my-1 rounded" key={index}>
                <div className="flex justify-between">
                  <Link
                  className=" hover:opacity-50"
                    href={`/learn/topic/${item.url}`}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {item.topicName}
                  </Link>

                  <div className="flex my-auto">
                    <Button
                      size="small"
                      onClick={(e) => e.target.classList.add("deleted")}
                    >
                      <DeleteIcon
                        fontSize="large"
                        color="error"
                        className="cursor-pointer mx-2 "
                        onClick={() => {
                          handleDelete(item._id);
                        }}
                      />
                    </Button>
                    <Link
                      href={`/l-admin/edit?id=${item._id}`}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <Button>
                        <EditIcon
                          fontSize="large"
                          color="primary"
                          className="cursor-pointer ml-2"
                        />
                      </Button>
                    </Link>
                    <p className="text-center my-auto p-1">{index + 1}</p>
                  </div>
                </div>
                <Divider />
              </div>
            );
          })}
      </main>
    </div>
  );
}
