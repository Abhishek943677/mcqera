import { Divider, Paper } from "@mui/material";
import Link from "next/link";
import React from "react";

export default function PYQLinks({ data }) {
  return (
    <>
      <h1 className="mx-auto text-center m-3 text-2xl">PYQ Links to MCQs</h1>

      <div className="flex flex-row flex-wrap justify-center">
        {data.map((element, i) => {
          return (
            <Paper
              key={i}
              className="p-1 make-body-dark my-2 mx-1 hover:shadow-xl shadow-md rounded-md lg:w-[20rem] md:w-[18rem] xl:w-[24rem] sm:w-full max-[639px]:w-full"
            >
              <main className="flex flex-wrap flex-col">
                <h2 className="ml-20 p-1 text-2xl">{element[0].examname}</h2>
                {element.map((i, index) => {
                  return (
                    <Link
                        href={`/previous-year/${i.examname}/${i.branch}`}
                        key={index}
                      >
                    <li  className="px-1 py-1 hover:opacity-50">
                        {i.branch} {/*this display branch name */}
                    </li>
                      </Link>
                  );
                })}
              </main>
            </Paper>
          );
        })}
      </div>
    </>
  );
}
