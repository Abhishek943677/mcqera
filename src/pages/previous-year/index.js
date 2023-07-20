import React, { useEffect } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Paper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SchoolIcon from "@mui/icons-material/School";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import Link from "next/link";
import Head from "next/head";
import Spinner from "../../../components/widgets/Spinner";
import getPreviousYearData from "../../../logics/getPreviousYearData";
import { NextSeo } from "next-seo";

const Index = ({ data }) => {
  return (
    <div className="">
      {/* seo */}
      <NextSeo
        title="Previous Year MCQ Papers | mcqera"
        description="Access a wide collection of previous year MCQ papers for comprehensive exam preparation. Practice with real exam questions, test your knowledge, and enhance your exam readiness with these valuable resources."
        canonical="https://mcqera.com/previous-year"
        additionalLinkTags={{
          name: "keywords",
          content:"Previous year MCQ papers, exam preparation resources, practice papers, exam question bank, mock tests, exam practice, test your knowledge, exam readiness, question papers with answers, exam pattern, exam syllabus, practice quizzes, exam simulation, exam practice questions, exam revision, exam tips and tricks, exam strategies, exam study materials, online test series, exam success tips"
        }}
      />
      {/* seo */}

      <h1 className="text-xl text-center">Previous year Papers</h1>

      {data.length !== 0 ? (
        data.map((element, i) => {
          return (
            <Accordion className="make-com-dark my-4" key={i}>
              <AccordionSummary
                className="flex justify-center align-middle"
                expandIcon={
                  <ExpandMoreIcon className=" dark:text-white text-black" />
                }
              >
                <h2 className="text-xl mx-auto">
                  <SchoolIcon className="mr-3" />
                  {element[0].examname}
                </h2>
              </AccordionSummary>

              <Divider className=" bg-white" />

              {element.map((item, index) => {
                return (
                  <AccordionDetails className="w-full" key={index}>
                    <div className="hover:opacity-50 cursor-pointer w-full">
                      <Link
                        href={`/previous-year/${item.examname}/${item.branch}`}
                      >
                        {/*this display branch name */}
                        <LocalLibraryIcon className="mr-3" />
                        {item.branch}
                      </Link>
                    </div>
                  </AccordionDetails>
                );
              })}
            </Accordion>
          );
        })
      ) : (
        <div className="mx-auto">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export async function getStaticProps() {
  const previousYeaData = await getPreviousYearData();

  return {
    props: { data: previousYeaData },
    revalidate: 600,
  };
}

export default Index;
