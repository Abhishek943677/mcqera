import React, { useEffect, useRef, useState } from "react";
import Spinner from "../widgets/Spinner";
import { Button, Divider } from "@mui/material";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import ChangeTrade from "../question/ChangeTrade";
import ChangeSubject from "../question/ChangeSubject";

export default function AdminPanel({ courseObj }) {
  const { data: session } = useSession();

  const [trade, setTrade] = useState("");
  const [subject, setSubject] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [courses, setCourses] = useState([]);
  const [sent, setSent] = useState(false);
  const [sentGetMore, setSentGetMore] = useState(false);
  const [count, setCount] = useState(1);
  const [listData, setListData] = useState([]);
  const router = useRouter();
 
  const totalQuestionAtOnce = 10; // this is the total number of questions , simultaneously change the number at server (/api/question/questionsByAdmin) 

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

  const handleApi = () => {
    setCount(1);
    // console.log(trade, subject);
    axios
      .post("/api/question/questionsByAdmin", {
        trade,
        subject,
        count: 1,
        author: session.user.email,
      })
      .then(({ data }) => {
        setSent(false);
        if (data.list.length < totalQuestionAtOnce) {
          console.log("less than given totalQuestionAtOnce");
          setCount(1);
        }

        if (data.ok) {
          setListData(data.list);
          if (data.list.length < totalQuestionAtOnce) {
            setCount(1);
          } else {
            setCount(2);
          }
        } else {
          setListData([]);
        }
      })
      .catch((error) => {
        setSent(true);
      });

    localStorage.setItem("tradeAdmin", trade);
    localStorage.setItem("subjectAdmin", subject);
    localStorage.setItem("subjectsAdmin", JSON.stringify(subjects));
  };

  const handleDelete = (id) => {
    // console.log(id);
    axios
      .post("/api/question/deleteQuestion", { trade, subject, id })
      .then(({ data }) => {
        // console.log(data);
        const filteredList = listData.filter((item) => item._id !== id);
        setListData(filteredList);
      });
  };

  const handleLoadMore = (count) => {
    setSentGetMore(true);
    axios
      .post("/api/question/questionsByAdmin", {
        trade,
        subject,
        count,
        author: session.user.email,
      })
      .then(({ data }) => {
        setSentGetMore(false);

        if (data.ok) {
          data.list.map((item) => listData.push(item));
          if (data.list.length < totalQuestionAtOnce) {
            setCount(1);
          } else {
            setCount(count + 1);
          }
        } else {
          setListData([]);
        }
      });
  };

  return (
    <>
      <div className="flex p-3  flex-col  h-full mx-auto sm:w-9/12 lg:w-7/12 md:8/12 max-[640px]:w-10/12">
        <ChangeTrade
          trade={trade}
          courses={courses}
          setTrade={setTrade}
          setSubject={setSubject}
          setSubjects={setSubjects}
          S
        />
        <ChangeSubject  
          subject={subject}
          subjects={subjects}
          setSubject={setSubject}
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
              handleApi();
            }}
          >
            {/* save question */}
            {sent ? <Spinner /> : "get questions"}
          </Button>
        </div>
      </div>

      <main>
        {listData &&
          listData.length > 0 &&
          listData.map((item, index) => {
            return (
              <div className="px-2 make-com-dark my-1 rounded" key={index}>
                <div className="flex justify-between">
                  <div
                  id="question"
                    className=" py-4 "
                    dangerouslySetInnerHTML={{ __html: item.que?.question }}
                    />
                  <div className="flex my-auto ">
                    <Button size="small" onClick={(e)=>e.target.classList.add("deleted")}>
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
                      href={`/admin/edit?id=${item._id}&subject=${subject}&trade=${trade}`}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <Button>
                        <EditIcon
                          fontSize="large"
                          color="primary"
                          className="cursor-pointer ml-2"
                          // onClick={() => handleEdit(item._id)}
                        />
                      </Button>
                    </Link>
                        <p className="text-center my-auto p-1">{index+1}</p>
                  </div>
                </div>
                <Divider />
              </div>
            );
          })}
      </main>
      {count !== 1 && (
        <div className="mx-auto flex justify-center">
          <Button
            variant="contained"
            className="w-52"
            disabled={sentGetMore}
            onClick={() => {
              handleLoadMore(count);
            }}
          >
            {sentGetMore ? <Spinner /> : "Load more..."}
          </Button>
        </div>
      )}
    </>
  );
}
