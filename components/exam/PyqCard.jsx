import Link from "next/link";
import React from "react";
import ResponsiveSlider from "../ResponsiveSlider";
import { titleCase } from "../../usefulFun/titleCase";

function PyqCard({ paper, branch, slug }) {
  return (
    <div className="rounded-lg overflow-hidden shadow-lg bg-gradient-to-br from-[#8edaba] to-[#0f3443] p-4 m-4 h-52">
      <div className="px-2 py-2 flex flex-col justify-around h-full">
        <div className="font-bold text-xl mb-2 text-gray-800">
          {titleCase(paper)}
        </div>
        <p>
          <Link
            href={`/previous-year/paper/${slug.current}`}
            className=" text-white  bg-indigo-500 hover:bg-indigo-600 font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
          >
            View Paper
          </Link>
        </p>
      </div>
    </div>
  );
}

function PyqList({ pyqData }) {
  return (
    <section className=" p-2">
      <h2 className="text-4xl font-bold bg-clip-text text-transparent mb-1 tracking-wide drop-shadow-lg animate-pulse bg-gradient-to-r from-[#34e89e] to-[#0f3443]">
        Previous Year Papers
      </h2>{" "}
      <p className="text-lg">
        Access a comprehensive collection of previous year papers to boost your
        exam preparation. Practice with real questions and understand the exam
        pattern to enhance your confidence and performance.
      </p>
      {pyqData.length >= 2 ? (
        <ResponsiveSlider>
          {pyqData.map((item, index) => (
            <PyqCard
              key={index}
              paper={item.paper}
              branch={item.branch}
              slug={item.slug}
            />
          ))}
        </ResponsiveSlider>
      ) : (
        <div className="w-full flex ">
          {pyqData.map((item, index) => (
            <PyqCard
              key={index}
              paper={item.paper}
              branch={item.branch}
              slug={item.slug}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default PyqList;
