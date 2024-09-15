import React, { useState } from "react";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import Link from "next/link";
import { clientMenu } from "../../../lib/sanityConnect";

const Home = ({ examObj }) => {
  const router = useRouter();

  return (
    <div>
      {/* seo */}
      <NextSeo
        title="Learn | mcqera | Comprehensive Learning Resources and Courses"
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
      {/* seo */}


      <section className="flex flex-wrap justify-center">
        {JSON.parse(examObj).map((item, index) => {
          return (
            <div key={index} className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-2 m-4 w-80">
              <div className="px-6 py-4">
                <Link href={`exam/${item.branch.replaceAll(" ","-")}/${item.examname.replaceAll(" ","-")}`}>
                  <div className="font-bold text-xl mb-2 text-gray-800">
                    {item.examname.replaceAll("-", " ").toUpperCase()}
                  </div>
                </Link>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

//server side things
export const getStaticProps = async () => {
  const rawBranchData = await clientMenu.fetch(`*[_type=="exam"]{examname , branch->{title}}`);
  const branchData = rawBranchData.map(({branch,  examname }) => {
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
