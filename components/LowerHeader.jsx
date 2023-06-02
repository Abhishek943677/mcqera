import Link from "next/link";
import React from "react";

export default function LowerHeader() {
  return (
      <nav className="flex list-none p-2 w-[85%] flex-wrap">
        <Link href="/ignou">
        <li  className="mx-2 rounded-md">IGNOU Assignment</li>
        </Link>
        <Link href="/lessons">
        <li  className="mx-2 rounded-md">Lessons</li>
        </Link>
        <li  className="mx-2">Interview</li>
      </nav>
  );
}
