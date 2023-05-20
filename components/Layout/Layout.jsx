import React, { useEffect, useState } from "react";
import Header from "../Header";
import Scrolltotop from "../widgets/ScrolltoTop";
import { useRouter } from "next/router";
import { LinearProgress } from "@mui/material";
import SideNav from "./SideNav";
import QuickLinks from "../QuickLinks";
import AdsSideBar from "../AdsSideBar";

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
        <div className="flex">

          <div className="mt-20 w-[75%] border border-red-700">
          {children}
          </div>

          <div className="w-[20%] mt-24  border border-black px-1 h-[26rem] fixed top-0 right-0">
            <AdsSideBar />
          </div>

        </div>
      </SideNav>
    </div>
  );
}
