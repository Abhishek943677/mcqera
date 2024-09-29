import React, { useState } from "react";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import Link from "next/link";
import { clientMenu } from "../../../lib/sanityConnect";

function ExamCard({ item }) {
  return (
    <div className="rounded-md overflow-hidden shadow-lg bg-[#9f9e9e] p-4 m-2 flex flex-col justify-around h-36 w-72">
      <h3 className="text-lg font-bold text-gray-800 flex-wrap">
        {item.examname.replaceAll("-", " ").toUpperCase()}
      </h3>
      <p>
        <Link
          href={`exam/${item.branch.replaceAll(
            " ",
            "-"
          )}/${item.examname.replaceAll(" ", "-")}`}
          className=" text-white  bg-indigo-500 hover:bg-indigo-600 font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
        >
          Start Preparation
        </Link>
      </p>
    </div>
  );
}

const Home = ({ examObj }) => {
  const router = useRouter();

  return (
    <div>
      {/* seo */}
      <NextSeo
        title="Exam | mcqera | Prapare for dream exam"
        description="Access a wide range of comprehensive learning resources and courses on various subjects. Enhance your knowledge and skills with high-quality educational content."
        canonical="https://mcqera.com/learn"
        additionalMetaTags={[
          {
            name: "keywords",
            content:
              "learning resources, courses, education, online learning, knowledge, skills, comprehensive, high-quality, subjects",
          },
        ]}
      />
      {/* header */}
      <h1 className="text-4xl my-2 font-bold bg-clip-text text-transparent mb-1 tracking-wide drop-shadow-lg animate-pulse bg-gradient-to-r from-[#ec7b6e] to-[#f5af19]">
        Prepare for Your Competitive Exams with Our Extensive Resources
      </h1>{" "}
      {/* body */}
      <p className="text-lg">
        {`Boost your exam preparation with our carefully curated resources
        including <strong>PYQs</strong>, <strong>Handwritten Notes</strong>,{" "}
        <strong>Learning Material</strong>, <strong>Quizzes</strong>, and{" "}
        <strong>Quicklinks to Questions</strong>. Whether it's engineering,
        medical, or civil services exams, we provide everything you need to
        excel.`}
      </p>
      {/* exams */}
      <h2 className="text-2xl font-semibold my-4">Available Exams</h2>

      <section className="flex flex-wrap my-3">
        {JSON.parse(examObj).map((item, index) => {
          return <ExamCard item={item} key={index} />;
        })}
      </section>
    </div>
  );
};

//server side things
export const getStaticProps = async () => {
  const rawBranchData = await clientMenu.fetch(
    `*[_type=="exam"]{examname , branch->{title}}`
  );
  const branchData = rawBranchData.map(({ branch, examname }) => {
    return {
      examname: examname,
      branch: branch.title,
    };
  });

  return {
    props: {
      examObj: JSON.stringify(branchData),
    },
    revalidate: 1200,
  };
};

export default Home;
