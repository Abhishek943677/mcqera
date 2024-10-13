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
    <div className=" flex w-full my-auto justify-evenly mt-10">
     <p className="w-fit px-4 text-xl my-auto text-[#e1b671] font-bold pt-[0.5rem]">
        {`Course:`}
      </p>
      <Select 
      sx={{ color: "#616147", backgroundColor: "#e1b671" }}
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
