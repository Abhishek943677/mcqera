import Link from "next/link";
import React, { useState } from "react";
import DownArrow from "../widgets/DownArrow";
import { useEffect } from "react";
import getQuickLinkData from "../../logics/getQuickLinkData";
import { Divider } from "@mui/material";

export default function LowerHeader() {
  const [quickLinksData, setQuickLinksData] = useState([]);

  useEffect(() => {
    //getting data for quick links
    const quickLinksData = getQuickLinkData ().then(data => {
      console.log (data);
      setQuickLinksData(data)
    })
    // getting data for previous-papers
  }, []);

  return (
    <div className="flex mt-2">
      {/* DOm for quickLinks */}
      <div className="dropdown w-fit ">
        <p className="dropbtn flex">
          PYQ <DownArrow />
        </p>
        <div className="dropdown-content ">
          {/* {quickLinksData.map((item, index) => {
            return (
              <div
                className=" my-1 mx-2 flex rounded-md list-none text-center flex-wrap px-2 py-1"
                key={index}
              >
                <Link href={`/quicklinks?section=${item[0].category}`}>
                <h1 className="text-lg my-auto">{item[0].category} </h1>
                </Link>
              </div>
            );
          })} */}

          <div
            className=" mt-2 mx-2 flex rounded-md list-none text-center flex-wrap px-2 py-1"
            key="1"
          >
            <Link href={`/quicklinks?section=ssc`}>
              <h1 className="text-lg my-auto"> ssc</h1>
            </Link>
          </div>
          <Divider className="bg-white" />
          <div
            className=" my-1 mx-2 flex rounded-md list-none text-center flex-wrap px-2 py-1"
            key="2"
          >
            <Link href={`/quicklinks?section=medical`}>
              <h1 className="text-lg my-auto"> medical</h1>
            </Link>
          </div>

        </div>
      </div>
      {/* -------dom for quicklinks ends------------ */}

      {/* dom for pyq */}
      <div className="dropdown w-fit ">
        <p className="dropbtn flex">
          Quicklinks <DownArrow />
        </p>
        <div className="dropdown-content ">
          {quickLinksData.map((item, index) => {
            return (
              <div
                className=" my-1 mx-2 flex rounded-md list-none text-center flex-wrap px-2 py-1 min-w-[15rem] flex-col"
                key={index}
              >
                <h1 className="text-xl my-auto">
                  {item[0].category.toUpperCase()}:
                </h1>
                <Divider className="bg-white" />
                {item.map((item, index) => (
                  <li key={index} className="my-auto hover:opacity-50">
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
      {/* ------------dom for pyq ---------- */}
    </div>
  );
}
