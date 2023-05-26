import { MenuItem, Select, Typography } from "@mui/material";
import React from "react";

export default function ChangeTrade({
  trade,
  courses,
  setSubject,
  setSubjects,
  setTrade,
}) {
  return (
    <div className=" flex w-full my-auto justify-evenly">
     <p className="w-fit px-4 text-xl my-auto text-gray-900 pt-[0.5rem]">
        {`Course:`}
      </p>
      <Select
        name="trade"
        variant="outlined"
        className="my-auto w-full h-12"
        value={trade}
        onChange={(e) => {
          setTrade(e.target.value);
          const getSubjects = courses.filter((p) => p.trade === e.target.value);
          setSubjects(getSubjects[0].subjects);
          setSubject(getSubjects[0].subjects[0]);
        }}
      >
        {courses.map((p, i) => {
          return (
            <MenuItem key={i} value={p.trade}>
              {p.trade}
            </MenuItem>
          );
        })}
      </Select>
    </div>
  );
}
