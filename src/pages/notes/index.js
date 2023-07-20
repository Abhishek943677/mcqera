import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
} from "@mui/material";
import Link from "next/link";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SchoolIcon from "@mui/icons-material/School";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import getNotesData from "../../../logics/getNotesData";
import { NextSeo } from "next-seo";

const Index = ({ data }) => {
  return (
    <main>
      {/* seo */}
      <NextSeo
        title="Handwritten Notes | Comprehensive Study Materials and Resources | mcqera"
        description="Explore a wide collection of handwritten notes offering comprehensive study materials and resources. Access well-organized and visually appealing notes to enhance your learning experience."
        canonical="https://mcqera.com/notes/handwritten"
        additionalMetaTags={[
          {
            name: "keywords",
            content: "Handwritten notes, study materials, notes for exams, exam preparation, subject-wise notes, comprehensive notes, visual notes, study resources, revision notes, hand-drawn diagrams, note-taking techniques, effective study notes, class notes, lecture notes, exam tips and tricks, topic-wise notes, high-quality notes, detailed explanations, visual aids, study guides",
          },
        ]}
      />
      {/*  seo*/}

      <h1>Handwritten Notes</h1>
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
                    <Link href={`/notes/${item.slug.current}`}>
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
  const notesData = await getNotesData();
  return {
    props: { data: notesData },
    revalidate: 600,
  };
}

export default Index;
