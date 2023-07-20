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
        <Header />
        <LowerHeader />

        <div className="flex">
          <div className="mt-5 w-[72%] max-[640px]:w-full sm:w-full sm:p-1 max-[640px]:p-1">
            {children}

            {/*ads for smaller screens */}
            <div className="border border-green-600 w-full bg-gray-700 max-[640px]:flex sm:flex lg:hidden xl:hidden md:hidden">
              <AdsSideBar />
            </div>
          </div>

          {/* ads for larger screen */}
          <div className="w-[28%] mt-5 border border-black px-1 min-h-screen bg-gray-700 max-[640px]:hidden sm:hidden lg:flex xl:flex md:flex">
            <AdsSideBar />
          </div>
        </div>

        <Share url={router.asPath}/>
      </SideNav>
    </div>
  );
}
