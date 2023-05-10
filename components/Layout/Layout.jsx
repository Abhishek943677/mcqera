import React, { useEffect, useState } from "react";
import Header from "../Header";
import Scrolltotop from "../widgets/ScrolltoTop";
import SideNav from "../SideNav";
import { useRouter } from "next/router";
import { LinearProgress } from "@mui/material";

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
          <LinearProgress color="primary" sx={{height:"5px"}}/>
        </div>
      ) : (
        ""
      )}

      <Scrolltotop />
      <SideNav>
        <Header />
        {children}
      </SideNav>
    </div>
  );
}
