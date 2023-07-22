import Link from "next/link";
import React, { useState } from "react";
import DownArrow from "../widgets/DownArrow";
import { useEffect } from "react";
import getQuickLinkData from "../../logics/getQuickLinkData";
import { Divider } from "@mui/material";
import headerData from "../../constants/headerData";

export default function LowerHeader() {
  return (
    <div className="flex mt-3 flex-wrap w-11/12 border border-b-emerald-300"> {/* main div container*/}

      {/* DOM for lower hearder starts*/}
      {headerData.map((item, index) => {

        return (

          //div container for every dropdown and its content
          <div className="dropdown w-fit" key={index}>

            <p className="dropbtn flex">
              {item.displayName} <DownArrow /> {/* this is for display name */}
            </p>

            {/* inner content div that is being seen when hover */}
            <div className="dropdown-content pb-3">

              {/* mapping thorough category | sections */}
              {item.sections.map((section, i) => {
                return (

                  // link div to other pages
                  <div
                    className=" mt-2 mx-2 flex rounded-md list-none text-center flex-wrap px-2 py-1"
                    key={i}
                  >
                    <Link href={`${item.url}${section}`} key={i}>
                      <h1 className="text-lg my-auto">{section}</h1>
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
