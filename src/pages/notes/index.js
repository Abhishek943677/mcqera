import React, { useEffect } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Divider, Paper } from "@mui/material";
import Link from "next/link";
import Head from "next/head";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SchoolIcon from "@mui/icons-material/School";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import { clientNotes } from "../../../lib/sanityConnect";

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
  const dataUnorganised = await clientNotes.fetch(
    `*[_type=="notes"]{category,slug,title}`
  );
  const sorted = dataUnorganised.sort(
    (a, b) => a.category.length - b.category.length
  );

  const gotArrayOfSession = sorted.map((i, index) => {
    return i.category;
  });

  const uniqueArrayOfSession = [...new Set(gotArrayOfSession)];
  var furnished = [];

  for (let i = 0; i < uniqueArrayOfSession.length; i++) {
    const category = uniqueArrayOfSession[i];
    const d = dataUnorganised.filter((i) => i.category === category);
    const sorted = d.sort((a, b) => b.title.length - a.title.length);
    furnished.push(sorted);
  }

  return {
    props: { data: furnished },
    revalidate: 60,
  };
}

export default Index;
