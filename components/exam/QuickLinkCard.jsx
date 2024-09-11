import Link from "next/link";
import React from "react";
import ResponsiveSlider from "../ResponsiveSlider";
import { titleCase } from "../../usefulFun/titleCase";

function QuickLinkCard({ title, slug, branch }) {
  return (
    <div className="rounded-lg overflow-hidden shadow-lg bg-gradient-to-br from-[#e882b3] to-[#ffffff] p-4 m-4 h-52">
      <div className="px-2 py-2 flex flex-col justify-around h-full">
        <div className="font-bold text-xl mb-2 text-gray-800">
          {titleCase(title)}
        </div>
        <p>
          <Link
            href={`/quicklinks/${branch}/${slug.current}`}
            className=" text-white  bg-indigo-500 hover:bg-indigo-600 font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
          >
            View Paper
          </Link>
        </p>
      </div>
    </div>
  );
}

function QuickLinksList({ quickLinksData }) {
  return (
    <section className="p-2">
      <h2 className="text-4xl font-bold bg-clip-text text-transparent mb-1 tracking-wide drop-shadow-lg animate-pulse bg-gradient-to-r from-[#ee0979] to-[#ffffff]">
        Quicklinks
      </h2>{" "}
      <p className="text-lg">
        Enhance your study sessions with quick access to essential questions.
        Our curated quick links connect you directly to important practice
        questions, helping you focus on the most relevant topics and sharpen
        your understanding with ease.
      </p>
      {quickLinksData.length >= 2 ? (
        <ResponsiveSlider>
          {quickLinksData.map((item, index) => (
            <QuickLinkCard
              key={index}
              title={item.title}
              slug={item.slug}
              branch={item.branch[0]}
            />
          ))}
        </ResponsiveSlider>
      ) : (
        <div className="w-full flex ">
          {quickLinksData.map((item, index) => (
            <QuickLinkCard
              key={index}
              title={item.title}
              slug={item.slug}
              branch={item.branch[0]}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default QuickLinksList;
