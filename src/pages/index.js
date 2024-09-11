import React from "react";
import { useEffect } from "react";
import Intro from "../../components/home/intro";
import Services from "../../components/home/Services";
import Features from "../../components/home/Features";
import WhyPrepareWithUs from "../../components/home/WhyPrepareWithUs";
import Menu from "../../components/home/Menu";
import Banner from "../../components/home/Banner";

export default function Home() {
  return (
    <main className="-m-1">
    <Banner />
     {/* <Intro /> */}
     <Menu />
      <Services />
     <Features />
     <WhyPrepareWithUs /> 
    </main>

  );
}
