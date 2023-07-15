import Link from "next/link";
import React, { useState } from "react";
import DownArrow from "../widgets/DownArrow";
import { useEffect } from "react";

export default function LowerHeader() {
  const [quickLinksData, setQuickLinksData] = useState([]);
  useEffect(() => {
    //getting data for quick links
    
      fetch(`https://tudbzgpd.api.sanity.io/v1/data/query/production?query=*%5B_type%3D%3D%22quicklinks%22%5D%7Bcategory%2Ctitle%2Cslug%7D`)
      .then(response=>response.json())

      .then(({result}) => {
        console.log(result)
        result.sort(
          (a, b) => a.category.length - b.category.length
        );

        const gotArrayOfCategory = result.map((i, index) => {
          return i.category;
        });

        const uniqueArrayOfCategory = [...new Set(gotArrayOfCategory)];

        var furnished = [];

        for (let i = 0; i < uniqueArrayOfCategory.length; i++) {
          const category = uniqueArrayOfCategory[i];
          const d = result.filter(
            (i) => i.category === category
          );
          const sorted = d.sort((a, b) => b.title.length - a.title.length);
          furnished.push(sorted);
        }
        console.log(furnished);
        setQuickLinksData(furnished);
      });

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
