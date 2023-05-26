import React, { useEffect, useState } from "react";
import Login from "./login/Login";
import { signOut, useSession } from "next-auth/react";
import { Avatar, Button, MenuItem, Select } from "@mui/material";
import DarkthemeSwitch from "./widgets/DarkthemeSwitch";
import { useRouter } from "next/router";
import { BiHome } from "react-icons/bi";
import { RiArrowGoBackFill } from "react-icons/ri";

export default function Header() {
  const { data: session } = useSession();
  const [dark, setDark] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const router = useRouter();

  const toggleDarkMode = (checked) => {
    if (checked) {
      document.getElementsByTagName("html")[0].classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.getElementsByTagName("html")[0].classList.remove("dark");
      localStorage.theme = "light";
    }
  };
  useEffect(() => {
    // console.log(router.asPath)
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.getElementsByTagName("html")[0].classList.add("dark");
      setDark(false);
    } else {
      document.getElementsByTagName("html")[0].classList.remove("dark");
      setDark(true);
    }
  }, []);

  return (
    <div className="flex flex-row justify-between w-full flex-wrap">
      {/* left side header icons */}
      <div className="flex w-24 justify-between mx-4">
        <BiHome
          onClick={() => router.push("/")}
          className="w-8 h-fit cursor-pointer"
        />
        <RiArrowGoBackFill
          onClick={() => router.back()}
          className="w-8 h-fit cursor-pointer"
        />
      </div>

      {/* right side header icons */}
      <div className="mr-3 flex ">
        {/* login and sign in things */}
        {session ? (
          <div>
            <Avatar
              className="cursor-pointer"
              onClick={() => setShowProfile((pre) => !pre)}
            />
            <ul
              className={`list-none absolute md:top-[3.6rem] lg:top-[3.6rem] sm:top-[2.6rem] max-[640px]:top-[2.6rem] right-20 bg-slate-700 p-4 ${
                showProfile ? "block" : "hidden"
              } rounded`}
            >
              <li>{session.user.name}</li>
              <li>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => signOut()}
                >
                  log out
                </Button>
              </li>
            </ul>
          </div>
        ) : (
          <div>
            <Login />
          </div>
        )}
        {/* dark theme button */}
        <DarkthemeSwitch
          checked={!dark}
          onChange={(e) => {
            setDark((p) => !p);
            toggleDarkMode(e.target.checked);
          }}
        />
      </div>
    </div>
  );
}
