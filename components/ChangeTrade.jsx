import { MenuItem, Select } from '@mui/material';
import React from 'react'

export default function ChangeTrade({trade,courses,setSubject,setSubjects,setTrade}) {
  return (
        <Select
        name="trade"
        className="my-2 w-full"
        value={trade}
        onChange={(e) => {
          setTrade(e.target.value);
          const getSubjects = courses.filter((p) => p.trade === e.target.value);
          setSubjects(getSubjects[0].subjects);
          setSubject(getSubjects[0].subjects[0])
        }}
      >
        {courses.map((p, i) => {
          return <MenuItem key={i} value={p.trade}>{p.trade}</MenuItem>;
        })}
      </Select>
  )
}
