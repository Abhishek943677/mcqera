import React, { useState } from "react";
import { clientPreviousYear } from "../../../lib/sanityConnect";
import Link from "next/link";

export default function Course({ data }) {
  console.clear();
  if (data.length === 0) {
    return <div className="">Papers Coming soon</div>;
  }
  return (
    <div className="mt-10">
      {data.map((ele, i) => {
        return (
          <div key={i} className="my-3 mx-auto">
            <p className="text-center">
              <Link href={`/previous-year/paper/${ele.slug.current}`}>{ele.paper}</Link>
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
    path.push({ params: { route: [String(examname), String(branch)] } })
  });
  
   return {
     // paths: [{ params: { route: ['uppcl','network'] } }],
     paths: path,
     fallback:'blocking',
   }
 }


export async function getStaticProps(context) {
  const examname = context.params.route[0];
  const branch = context.params.route[1];

  const query = `*[_type=="exams" && examname=="${examname}" && branch=="${branch}"]{paper,slug}`;
  const data = await clientPreviousYear.fetch(query);

  return {
    props: {
      data,
    },
    revalidate:100,
  };
}
