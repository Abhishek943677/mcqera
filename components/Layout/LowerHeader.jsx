import Link from "next/link";
import React, { useState } from "react";
import DownArrow from "../widgets/DownArrow";
import { useEffect } from "react";
import { clientQuickLinks } from "../../lib/sanityConnect";

export default function LowerHeader() {
  const [quickLinksData, setQuickLinksData] = useState([]);
  useEffect(() => {
    //getting data for quick links
    clientQuickLinks
      .fetch(`*[_type=="quicklinks"]{category,title,slug}`)
      .then((quicklinksUnorganised) => {
        quicklinksUnorganised.sort(
          (a, b) => a.category.length - b.category.length
        );

        const gotArrayOfCategory = quicklinksUnorganised.map((i, index) => {
          return i.category;
        });

        const uniqueArrayOfCategory = [...new Set(gotArrayOfCategory)];

        var furnished = [];

        for (let i = 0; i < uniqueArrayOfCategory.length; i++) {
          const category = uniqueArrayOfCategory[i];
          const d = quicklinksUnorganised.filter(
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
    <div>
      {/* DOm for quickLinks */}
      <div className="dropdown ">
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
    </div>
  );
}
