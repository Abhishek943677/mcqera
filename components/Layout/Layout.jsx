import React, { useEffect, useState } from "react";
import Header from "../Header";
import Scrolltotop from "../widgets/ScrolltoTop";
import { useRouter } from "next/router";
import { LinearProgress } from "@mui/material";
import SideNav from "./SideNav";
import AdsSideBar from "../AdsSideBar";
import LowerHeader from "../LowerHeader";

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
      {urlChange ? (
        <div className=" border-0 rounded-md fixed top-0 w-full">
          <LinearProgress color="primary" sx={{ height: "5px" }} />
        </div>
      ) : (
        ""
      )}

      <Scrolltotop />

      <SideNav>
        <div className="">
          <Header />
        </div>

       <LowerHeader /> 
       
        <div className="flex">
          <div className="mt-20 w-[75%] border border-red-700 max-[640px]:w-full sm:w-full sm:p-1 max-[640px]:p-1">
            {children}

            {/*ads for smaller screens */}
            <div className="border border-green-600 w-full bg-gray-700 max-[640px]:flex sm:flex lg:hidden xl:hidden md:hidden">
              <AdsSideBar />
            </div>
          </div>

          {/* ads for larger screen */}
          <div className="w-[24.8%] mt-5 border border-black px-1 min-h-screen bg-gray-700 max-[640px]:hidden sm:hidden lg:flex xl:flex md:flex">
            <AdsSideBar />
          </div>
        </div>
      </SideNav>
    </div>
  );
}
