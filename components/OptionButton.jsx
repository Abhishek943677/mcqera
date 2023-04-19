import { Button } from '@mui/material'
import React from 'react'

export default function OptionButton({setShowdetails,text,trueOpt}) {
  return (
    <div>
        <p 
        className='m-2 px-3 py-2 cursor-pointer border border-gray-500 rounded-md '
        variant='text'
         onClick={(e)=>{
            setShowdetails(true)
            if(text===trueOpt){
              // console.log("true")
              e.target.classList.add('active')
            }else{
              // console.log("not true")
              e.target.classList.add('not-active')
  
            }
        }}>{text}</p>
    </div>
  )
}
