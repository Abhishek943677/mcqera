import React, { useEffect } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SchoolIcon from "@mui/icons-material/School";

import Link from "next/link";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
} from "@mui/material";
import Head from "next/head";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import getIgnouData from "../../../logics/getIgnouData";
import { NextSeo } from "next-seo";

const Index = ({ data }) => {
  // console.log(data);

  return (
    <main>
      {/* SEO .... */}
      <NextSeo
        title={`Online IGNOU Assignments | Download IGNOU Solved Assignments`}
        description={`Get high-quality IGNOU solved assignments for various courses. Get reliable and well-crafted IGNOU assignment. Download solved assignments for various courses to ensure your academic success.`}
        canonical={`https://mcqera.com/ignou-assignments`}
      />
      {/* ....SEO */}




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
                <CalendarMonthRoundedIcon className="mr-3" />
                {element[0].session}
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
                    <Link href={`/ignou/assignment/${item.slug.current}`}>
                      <p className="w-full">
                        <SchoolIcon className="mr-3" />
                        {item.subjectName}
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
  const ignouData = await getIgnouData();

  return {
    props: { data: ignouData },
    revalidate: 600,
  };
}

export default Index;
