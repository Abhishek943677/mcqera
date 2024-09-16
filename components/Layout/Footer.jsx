import { Paper, Box, Divider } from "@mui/material";
import React from "react";
import {
  Facebook,
  Google,
  Instagram,
  Telegram,
  YouTube,
} from "@mui/icons-material";
import { useRouter } from "next/router";

export default function Footer() {
  const router = useRouter();
  return (
    <Box
      elevation={3}
      class={`text-center text-white  w-full mx-auto sm:w-full sm:mx-auto bg-blue-950 `}
    >

      {/* for urls to other pages */}
      <div class="container pt-9 mx-auto sm:mx-auto sm:w-full">
        <p className="bold font-bold text-center mb-4">Follow Us On &nbsp;</p>
        <div class="flex justify-center " id="social-media">
          <a href="#!" class="mx-4 text-neutral-800 dark:text-white">
            {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          fill="currentColor"
          viewBox="0 0 24 24">
          <path
            d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
        </svg> */}
            <Facebook />
          </a>
          <a href="#!" class="mx-4 text-neutral-800 dark:text-white">
            <YouTube />
          </a>
          <a href="#!" class="mx-4 text-neutral-800 dark:text-white">
            <Instagram />
          </a>
          <a href="#!" class="mx-4 text-neutral-800 dark:text-white">
            <Telegram />
          </a>
          <a href="#!" class="mx-4 text-neutral-800 dark:text-white">
            <Google />
          </a>
        </div>
      </div>
      {/* <Divider style={{ backgroundColor: "white" }} />{" "} */}
      <div class="text-center py-6 ">
        © 2024 Copyright :
        <a class="text-black dark:text-white" href="https://solity.tech">
          {" "}
          solity.tech
        </a>
      </div>
    </Box>
  );
}
