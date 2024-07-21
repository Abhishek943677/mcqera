import { Divider, Paper } from "@mui/material";
import Link from "next/link";
import React from "react";

export default function NotesLinks({ data }) {
  return (
    <>
      <h1 className="mx-auto text-center m-3 text-2xl">Notes Links</h1>

      <div className="flex flex-row flex-wrap justify-center">
        {data.map((element, i) => {
          return (
            <Paper
              key={i}
              className="p-1 make-body-dark my-2 mx-1 hover:shadow-xl shadow-md rounded-md lg:w-[20rem] md:w-[18rem] xl:w-[24rem] sm:w-full max-[639px]:w-full"
            >
              <main className="flex flex-wrap flex-col">
                <h2 className="ml-20 p-1 text-2xl">{element[0].category}</h2>
                {/*this displays quicklinks */}
                {element.map((i, index) => {
                  return (
                    <Link
                        href={`/notes/${i.slug.current}`}
                        key={index}
                      >
                    <li  className="px-1 py-1 hover:opacity-50">
                        {i.title} {/*this display branch name */}
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
