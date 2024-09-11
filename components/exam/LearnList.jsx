import Link from "next/link";
import React from "react";
import { titleCase } from "../../usefulFun/titleCase";

function LearnCard({ subjectArray, course }) {
  return (
    <div className="flex flex-wrap justify-center gap-4 my-2 ">
      {subjectArray.map((subjectItem, index) => (
        <div
          key={index}
          className=" w-96 p-6 bg-gradient-to-br from-[#a87fca] to-[#967090]  rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 "
        >
          <h3 className="text-xl font-bold text-gray-800 ">
            {subjectItem.subject.toUpperCase()}
          </h3>

          <ul className="list-none text-gray-700 my-2">
            {subjectItem.chapterArray.map((chapter, idx) => (
              <li key={idx} className="text-base">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{titleCase(chapter)}
              </li>
            ))}
          </ul>

          <p>
            <Link
              className=" text-white  bg-indigo-500 hover:bg-indigo-600 font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
              href={`/learn/${course}/${subjectItem.subject}`}
            >
              Start Learning
            </Link>
          </p>
        </div>
      ))}
    </div>
  );
}

function LearnList({ learnData }) {
  return (
    <section className="p-2">
      <h2 className="text-4xl font-bold bg-clip-text text-transparent mb-1 tracking-wide drop-shadow-lg animate-pulse bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e]">
        Explore Multiple Subjects
      </h2>{" "}
      <p className="text-lg">
        Dive into a wide range of topics and expand your knowledge effortlessly.
        Our platform offers curated resources across various subjects, allowing
        you to explore new areas of interest and deepen your understanding in
        multiple fields. 
      </p>
      <div className="flex flex-wrap ">
        {learnData.map((item) => (
          <LearnCard
            key={item._id}
            subjectArray={item.subjectArray}
            course={item.course}
          />
        ))}
      </div>
    </section>
  );
}

export default LearnList;
