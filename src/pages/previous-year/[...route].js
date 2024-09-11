import React, { useState } from "react";
import { clientPreviousYear } from "../../../lib/sanityConnect";
import Link from "next/link";
import { NextSeo } from "next-seo";

export default function Course({ data, examname, branch }) {

  if (data.length === 0) {
    return <div className="">Papers Coming soon</div>;
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

      {data.map((ele, i) => {
        return (
          <div key={i} className="my-3 mx-auto">
            <p className="text-center">
              <Link href={`/previous-year/paper/${ele.slug.current}`}>
                {ele.paper}
              </Link>
            </p>
          </div>
        );
      })}
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
    // paths: [{ params: { route: ['uppcl','network'] } }],
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
