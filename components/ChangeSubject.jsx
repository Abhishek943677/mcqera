import { MenuItem, Select, Typography } from "@mui/material";
import React from "react";

export default function ChangeSubject({ setSubject, subject, subjects }) {
  return (
    <div className=" flex w-full my-auto justify-evenly">
      <p className="w-fit px-4 text-xl my-auto text-gray-900 pt-[0.17rem]">
        {`Subject:`}
      </p>
      <Select
        variant="outlined"
        name="subjects"
        className="my-2 w-full"
        value={subject}
        onChange={(e) => {
          setSubject(e.target.value);
        }}
      >
        {subjects.map((p, i) => {
          return (
            <MenuItem key={i} value={p}>
              {p}
            </MenuItem>
          );
        })}
      </Select>

      
    </div>
  );
}
