import axios from 'axios';
import { getSession, useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { loadCourseObj } from '../../../logics/loadCourseObj';
import SuccessSnackBar from '../../../components/widgets/SuccessSnackBar';
import FailureSnackBar from '../../../components/widgets/FailureSnackBar';
import ChangeTrade from '../../../components/ChangeTrade';
import ChangeSubject from '../../../components/ChangeSubject';
import Editor from '../../../components/editor/Editor';
import { Button } from '@mui/material';
import Spinner from '../../../components/widgets/Spinner';
import { useRouter } from 'next/router';

export default function edit({ singleQuestion, courseObj }) {

    const { data: session } = useSession();

    const [trade, setTrade] = useState("");
    const [subject, setSubject] = useState("");
    const [subjects, setSubjects] = useState([]);
    const [courses, setCourses] = useState([]);
    const [sent, setSent] = useState(false);
    const [openSuccessSnack, setOpenSuccessSnack] = useState(false);
    const [openFailureSnack, setOpenFailureSnack] = useState(false);
    const router = useRouter();

    const [que, setQue] = useState(singleQuestion);

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
            .post("/api/question/editquestion", {
                que,
                trade,
                id: router.query.id,
                subject,
                author: session.user.email,
            })
            .then((p) => {
                setSent(false);

                if (p.data.ok) {
                    console.log(p.data);
                    setOpenSuccessSnack(true);
                } else {
                    setOpenFailureSnack(true);
                }
            });

        console.log(que)
        localStorage.setItem("tradeAdmin", trade);
        localStorage.setItem("subjectAdmin", subject);
        localStorage.setItem("subjectsAdmin", JSON.stringify(subjects));
    };

    const handleChangeD = (e) => {
        //   setQue({ ...que, detail: e });
        que.detail = e;
    };
    const handleChangeQ = (e) => {
        // setQue({ ...que, question: e.target.value });
        //   setQue({ ...que, question: e });
        que.question = e;
    };
    const handleChangeT = (e) => {
        // setQue({ ...que, trueOpt: e.target.value });
        //   setQue({ ...que, trueOpt: e });
        que.trueOpt = e;

    };
    const handleChangeF1 = (e) => {
        // setQue({ ...que, falseOpt1: e.target.value });
        //   setQue({ ...que, falseOpt1: e });
        que.falseOpt1 = e
    };
    const handleChangeF2 = (e) => {
        // setQue({ ...que, falseOpt2: e.target.value });
        //   setQue({ ...que, falseOpt2: e });
        que.falseOpt2 = e

    };
    const handleChangeF3 = (e) => {
        // setQue({ ...que, falseOpt3: e.target.value });
        //   setQue({ ...que, falseOpt3: e });
        que.falseOpt3 = e

    };

    return (
        <div className="flex my-6 flex-col h-full mx-auto w-full">
            <SuccessSnackBar open={openSuccessSnack} setOpen={setOpenSuccessSnack} />
            <FailureSnackBar open={openFailureSnack} setOpen={setOpenFailureSnack} />
            <h1 className='text-2xl text-cyan-800 text-center'>Update Your Question</h1>
            {/* <form> */}
            <div className="flex  flex-col p-2 h-full mx-auto sm:w-9/12 lg:w-7/12 md:8/12 max-[640px]:w-10/12">
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
                        setSent(() => true);
                        e.preventDefault();
                        handleSave();
                    }}
                >
                    {/* save question */}
                    {sent ? <Spinner /> : "update"}
                </Button>
            </div>
        </div>
    );
}









export async function getServerSideProps(context) {

    const session = await getSession({ req: context.req });

    if (!session) {
        return {
            redirect: {
                destination: "/api/auth/signin",
                permanent: false,
            },
        };
    }
    try {
        const { data } = await axios.post(`${process.env.APP_URL}/api/auth/admin`, { email: session.user.email })
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

    const courseObj = await loadCourseObj();
    var singleQuestion = {}
    if (context.query.id && context.query.subject && context.query.trade) {
        const res = await fetch(`${process.env.APP_URL}/api/question/editquestion?id=${context.query.id}&subject=${context.query.subject}&trade=${context.query.trade}`)
        const repo = await res.json();
        // console.log(repo.singleQuestion)
        singleQuestion = repo.singleQuestion

    } else {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

    return {
        props: { courseObj, singleQuestion }
    };
}

