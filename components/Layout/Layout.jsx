import React, { useEffect, useState } from "react";
import Header from "../Header";
import Scrolltotop from "../widgets/ScrolltoTop";
import SideNav from "../SideNav";

export default function Layout({ children }) {
  return (
    <div>
      <Scrolltotop />
      <SideNav>
        <Header />
        {children}
      </SideNav>
    </div>
  );
}
