import { MenuItem, Select } from '@mui/material';
import React from 'react'

export default function ChangeSubject({setSubject,subject,subjects}) {
  return (
        <Select
        name="subjects"
        className="my-2 w-full"
        value={subject}
        onChange={(e) => {
          setSubject(e.target.value);
        }}
      >
        {subjects.map((p, i) => {
          return <MenuItem key={i} value={p}>{p}</MenuItem>;
        })}
      </Select>
  )
}
