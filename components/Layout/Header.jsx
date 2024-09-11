import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { Avatar, Button, Divider, Paper, Tooltip } from "@mui/material";
import { useRouter } from "next/router";
import { BiHome } from "react-icons/bi";
import { RiArrowGoBackFill } from "react-icons/ri";
import Login from "../login/Login";
import DarkthemeSwitch from "../widgets/DarkthemeSwitch";

export default function Header() {
  const { data: session } = useSession();
  const [dark, setDark] = useState(true);
  const router = useRouter();


  useEffect(() => {
    // setShowProfile(false);

    // dark theme logics
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
      <div className="flex w-24 justify-between mx-4 my-1">
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
        {/* login and signIn things */}
        {session ? (
          <div id="avatar-div">
            <div className="flex cursor-pointer mr-3 ">
              <Avatar className="w-fit" />
            </div>

            {/* profile modal */}
            <div>
              <Paper
                elevation={3}
                id="profileModal"
                className={` z-50 list-none absolute md:top-[3.6rem] lg:top-[2.6rem] sm:top-[2.6rem] max-[640px]:top-[2.6rem] right-[3.2rem] p-4 rounded make-com-dark`}
              >
                <li>
                  <p>{session.user.name}</p>
                  <Divider />
                </li>
                <li>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => signOut()}
                  >
                    log out
                  </Button>
                </li>
              </Paper>
            </div>
          </div>
        ) : (
          <div>
            <Login />
          </div>
        )}

      </div>
    </div>
  );
}
