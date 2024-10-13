import React, { useEffect } from "react";
import {
  clientMenu,
  clientNotes,
  clientPreviousYear,
  clientQuickLinks,
} from "../../../lib/sanityConnect";
import PyqList from "../../../components/exam/PyqCard";
import NotesList from "../../../components/exam/NotesCard";
import QuickLinksList from "../../../components/exam/QuickLinkCard";
import LearnList from "../../../components/exam/LearnList";
import QuizList from "../../../components/exam/QuizList";
import { mongoConnectExam } from "../../../lib/mongoConnectExam";
import ExamPage from "../../../components/exam/ExamPage";
import Link from "next/link";
import { NextSeo } from "next-seo";

export default function Index({
  pyqData,
  notesData,
  quickLinksData,
  learnData,
  quizData,
  examData,
  branch,
  examname,
}) {
  return (
    <div>
      {/* seo */}
      <NextSeo
        title={`${examname} | Mcqera`}
        description={`Access comprehensive handwritten notes ${branch} , providing detailed study materials and resources. Enhance your understanding of ${branch} exam concepts with visually appealing and well-organized notes of ${examname}.`}
        canonical={`https://mcqera.com/exam/${branch}/${examname}`}
        additionalMetaTags={[
          {
            name: "keywords",
            content:
              "Handwritten notes, study materials, notes for exams, exam preparation, subject-wise notes, comprehensive notes, visual notes, study resources, revision notes, hand-drawn diagrams, note-taking techniques, effective study notes, class notes, lecture notes, exam tips and tricks, topic-wise notes, high-quality notes, detailed explanations, visual aids, study guides",
          },
        ]}
      />

      {/*  seo*/}
      {Object.keys(JSON.parse(examData)).length > 0 ? (
        <ExamPage examData={JSON.parse(examData)} />
      ) : (
        <div className="flex flex-col items-center justify-center rounded-md min-h-screen text-center bg-gray-50 py-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            No Exam Data Available
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            {`It looks like there's no exam data at the moment. Please check back
            later or explore other resources.`}
          </p>
          <Link
            href="/exam"
            className="text-blue-600 hover:text-blue-800 underline text-lg"
          >
            Go Back to Home
          </Link>
        </div>
      )}
      {pyqData.length > 0 ? <PyqList pyqData={pyqData} /> : <div>No data</div>}

      {notesData.length > 0 ? (
        <NotesList notesData={notesData} />
      ) : (
        <div>no data</div>
      )}

      {JSON.parse(learnData).length > 0 ? (
        <LearnList learnData={JSON.parse(learnData)} />
      ) : (
        <div>No data</div>
      )}

      {JSON.parse(quizData).length > 0 ? (
        <QuizList quizData={JSON.parse(quizData)} />
      ) : (
        <div>No data</div>
      )}

      {quickLinksData.length > 0 ? (
        <QuickLinksList quickLinksData={quickLinksData} />
      ) : (
        <div>No data</div>
      )}
    </div>
  );
}

//server side stuffs
// ----------------defining paths --------------
export async function getStaticPaths() {
  const rawBranchData = await clientMenu.fetch(
    `*[_type=="exam"]{examname , branch->{title}}`
  );
  const branchData = rawBranchData.map(({ branch, examname }) => {
    return {
      examname: examname,
      branch: branch.title.replaceAll(" ", "-"),
    };
  });

  const path = [];

  branchData.map((item) => {
    const { branch, examname } = item;

    path.push({
      params: { route: [String(branch), String(examname)] },
    });
  });

  // console.log("end");
  console.log(path[0].params.route);

  return {
    // paths: [{ params: { route: ['electrical','network'] } },{ params: { route: ['electrical','network'] } }],
    paths: path,
    fallback: "blocking",
  };
}

// ---------defining props ----------
export const getStaticProps = async (context) => {
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

  const rawLearnData = await clientMenu.fetch(
    `*[_type=="branch" && title == "${branch}"]{title , subjects[]->{name , chapters}}`
  );

  // Function to transform the array
  const learnData = rawLearnData.map((item, index) => {
    // Define a new _id starting from 2 (to match the output format)
    const _id = index + 1;

    // Map over the subjects to convert them into an array of strings
    const subjectArray = item.subjects.map(({ name, chapters }) => {
      return { subject: name, chapterArray: chapters };
    });

    // Return the new object with _id, trade (from title), and subjects
    return {
      _id: _id,
      course: item.title, // use 'title' as 'trade'
      subjectArray,
    };
  });

  const rawQuizData = await clientMenu.fetch(
    `*[_type=="branch" && title=="${branch}" ]{title , subjects[]->{name}}`
  );

  const quizData = rawQuizData.map((item, index) => {
    // Define a new _id starting from 2 (to match the output format)
    const _id = index + 1;

    // Map over the subjects to convert them into an array of strings
    const subjects = item.subjects.map((subject) => subject.name);

    // Return the new object with _id, trade (from title), and subjects
    return {
      _id: _id,
      trade: item.title, // use 'title' as 'trade'
      subjects: subjects,
    };
  });

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
      examData:examData.length > 0 ? JSON.stringify(examData[0]) : JSON.stringify({}),
      branch: branch,
      examname: examname,
    },
    revalidate: 1200,
  };
};
