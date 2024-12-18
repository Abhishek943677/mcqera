import Link from "next/link";
import React, { useEffect, useState } from "react";
import DownArrow from "../widgets/DownArrow";
import { Divider } from "@mui/material";
import { useRouter } from "next/router";
import {
  fetchHeaderBranch,
  fetchHeaderExam,
  fetchPYQdata,
} from "../../logics/fetchHeaderData";



export default function LowerHeader() {
  const [examData, setExamData] = useState([]);
  const [branchData, setBranchData] = useState([]);
  const [pyqData, setPyqData] = useState([]);


  useEffect(async () => {
    const branchData = await fetchHeaderBranch();
    const examData = await fetchHeaderExam();
    const PYQdata = await fetchPYQdata();

    setPyqData(PYQdata);
    setBranchData(branchData);
    setExamData(examData);
  }, []);

  const headerData = [
    {
      displayName: "Exams",
      url: "/exam/",
      sections: examData,
    },
    {
      displayName: "PYQ",
      url: "/previous-year/",
      sections: pyqData,
    },
    {
      displayName: "Handwritten Notes",
      url: "/notes?section=",
      sections: examData,
    },
    {
      displayName: "Quiz",
      url: "/quiz?section=",
      sections: branchData,
    },
    {
      displayName: "Learn",
      url: "/learn?section=",
      sections: branchData,
    },
    {
      displayName: "Quicklinks",
      url: "/quicklinks?section=",
      sections: examData,
    },
  ];

  // console.log(headerData);
  

  const router = useRouter();
  return (
    <div className={`flex mt-3 flex-wrap w-11/12 `}>
      {" "}
      {/* main div container*/}
      {/* DOM for lower hearder starts*/}
      {headerData.map((item, index) => {
        return (
          //div container for every dropdown and its content
          <div className="dropdown w-fit" key={index}>
            <p className="dropbtn flex select-none">
              {item.displayName} <DownArrow /> {/* this is for display name */}
            </p>

            {/* inner content div that is being seen when hover */}
            <div className="dropdown-content pb-3">
              {/* mapping thorough category | sections */}
              {item.sections.map((section, i) => {
                return (
                  // link div to other pages
                  <div
                    className=" mt-3 mx-2 flex rounded-md list-none text-center flex-wrap px-2 py-1"
                    key={i}
                  >
                    <Link
                      href={`${item.url}${section.path}`}
                      key={i}
                    >
                      <h3 className="text-sm my-auto">{section.displayName}</h3>
                      <Divider className="bg-white" />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
