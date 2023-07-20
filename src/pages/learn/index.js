import React, { useState } from "react";
import { mongoConnectLearn } from "../../../lib/mongoConnectLearn";
import Link from "next/link";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SchoolIcon from "@mui/icons-material/School";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
} from "@mui/material";
import { NextSeo } from "next-seo";

const Home = ({ lessonsObj }) => {
  // console.log(JSON.parse(lessonsObj));

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
            content: "learning resources, courses, education, online learning, knowledge, skills, comprehensive, high-quality, subjects",
          },
        ]}
      />
      {/* seo */}

      {JSON.parse(lessonsObj).map((item, index) => {
        return (
          <Accordion className="make-com-dark my-4" key={index}>
            <AccordionSummary
              className="flex justify-center align-middle"
              expandIcon={
                <ExpandMoreIcon className=" dark:text-white text-black" />
              }
            >
              <h2 className="text-xl mx-auto">
                <SchoolIcon className="mr-3" />
                {item.course}
              </h2>
            </AccordionSummary>

            <Divider className=" bg-white" />

            {item.subjectArray.map((subject, index) => {
              return (
                <AccordionDetails className="w-full" key={index}>
                  <div
                    className="hover:opacity-50 cursor-pointer w-full"
                    key={index}
                  >
                    <Link href={`learn/${item.course}/${subject.subject}`}>
                      <p className="w-full">
                        <LocalLibraryIcon className="mr-3" />
                        {subject.subject}
                      </p>
                    </Link>
                  </div>
                </AccordionDetails>
              );
            })}
          </Accordion>
        );
      })}
    </div>
  );
};

//server side things
export const getStaticProps = async () => {
  const db = await mongoConnectLearn();
  const collection = db.collection("learnObj"); //accessing collection of trade

  const data = await collection
    .find() // finding data from trade collection with subject name
    .toArray();

  return {
    props: {
      lessonsObj: JSON.stringify(data),
    },
    revalidate: 600,
  };
};

export default Home;
