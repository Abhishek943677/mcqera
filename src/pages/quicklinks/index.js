import React, { useEffect } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Paper,
} from "@mui/material";
import Link from "next/link";
import Head from "next/head";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SchoolIcon from "@mui/icons-material/School";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import getQuickLinkData from "../../../logics/getQuickLinkData";
import { NextSeo } from "next-seo";

const Index = ({ data }) => {
  console.log(data);

  return (
    <main>
      {/* seo */}
      <NextSeo
        title="Quick Links to MCQs | Access a Wide Range of Multiple Choice Questions | mcqera"
        description="Explore a comprehensive collection of quick links to multiple choice questions (MCQs) on various topics. Access a wide range of MCQs to test your knowledge and prepare for exams or assessments. All questions are with detailed answers"
        canonical="https://mcqera.com/quicklinks"
      />
      {/* seo */}
      
      <h1 className="text-2xl text-center">QuickLinks to MCQs of various category</h1>
      {data.map((element, i) => {
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
                {element[0].category}
              </h2>
            </AccordionSummary>

            <Divider className=" bg-white" />

            {element.map((item, index) => {
              return (
                <AccordionDetails className="w-full" key={index}>
                  <div
                    className="hover:opacity-50 cursor-pointer w-full"
                    key={index}
                  >
                    <Link
                      href={`/quicklinks/${item.category}/${item.slug.current}`}
                    >
                      <p className="w-full">
                        <DescriptionRoundedIcon className="mr-3" />
                        {item.title}
                      </p>
                    </Link>
                  </div>
                </AccordionDetails>
              );
            })}
          </Accordion>
        );
      })}
    </main>
  );
};

export async function getStaticProps() {
  const quickLinkData = await getQuickLinkData();
  console.log(quickLinkData);

  return {
    props: { data: quickLinkData },
    revalidate: 60,
  };
}

export default Index;
