import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Divider,
} from "@mui/material";
import Link from "next/link";
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SchoolIcon from "@mui/icons-material/School";
import QuizIcon from "@mui/icons-material/Quiz";
import { NextSeo } from "next-seo";
import { loadCourseObj } from "../../../logics/loadCourseObj";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { titleCase } from "../../../usefulFun/titleCase";

const Index = ({ data }) => {
  const router = useRouter();
  const [expanded, setExpanded] = useState("");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  useEffect(() => {
    document.getElementById(router.query.section) &&
      document
        .getElementById(router.query.section)
        .scrollIntoView({ behavior: "smooth" })
       

    setExpanded(router.query.section);
  }, [router]);
  return (
    <main>
      {/* seo */}
      <NextSeo
        title="Quiz | MCQs | Mcqera"
        description="Boost your competitive exams preparation with free MCQs. Practice mock tests with detailed explanations to success in the exam"
        canonical="https://mcqera.in/quiz"
        additionalMetaTags={[
          {
            name: "keywords",
            content:
              "Handwritten notes, study materials, notes for exams, exam preparation, subject-wise notes, comprehensive notes, visual notes, study resources, revision notes, hand-drawn diagrams, note-taking techniques, effective study notes, class notes, lecture notes, exam tips and tricks, topic-wise notes, high-quality notes, detailed explanations, visual aids, study guides",
          },
        ]}
      />
      {/*  seo*/}

      <h1 className="text-center text-lg">
        Practice carefully crafted questions with detailed solutions covering
        many subjects for competitive exams.....
      </h1>

      <div className="flex justify-end">
          {expanded === "" || expanded === false  ? (
            <Button variant="outlined" color="inherit" onClick={() => setExpanded(undefined)} size="small"> <UnfoldMoreIcon />Expand All</Button>
          ) : (
            <Button variant="outlined" color="inherit" onClick={() => setExpanded("")} size="small"><UnfoldLessIcon />Collapse All</Button>
          )}
        </div>



      {data.map((element, i) => {
        return (
          <Accordion
            className="make-com-dark my-4"
            id={element.trade}
            key={i}
            onChange={handleChange(element.trade)}
            expanded={
              expanded === element.trade || expanded === undefined
            }
          >
            <AccordionSummary
              className="flex justify-center align-middle"
              expandIcon={
                <ExpandMoreIcon className=" dark:text-white text-black" />
              }
            >
              <h2 className="text-xl mx-auto">
                <SchoolIcon className="mr-3" />
                {element.trade.toUpperCase()}
              </h2>
            </AccordionSummary>

            <Divider className=" bg-white" />

            {element.subjects.map((subject, index) => {
              return (
                <AccordionDetails className="w-full" key={index}>
                  <div
                    className="hover:opacity-50 cursor-pointer w-full"
                    key={index}
                  >
                    <Link href={`/quiz/${element.trade}/${subject}/1`}>
                      <p className="w-full">
                        <QuizIcon className="mr-3" />
                        {titleCase(subject)}
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

// --------------------server side---------------------------

export async function getStaticProps() {
  const quizData = await loadCourseObj();
  return {
    props: { data: quizData },
    revalidate: 600,
  };
}

export default Index;
