import React, { useEffect } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Divider, Paper } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SchoolIcon from "@mui/icons-material/School";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import Link from "next/link";
import Head from "next/head";
import { clientPreviousYear } from "../../../lib/sanityConnect";
import Spinner from "../../../components/widgets/Spinner";

const Index = ({ data }) => {
  console.log(data);

  return (
    <div className="">
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
                    <div
                      className="hover:opacity-50 cursor-pointer w-full"
                    >
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
  const data = await clientPreviousYear.fetch(
    `*[_type=="exams"]{branch,examname}`
  );
  // const data = await clientPreviousYear.fetch(`*[_type=="exams"]{branch,examname}`, { next: { revalidate: 600 } });//60*10 == 10min
  // var data=[];

  const { result } = await fetch(
    "https://ltxionfe.api.sanity.io/v1/data/query/production?query=*%5B_type%3D%3D%22exams%22%5D%7Bbranch%2Cexamname%7D",
    { next: { revalidate: 6000 } }
  ).then((res) => res.json());
  // const result=[]

  // console.log(result)

  // const result = [];
  const sorted = result.sort((a, b) => a.examname.length - b.examname.length);
  // console.log(sorted);

  function removeDuplicates(books) {
    const jsonObject = books.map(JSON.stringify);

    const uniqueSet = [...new Set(jsonObject)];
    const uniqueArray = Array.from(uniqueSet).map(JSON.parse);

    return uniqueArray;
  }
  const uniqueArray = removeDuplicates(sorted);
  // console.table(uniqueArray);

  const gotArrayOfExamname = uniqueArray.map((i, index) => {
    return i.examname;
  });
  const uniqueArrayOfExamname = [...new Set(gotArrayOfExamname)];
  //   console.log(uniqueArrayOfExamname);

  var furnished = [];

  for (let i = 0; i < uniqueArrayOfExamname.length; i++) {
    const examname = uniqueArrayOfExamname[i];
    const d = uniqueArray.filter((i) => i.examname === examname);
    const sorted = d.sort((a, b) => b.branch.length - a.branch.length);
    furnished.push(sorted);
  }

  return {
    props: { data: furnished },
    revalidate: 60,
  };
}

export default Index;
