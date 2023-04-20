import { MenuItem, Select, Typography } from "@mui/material";
import React from "react";

export default function ChangeSubject({ setSubject, subject, subjects }) {
  return (
    <div className=" flex w-full my-auto justify-evenly">
      <Typography variant="h5" className="w-2/4 my-auto text-gray-900 pt-[1.1rem]">
        {`Subject:`}
     </Typography>
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
