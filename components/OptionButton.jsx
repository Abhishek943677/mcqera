import React from 'react'

export default function OptionButton({text,trueOpt,setShowDetails}) {
  return (
    <div>
        <p 
        className='my-2 mx-1 px-3 py-2 cursor-pointer border border-gray-500 rounded-md '
        variant='text'
         onClick={(e)=>{
          setShowDetails(true)
            if(text===trueOpt){
              // console.log("true")
              e.target.classList.add('active')
            }
            else{
              // console.log("not true")
              e.target.classList.add('not-active')
  
            }
        }}>{text}</p>
    </div>
  )
}
