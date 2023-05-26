import { Divider, Paper } from "@mui/material";
import Link from "next/link";
import React from "react";

export default function QuickLinks({ data }) {
  return (
    <>
      <h1 className="mx-auto text-center m-3 text-2xl">Quick links</h1>

    <div className="flex flex-row flex-wrap">
      {data.map((element, i) => {
        return (
          <Paper
          key={i}
            className="p-2 my-1 make-body-dark mx-auto hover:shadow-xl shadow-md rounded-md"
            // elevation={2}
          >
            <main className="flex flex-wrap w-[20rem] flex-col">
              <h1 className="ml-16 p-1 text-2xl">{element[0].category}</h1>
              {/*this displays quicklinks */}
              {element.map((i, index) => {
                return (
                  <li key={index} className="px-1 py-1 hover:opacity-50">
                    <Link href={`/quicklinks/${i.category}/${i.slug.current}`}>
                      {i.title} {/*this display branch name */}
                    </Link>
                  </li>
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
