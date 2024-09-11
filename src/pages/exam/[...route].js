import React, { useEffect } from "react";
import {
  clientNotes,
  clientPreviousYear,
  clientQuickLinks,
} from "../../../lib/sanityConnect";
import { mongoConnectLearn } from "../../../lib/mongoConnectLearn";
import { mongoConnect } from "../../../lib/mongoConnect";
import PyqList from "../../../components/exam/PyqCard";
import NotesList from "../../../components/exam/NotesCard";
import QuickLinksList from "../../../components/exam/QuickLinkCard";
import LearnList from "../../../components/exam/LearnList";
import QuizList from "../../../components/exam/QuizList";
import { mongoConnectExam } from "../../../lib/mongoConnectExam";
import ExamPage from "../../../components/exam/ExamPage";

export default function Index({
  pyqData,
  notesData,
  quickLinksData,
  learnData,
  quizData,
  examData,
}) {
  return (
    <div>
      <ExamPage examData={JSON.parse(examData)} />
      <NotesList notesData={notesData} />
      <PyqList pyqData={pyqData} />
      <QuickLinksList quickLinksData={quickLinksData} />
      <LearnList learnData={JSON.parse(learnData)} />
      <QuizList quizData={JSON.parse(quizData)} />
    </div>
  );
}

// ---------defining props ----------
export async function getServerSideProps(context) {
  const branch = context.params.route[0];
  const examname = context.params.route[1];

  console.log(examname, branch);

  const pyqData = await clientPreviousYear.fetch(
    `*[_type=="exams" && examname=="${examname}"]{paper,slug,branch}`
  );

  const notesData = await clientNotes.fetch(
    `*[_type=="notes" && "${examname}" in examname ]{title , slug}`
  );

  const quickLinksData = await clientQuickLinks.fetch(
    `*[_type=="quicklinks" && "${examname}" in examname]{title , branch , slug}`
  );

  const learnDb = await mongoConnectLearn();
  const learnCollection = learnDb.collection("learnObj"); //accessing collection of trade

  const learnData = await learnCollection
    .find(
      { course: branch } // Query condition
    )
    .toArray();

  const quizdb = await mongoConnect(); // mongoConnect is a function which returns db
  const quizCollection = quizdb.collection("courses"); //accessing collection of trade
  const quizData = await quizCollection
    .find(
      { trade: branch } // Query condition
    )
    .toArray();

  const examDb = await mongoConnectExam();
  const examCollection = examDb.collection("exams");
  const examData = await examCollection
    .find({ examname: examname, branch: branch })
    .limit(1)
    .toArray();

  return {
    props: {
      pyqData,
      notesData,
      quickLinksData,
      learnData: JSON.stringify(learnData),
      quizData: JSON.stringify(quizData),
      examData: JSON.stringify(examData[0]),
    },
  };
}
