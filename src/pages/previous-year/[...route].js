import React, { useState } from "react";
import { clientPreviousYear } from "../../../lib/sanityConnect";
import Link from "next/link";
import { NextSeo } from "next-seo";
import { titleCase } from "../../../usefulFun/titleCase";

function PyqCard({ paper, slug }) {
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

export default function Course({ data, examname, branch }) {
  if (data.length === 0) {
    return <div className="">Not Found</div>;
  }
  return (
    <div className="mt-10">
      {/* seo */}
      <NextSeo
        title={`Previous year papers of ${examname} ${branch} `}
        description={`Access a comprehensive collection of previous year papers for ${examname} ${branch}. Practice with authentic exam questions, test your knowledge, and enhance your exam readiness with these valuable resources.`}
        canonical={`https://mcqera.com/previous-year-papers/${examname}/${branch}`}
      />
      {/* seo */}

      <section className=" p-2">
        <h2 className="text-4xl font-bold bg-clip-text text-transparent mb-1 tracking-wide drop-shadow-lg animate-pulse bg-gradient-to-r from-[#34e89e] to-[#0f3443]">
          Previous Year Papers for <br/>
          {examname.replaceAll("-" ," ").toUpperCase()}
        </h2>{" "}
        <p className="text-lg">
          Access a comprehensive collection of previous year papers to boost
          your exam preparation. Practice with real questions and understand the
          exam pattern to enhance your confidence and performance.
        </p>
        <div className="w-full flex flex-wrap ">
        {data.map((ele, i) => {
          return (
              <PyqCard key={i} paper={ele.paper} slug={ele.slug} />
            );
          })}
          </div>
      </section>
    </div>
  );
}

// paths defining
export async function getStaticPaths() {
  const path = [];
  const Pathsquery = `*[_type=="exams"]{examname,branch}`;
  const pathsInitialData = await clientPreviousYear.fetch(Pathsquery);

  pathsInitialData.forEach(({ examname, branch }) => {
    path.push({ params: { route: [String(examname), String(branch)] } });
  });

  return {
    paths: path,
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const examname = context.params.route[1];
  const branch = context.params.route[0];

  const query = `*[_type=="exams" && examname=="${examname}" && branch=="${branch}"]{paper,slug}`;
  const data = await clientPreviousYear.fetch(query);

  return {
    props: {
      data,
      examname: examname,
      branch: branch,
    },
    revalidate: 1200,
  };
}
