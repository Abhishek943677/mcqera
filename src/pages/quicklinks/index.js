import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Divider,
} from "@mui/material";
import Link from "next/link";
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SchoolIcon from "@mui/icons-material/School";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import getQuickLinkData from "../../../logics/getQuickLinkData";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

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
        title="Quick Links to MCQs | Access a Wide Range of Multiple Choice Questions | mcqera"
        description="Explore a comprehensive collection of quick links to multiple choice questions (MCQs) on various topics. Access a wide range of MCQs to test your knowledge and prepare for exams or assessments. All questions are with detailed answers"
        canonical="https://mcqera.com/quicklinks"
      />
      {/* seo */}

      <h1 className="text-2xl text-center">
        QuickLinks to MCQs of various category
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
            key={i}
            defaultExpanded={true}
            id={element[0].category}
            onChange={handleChange(element[0].category)}
            expanded={
              expanded === element[0].category || expanded === undefined
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
                {element[0].category}
              </h2>
            </AccordionSummary>

            <Divider className=" bg-white " />

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
  // console.log(quickLinkData);

  return {
    props: { data: quickLinkData },
    revalidate: 600,
  };
}

export default Index;
