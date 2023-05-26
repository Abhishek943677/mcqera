import React, { useEffect, useState } from "react";
import { BiMenu } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import PreviousYearMenu from "../PreviousYearMenu";
import Footer from "../Footer";
import getPreviousYearData from "../../logics/getPreviousYearData";
import QuickLinks from "../QuickLinks";

// export default function SideNav({ children }) {
const SideNav = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    getPreviousYearData().then((data) => {
      setData(data);
    });
  }, []);

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
          className={`bg-slate-400 overflow-x-auto fixed top-0  h-full dark:bg-slate-600 ${
            open ? "hidden" : "w-[20%]"
          } `}
        >
          <PreviousYearMenu data={data} />
        </div>

        {/* this is the place where all the child components comes in */}
        
        <div
          className={` overflow-y-auto m-auto   ${
            open ? "w-full ml-0" : "ml-[20%] w-full"
          }`}
        >
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
          className={`bg-slate-600 w-fit max-[290px]:w-8/12 overflow-x-auto flex flex-wrap ${
            open
              ? "h-[100vh] fixed left-0 top-0 px-5 mt-0 pt-6 z-50"
              : "hidden"
          }`}
        >
          <PreviousYearMenu data={data} />
        </div>

        {/* for footer and children */}
        <div className={` overflow-y-auto m-auto w-full`}>
          {children}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default SideNav;
