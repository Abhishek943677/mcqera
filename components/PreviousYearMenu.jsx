import React, { useEffect, useState } from "react";
import Link from "next/link";
import Spinner from "./widgets/Spinner";
import { Divider } from "@mui/material";
import Image from "next/image";

export default function PreviousYearMenu({ data }) {
  return (
    <div className="">

      <h1 className="text-xl text-center">Previous year Papers</h1>
      {data.length !== 0 ? (
        data.map((element, i) => {
          return (
            <div key={i} className="flex flex-col">
              <details className="ml-5 p-2">
                <summary className=" cursor-pointer">
                  {element[0].examname}
                </summary>
                {/*this displays examname */}
                {element.map((i, index) => {
                  return (
                    <div key={index}>
                      <Link href={`/previous-year/${i.examname}/${i.branch}`}>
                        {/*this display branch name */}
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{i.branch}
                      </Link>
                    </div>
                  );
                })}
              </details>
              <Divider />
            </div>
          );
        })
      ) : (
        <div className="mx-auto">
          <Spinner />
        </div>
      )}
    </div>
  );
}
