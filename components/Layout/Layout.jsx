import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Header from "../Header";
import Footer from "../Footer";
import Scrolltotop from "../widgets/ScrolltoTop";
import DarkthemeSwitch from "../widgets/DarkthemeSwitch";

export default function Layout({ children }) {
  const [dark, setDark] = useState(null);

  const toggleDarkMode = (checked) => {
    if (checked) {
      document.getElementsByTagName("html")[0].classList.add("dark");
      localStorage.theme="dark"
    } else {
      document.getElementsByTagName("html")[0].classList.remove("dark");
      localStorage.theme ="light"
    }
  };
  useEffect(()=>{
    if (localStorage.theme === "dark" ||(!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.getElementsByTagName("html")[0].classList.add("dark");
      setDark(false)
    } else {
      document.getElementsByTagName("html")[0].classList.remove("dark");
      setDark(true)
    }
  },[])
  return (
    <>
    <Header />
      {children}
      <div className=" fixed bottom-20 right-3 my-3 block z-50">
        <DarkthemeSwitch
          checked={!dark}
          onChange={(e) => {
            setDark((p) => !p);
            toggleDarkMode(e.target.checked);
          }}
        />
      </div>
      <Scrolltotop />
    <Footer />
    </>
  );
}

