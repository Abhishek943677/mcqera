import React, { useEffect, useState } from "react";

export default function OptionButton({ text, trueOpt, setShowDetails }) {
const [trueHai,setTrueHai]=useState(null)
const [falseHai,setFalseeHai]=useState(null)

  useEffect(() => {
    setFalseeHai(null)
    setTrueHai(null)
  }, [text])

  return (
    <div>
      <div
        className={`my-2 mx-1 px-3 py-2 cursor-pointer border border-gray-500 rounded-md lg:text-sm sm:text-sm option ${trueHai ?"bg-green-400" :""} ${falseHai ?"bg-red-400" :""} `} //option class is important
        variant="text"
        onClick={(e) => {
          if (text === trueOpt) {
            setShowDetails(true);
            setTrueHai(true)
            // e.target.style.backgroundColor = "green";
            // console.log(this)
          } else {
            setFalseeHai(true)
            // e.target.style.backgroundColor = "red";
            // console.log(e.target)
          }
        }}
      >
        <div id="question" dangerouslySetInnerHTML={{__html:text}}/>
      </div>
    </div>
  );
}
