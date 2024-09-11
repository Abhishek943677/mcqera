import Link from "next/link";
import React from "react";

const UpdateCard = ({ text }) => {
  return (
    <div className="max-w-md p-4 bg-white rounded-lg shadow-md my-2 bg-gradient-to-b from-[#f7d4df] to-[#cfa2ab]">
      <span className="text-lg font-bold text-gray-800 ">Recent Update</span>
      <div className="h-3 opacity-50 w-24 bg-red-900 -skew-x-[25deg] relative -top-3"></div>

      <p className="mt-2 text-base leading-5 text-black">{text}</p>
      <div className="flex items-center justify-between mt-4 space-x-4">
        <button className="text-xs leading-4 text-gray-800 transition-colors duration-300 ease-in-out hover:text-black focus:outline-none">
          Updated on <span className=" underline">09/09/2024</span>
        </button>
      </div>
    </div>
  );
};

function ExamDetail({ examData }) {
  return (
    <div className="flex items-center justify-center  p-4">
      <div className="w-full  rounded-lg ">
        <h2 className="text-5xl font-bold text-center  mb-4 bg-gradient-to-r to-[#C33764] from-[#4dcbc7] bg-clip-text text-transparent ">
          {examData.examname.toUpperCase().replaceAll("-", " ")}
        </h2>

        <div className="mt-4 p-4 ">
          <h3 className="text-3xl font-semibold ">Notification</h3>
          <Link href={examData.notification} target="_blank">
            <p className="mt-2 text-blue-500 hover:underline text-sm">
              {examData.notification}
            </p>
          </Link>
        </div>

        <UpdateCard text={examData.updates} />

        <div className="mt-4">
          <div
            className="prose space-y-2"
            id="examPage"
            dangerouslySetInnerHTML={{ __html: examData.syllabus }}
          />
        </div>
      </div>
    </div>
  );
}

export default function ExamPage({ examData }) {
  return <ExamDetail examData={examData} />;
}
