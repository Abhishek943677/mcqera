import { TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'

export default function InputField({label,value,handleChange}) {

  return (
        <TextField
          type="text"
          variant="outlined"
          margin="normal"
          multiline="true"
          required="true"
          size="medium"
          color="secondary"
          className="p-2 w-full"
          
          label={label}
          value={value}
          onChange={handleChange}
        />
  )
}
