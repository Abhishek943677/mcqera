import Link from "next/link";
import React from "react";
import LaunchIcon from "@mui/icons-material/Launch";
import linksData from "../constants/linksData";

export default function UrlsComponent({ alignment }) {
  return (
    <div
      className={`list-none ${alignment === "true" ? "flex" : ""} flex-wrap`}
    >
      {linksData.map((link) => (
        <Link href={link.path}>
          <li className="mx-2 rounded-md text-lg my-2 hover:opacity-50">
            {link.name}
            <span  className={`${alignment === "true" ? "" : ""} ml-1`}>
            <LaunchIcon fontSize="inherit" />
            </span>
          </li>
        </Link>
      ))}
    </div>
  );
}
