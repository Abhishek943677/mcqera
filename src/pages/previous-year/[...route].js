import React, { useState } from "react";
import client from "../../../lib/sanityConnect";
import Link from "next/link";

export default function Course({ data }) {
  console.clear();
  if (data.length === 0) {
    return <div className="">Papers Coming soon</div>;
  }
  return (
    <div>
      {data.map((ele, i) => {
        return (
          <div key={i} className="my-3 mx-auto">
            <p className="text-center">
              <Link href={`/paper/${ele.slug.current}`}>{ele.paper}</Link>
            </p>
          </div>
        );
      })}
    </div>
  );
}

export async function getServerSideProps(context) {
  const examname = context.params.route[0];
  const branch = context.params.route[1];

  const query = `*[_type=="exams" && examname=="${examname}" && branch=="${branch}"]{paper,slug}`;
  const data = await client.fetch(query);

  return {
    props: {
      data,
    },
  };
}
