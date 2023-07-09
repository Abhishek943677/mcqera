import Link from 'next/link';
import React from 'react'
import LaunchIcon from "@mui/icons-material/Launch";


export default function UrlsComponent() {
    return (
        <div className=" list-none">
          <Link href="/ignou">
            <li className="mx-2 rounded-md text-lg my-2 hover:opacity-50">
              IGNOU Assignment
              <LaunchIcon className="mx-2" />
            </li>
          </Link>
          <Link href="/learn">
            <li className="mx-2 rounded-md text-lg my-2 hover:opacity-50">
              Learn
              <LaunchIcon className="mx-2" />
            </li>
          </Link>
          <Link href="/previous-year">
            <li className="mx-2 rounded-md text-lg my-2 hover:opacity-50">
              PYQ
              <LaunchIcon className="mx-2" />
            </li>
          </Link>
          <Link href="/notes">
            <li className="mx-2 rounded-md text-lg my-2 hover:opacity-50">
              Handwritten Notes
              <LaunchIcon className="mx-2" />
            </li>
          </Link>
        </div>
      );
}
