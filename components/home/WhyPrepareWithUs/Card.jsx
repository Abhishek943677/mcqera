import Image from "next/image";
import React from "react";

export default function Card({ item, index }) {
  return (
    <div
    data-aos="fade-down" data-aos-duration='700'
      className={`flex px-4 cursor-default flex-col  lg:flex-row ${
        index % 2 === 0
          ? "lg:flex-row bg-gradient-to-r from-blue-700 via-blue-900 to-slate-950"
          : "lg:flex-row-reverse bg-gradient-to-l from-blue-700 via-blue-900 to-slate-950"
      } w-[90vw] lg:w-[75vw] justify-between mt-8 mb-0 p-4 lg:p-6 shadow-2xl rounded-3xl overflow-hidden transform transition-transform duration-500 hover:scale-105 mx-auto`}
    >
      <div className="relative flex-shrink-0 mx-auto lg:mx-0 mb-4 lg:mb-0">
        <Image
          height={250}
          width={250}
          alt={item.title}
          src={item.image}
          className="rounded-full shadow-xl"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900 opacity-50 rounded-full pointer-events-none"></div>
      </div>
      <div className="lg:py-16 w-full lg:w-72 flex flex-col justify-center text-center lg:text-left">
        <h2 className="text-white text-2xl lg:text-3xl font-extrabold mb-2 lg:mb-4">
          {item.title}
        </h2>
        <article className="space-y-4 text-white text-sm lg:text-base">
          <p>{item.description}</p>
        </article>
      </div>
    </div>
  );
}
