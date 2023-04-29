import React, { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import Scrolltotop from "../widgets/ScrolltoTop";
import { useRouter } from "next/router";
import SideNav from "../SideNav";

export default function Layout({ children }) {
  return (
    <div>
      <SideNav>
        <Header />
        <Scrolltotop />
        {children}
      </SideNav>
    </div>
  );
}
