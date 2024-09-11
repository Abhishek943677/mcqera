import React, { useEffect, useState } from "react";
import Header from "./Header";
import Scrolltotop from "../widgets/ScrolltoTop";
import { useRouter } from "next/router";
import { LinearProgress } from "@mui/material";
import SideNav from "./SideNav";
import AdsSideBar from "../AdsSideBar";
import LowerHeader from "./LowerHeader";
import Share from "../Share";

export default function Layout({ children }) {
  const router = useRouter();
  const [urlChange, setUrlChange] = useState(false);

  useEffect(() => {
    setUrlChange(false);
    router.events.on("routeChangeStart", () => {
      setUrlChange(true);
    });
    router.events.on("routeChangeComplete", () => {
      setUrlChange(false);
    });
  }, []);

  return (
    <div className="">
      {/* <Seo /> */}

      {urlChange ? (
        <div className=" border-0 rounded-md fixed top-0 w-full z-50 ">
          <LinearProgress color="primary" sx={{ height: "5px" }} />
        </div>
      ) : (
        ""
      )}

      <Scrolltotop />

      {/* this is side nav childs */}
      <SideNav>
        <div
          className={`${
            router.pathname === "/" ? "fixed w-full top-2 z-50" : "mt-2"
          }`}
        >
          <Header />
          <LowerHeader />
        </div>

        <div className={`flex`}>
          <div
            className={`w-[72%] max-[640px]:w-full sm:w-full sm:p-1 max-[640px]:p-1`}
          >
            {children}

            {/*ads for smaller screens */}
            <div
              className={`${
                router.pathname === "/"
                  ? "hidden"
                  : "max-[640px]:flex sm:flex w-full"
              } border border-green-600  bg-gray-700  lg:hidden xl:hidden md:hidden `}
            >
              <AdsSideBar />
            </div>
          </div>

          {/* ads for larger screen */}
          <div
            className={`${
              router.pathname === "/"
                ? "hidden"
                : "w-[28%]  lg:flex xl:flex md:flex "
            } border border-black px-1 h-fit bg-gray-700 max-[640px]:hidden sm:hidden mt-16  `}
          >
            <AdsSideBar />
          </div>

          
        </div>

        <Share url={router.asPath} />
      </SideNav>
    </div>
  );
}


