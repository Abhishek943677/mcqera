import Link from "next/link";
import React, { useState } from "react";
import DownArrow from "../widgets/DownArrow";
import { useEffect } from "react";
import getQuickLinkData from "../../logics/getQuickLinkData";

export default function LowerHeader() {
  const [quickLinksData, setQuickLinksData] = useState([]);

  useEffect(() => {
    //getting data for quick links
    
      // const quickLinksData = getQuickLinkData ().then(data => {
        // console.log (data);
        // setQuickLinksData(data)
      // })

    // getting data for previous-papers
  }, []);

  return (
    <div className="flex">
      {/* DOm for quickLinks */}
      <div className="dropdown w-fit ">
        <p className="dropbtn flex">
          QuickLinks <DownArrow />
        </p>
        <div className="dropdown-content ">
          {quickLinksData.map((item, index) => {
            return (
              <div
                className=" my-1 mx-2 flex rounded-md list-none text-center flex-wrap px-2 py-1"
                key={index}
              >
                <h1 className="text-2xl my-auto">{item[0].category}: </h1>
                {item.map((item, index) => (
                  <li key={index} className="px-2 my-auto hover:opacity-50">
                    <Link
                      href={`/quicklinks/${item.category}/${item.slug.current}`}
                    >
                      {item.title} {/*this display branch name */}
                    </Link>
                  </li>
                ))}
              </div>
            );
          })}
        </div>
      </div>
      {/* -------dom for quicklinks ends------------ */}

      {/* dom for pyq */}
      <div className="dropdown w-fit ">
        <p className="dropbtn flex">
          PYQ <DownArrow />
        </p>
        <div className="dropdown-content ">
          {quickLinksData.map((item, index) => {
            return (
              <div
                className=" my-1 mx-2 flex rounded-md list-none text-center flex-wrap px-2 py-1"
                key={index}
              >
                <h1 className="text-2xl my-auto">{item[0].category}: </h1>
                {item.map((item, index) => (
                  <li key={index} className="px-2 my-auto hover:opacity-50">
                    <Link
                      href={`/${item.category}/${item.slug.current}`}
                    >
                      {item.title} {/*this display branch name */}
                    </Link>
                  </li>
                ))}
              </div>
            );
          })}
        </div>
      </div>
      {/* ------------dom for pyq ---------- */}
    </div>
  );
}
