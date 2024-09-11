import Link from "next/link";
import React from "react";
import { titleCase } from "../../usefulFun/titleCase";

function SubjectCard({ subject, trade }) {
  return (
    <div className="rounded-md overflow-hidden shadow-lg bg-[#9f9e9e] p-4 m-2 flex flex-col justify-around h-36 w-72">
      <h3 className="text-lg font-bold text-gray-800 flex-wrap">
        {titleCase(subject)}
      </h3>
      <p>
        <Link
          href={`/quiz/${trade}/${subject}/1`}
          className=" text-white  bg-indigo-500 hover:bg-indigo-600 font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
        >
          Start Quiz
        </Link>
      </p>
    </div>
  );
}

function QuizList({ quizData }) {
  return (
    <section className="p-2">
      <h2 className="text-4xl font-bold bg-clip-text text-transparent mb-1 tracking-wide drop-shadow-lg animate-pulse bg-gradient-to-r from-[#ec7b6e] to-[#f5af19]">
        Available Quiz Subjects
      </h2>{" "}
      <p className="text-lg">
        Enhance your learning with a diverse collection of questions spanning
        various subjects. Our extensive database offers numerous questions
        designed to test and deepen your knowledge across multiple fields.
     
      </p>
      <div className="flex flex-wrap gap-4">
        {quizData.map((item) =>
          item.subjects.map((subject, index) => (
            <SubjectCard key={index} subject={subject} trade={item.trade} />
          ))
        )}
      </div>
    </section>
  );
}

export default QuizList;
