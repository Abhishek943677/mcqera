import React, { useState } from "react";
import PreviousYearMenu from "./PreviousYearMenu";
import Footer from "./Footer";
import { BiMenu } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import Scrolltotop from "./widgets/ScrolltoTop";

export default function SideNav({ children }) {
  const [open, setOpen] = useState(false);
  const handlesidebar = () => {
    setOpen(!open);
  };

  return (
    // for bigger devices
    <div>
      <div className="flex max-[640px]:hidden sm:hidden lg:flex xl:flex md:flex ">
        {/* hamburger icon and its logic */}
        <div className="absolute top-14 right-4">
          <p onClick={handlesidebar} className="cursor-pointer">
            {!open ? (
              <BiMenu className="w-10 h-10" />
            ) : (
              <CgClose className="w-10 h-10" />
            )}
          </p>
        </div>

        {/* div for sidebar and its content */}
        <div
          className={`bg-slate-400 overflow-x-auto fixed top-0  h-full dark:bg-slate-600 ${open ? "hidden": "w-[20%]"} `}
        >
          <PreviousYearMenu />
        </div>

        <div className={` overflow-y-auto m-auto   ${open?"w-full ml-0":"ml-[20%] w-full"}`}>
          {children}
          <Footer />
        </div>
      </div>



      {/* for smaller devices */}
      <div className="flex max-[640px]:flex sm:flex lg:hidden xl:hidden md:hidden relative">

        {/* hamburger icon and its logic */}
        <div className="absolute top-10 right-4">
          <p onClick={handlesidebar} className="cursor-pointer">
            {!open ? (
              <BiMenu className="w-10 h-10" />
            ) : (
              <CgClose className="w-10 h-10" />
            )}
          </p>
        </div>


        {/* div for sidebar and its content */}
        <div
          className={`bg-slate-600 top-0 overflow-x-auto ${
            open
              ? "h-[100vh] fixed left-0 top-0 w-fit px-5 mt-0 pt-6 z-50"
              : "hidden"
          }`}
        >
          <PreviousYearMenu />
        </div>


        {/* for footer and children */}
        <div className={` overflow-y-auto m-auto w-full`}>
          {children}
          <Footer />
        </div>
      </div>
    </div>
  );
}
