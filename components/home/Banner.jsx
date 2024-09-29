import React from "react";
import linkData from "../../constants/linksData.json";
import Link from "next/link";
import { Divider } from "@mui/material";

export default function Banner() {
  return (
    <section className="bg-gray-900 text-white h-[100vh]" id="intro">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-3xl text-center  max-[1026px]:mt-28">
          <h1 className="bg-gradient-to-r  from-green-300 via-blue-500 to-purple-600 bg-clip-text text-4xl font-extrabold text-transparent sm:text-5xl">
            One Stop Solution for your
            <span className="sm:block"> Dream Job. </span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-2xl">
            Achieve your dream job with us. Get previous year papers, subject
            materials, quizzes, and handwritten notes all in one place to
            enhance your study and succeed.
          </p>


          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div className="relative group">
              <button className="block w-full cursor-pointer rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto">
                Get Started
              </button>

              {/* Dropdown Menu */}
              <div className="absolute z-50 hidden group-hover:block bg-white border border-gray-200 rounded shadow-lg bottom-full">
                <ul className="py-2">
                  {linkData.map((item, index) => {
                    return (
                      <li key={index}>
                        <Link
                          href={item.path}
                          className="block px-4 py-2 text-base text-gray-700 hover:bg-blue-600 hover:text-white"
                        >
                          {item.name}
                        </Link>
                        <Divider />
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
