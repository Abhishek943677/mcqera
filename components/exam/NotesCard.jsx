import Link from "next/link";
import React, { useEffect, useState } from "react";
import { titleCase } from "../../usefulFun/titleCase";
import ResponsiveSlider from "../ResponsiveSlider";

function NotesCard({ title, slug }) {
  return (
    <div className=" h-52 rounded-lg overflow-hidden shadow-lg bg-gradient-to-r from-purple-300 via-pink-300 to-red-300 p-4 m-4  transition-transform transform hover:scale-105 hover:shadow-2xl">
      <div className="px-2 py-2 flex flex-col justify-evenly h-full">
        <p className="text-xl font-bold mb-4 text-gray-900">
          {titleCase(title)}
        </p>
        <p>
          <Link
            href={`/notes/${slug.current}`}
            className=" text-white  bg-indigo-500 hover:bg-indigo-600 font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
          >
            View Notes
          </Link>
        </p>
      </div>
    </div>
  );
}

function NotesList({ notesData }) {
  return (
    <section className="p-2">
      <h2 className="text-4xl font-bold bg-clip-text text-transparent mb-1 tracking-wide drop-shadow-lg animate-pulse bg-gradient-to-r from-[#a47cc6] to-[#c47db9]">
        Handwritten Notes
      </h2>

      <p className="text-lg">
        Explore our collection of handwritten notes, created by students for
        students. These notes simplify complex topics, making them perfect for
        exam prep and everyday study. Get the insights you need, straight from
        your peers.
      </p>

      {notesData.length >= 2 ? (
        <ResponsiveSlider>
          {notesData.map((item, index) => (
            <NotesCard key={index} title={item.title} slug={item.slug} />
          ))}
        </ResponsiveSlider>
      ) : (
        <div className="w-full flex ">
          {notesData.map((item, index) => (
            <NotesCard key={index} title={item.title} slug={item.slug} />
          ))}
        </div>
      )}
    </section>
  );
}

export default NotesList;
