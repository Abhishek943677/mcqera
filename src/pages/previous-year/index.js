import React, { useEffect } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Divider,
  Paper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SchoolIcon from "@mui/icons-material/School";
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import Link from "next/link";
import Head from "next/head";
import Spinner from "../../../components/widgets/Spinner";
import getPreviousYearData from "../../../logics/getPreviousYearData";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useState } from "react";
import { titleCase } from "../../../usefulFun/titleCase";

const Index = ({ data }) => {
  console.log(data)
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
    <div className="">
      {/* seo */}
      <NextSeo
        title="Previous Year MCQ Papers | mcqera"
        description="Access a wide collection of previous year MCQ papers for comprehensive exam preparation. Practice with real exam questions, test your knowledge, and enhance your exam readiness with these valuable resources."
        canonical="https://mcqera.in/previous-year"
        additionalLinkTags={{
          name: "keywords",
          content:"Previous year MCQ papers, exam preparation resources, practice papers, exam question bank, mock tests, exam practice, test your knowledge, exam readiness, question papers with answers, exam pattern, exam syllabus, practice quizzes, exam simulation, exam practice questions, exam revision, exam tips and tricks, exam strategies, exam study materials, online test series, exam success tips"
        }}
      />
      {/* seo */}

      <h1 className="text-xl text-center">Previous year Papers</h1>

      <div className="flex justify-end">
          {expanded === "" || expanded === false  ? (
            <Button variant="outlined" color="inherit" onClick={() => setExpanded(undefined)} size="small"> <UnfoldMoreIcon />Expand All</Button>
          ) : (
            <Button variant="outlined" color="inherit" onClick={() => setExpanded("")} size="small"><UnfoldLessIcon />Collapse All</Button>
          )}
        </div>

      {data.length !== 0 ? (
        data.map((element, i) => {
          return (
            <Accordion
            className="make-com-dark my-4"
            key={i}
            defaultExpanded={true}
            id={element[0].branch}
            onChange={handleChange(element[0].branch)}
            expanded={  
              expanded === element[0].branch || expanded === undefined
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
                  {element[0].branch.toUpperCase()}
                </h2>
              </AccordionSummary>

              <Divider className=" bg-white" />

              {element.map((item, index) => {
                return (
                  <AccordionDetails className="w-full" key={index}>
                    <div className="hover:opacity-50 cursor-pointer w-full">
                      <Link
                        href={`/previous-year/${item.branch}/${item.examname}`}
                      >
                        {/*this display branch name */}
                        <LocalLibraryIcon className="mr-3" />
                        {titleCase(item.examname.replaceAll("-" , " "))}
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
