import React, { useEffect, useState } from "react";
import { BiMenu } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import Footer from "./Footer";
import Image from "next/image";
import UrlsComponent from "../UrlsComponent";
import { useRouter } from "next/router";
import Share from "../Share";
import SideMenu from "../SideMenu";
import axios from "axios";

const SideNav = ({ children }) => {
  const router = useRouter();
  const [openBig, setOpenBig] = useState(router.pathname === "/");
  const [openSmall, setOpenSmall] = useState(false);

  const handlesidebarBig = () => {
    setOpenBig(!openBig);
  };
  const handlesidebarSmall = () => {
    setOpenSmall(!openSmall);
  };

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setOpenSmall(false);
    });
  }, [router]);

  return (
    <div>
      {/* ---------------------------------------------------for bigger devices------------------------------------------------------------ */}
      <div
        className={`flex max-[640px]:hidden sm:hidden lg:flex xl:flex md:flex `}
      >
        {/* hamburger icon and its logic */}
        <div
          className={`absolute top-16 right-4 ${
            router.pathname === "/" ? "hidden" : ""
          }`}
        >
          <p onClick={handlesidebarBig} className="cursor-pointer">
            {!openBig ? (
              <BiMenu className="w-10 h-10" />
            ) : (
              <CgClose className="w-10 h-10" />
            )}
          </p>
        </div>

        {/* div for sidebar and its content for bigger devices*/}
        <div
          className={`bg-gray-100 overflow-x-auto fixed top-0  h-full text-black z-50 ${
            openBig ? "hidden" : "w-[18%]"
          } `}
        >
          <Image
            src={"/transparent-logo.png"}
            alt="logo"
            height={100}
            width={100}
            className="p-1 m-2"
          />
          {/*  links div for multiple pages*/}

          <UrlsComponent />
          <SideMenu />
        </div>

        {/* this is the place where all the child components comes in */}

        <div
          className={` overflow-y-auto m-auto   ${
            openBig ? "w-full ml-0" : "ml-[18%] w-full"
          }  `}
        >
          {children}
          <UrlsComponent alignment="true" />
          <Footer />
        </div>
      </div>

      {/* ---------------------------------------------------for smaller devices -----------------------------------------------------*/}

      <div className="flex max-[640px]:flex sm:flex lg:hidden xl:hidden md:hidden relative">
        {/* hamburger icon and its logic */}
        <div className={`absolute top-16 right-4 ${ router.pathname === "/" ? "hidden" : ""}`}>
          <p onClick={handlesidebarSmall} className="cursor-pointer">
            {!openSmall ? (
              <BiMenu className="w-10 h-10" />
            ) : (
              <CgClose className="w-10 h-10" />
            )}
          </p>
        </div>

        {/* div for sidebar and its content for smaller devices */}
        <div
          className={`bg-slate-600 w-fit max-[290px]:w-8/12 overflow-x-auto flex-wrap ${
            openSmall
              ? "h-[100vh] fixed left-0 top-0 px-5 mt-0 pt-6 z-50"
              : "hidden"
          }`}
        >
          <Image
            src={"/transparent-logo.png"}
            height={80}
            width={80}
            className="m-1"
          />
          {/*  links div for multiple pages*/}
          <UrlsComponent />
          <SideMenu />
        </div>

        {/* for footer and children */}
        <div className={` overflow-y-auto m-auto w-full`}>
          {children}
          <UrlsComponent alignment="true" />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default SideNav;
