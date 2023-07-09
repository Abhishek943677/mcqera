import React, { useEffect } from "react";
import { clientIgnou } from "../../../lib/sanityConnect";
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
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';

const Index = ({ data }) => {
  console.log(data);
  return (
    <main>
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
                <AccordionDetails className="w-full">
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
  const dataUnorganised = await clientIgnou.fetch(
    `*[_type=="post"]{session,subjectName,slug}`
  );
  const sorted = dataUnorganised.sort(
    (a, b) => a.session.length - b.session.length
  );

  const gotArrayOfSession = sorted.map((i, index) => {
    return i.session;
  });

  const uniqueArrayOfSession = [...new Set(gotArrayOfSession)];
  var furnished = [];

  for (let i = 0; i < uniqueArrayOfSession.length; i++) {
    const session = uniqueArrayOfSession[i];
    const d = dataUnorganised.filter((i) => i.session === session);
    const sorted = d.sort(
      (a, b) => b.subjectName.length - a.subjectName.length
    );
    furnished.push(sorted);
  }

  return {
    props: { data: furnished },
    revalidate: 60,
  };
}

export default Index;
