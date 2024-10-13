import React, { useEffect, useState } from "react";

export default function OptionButton({ text, trueOpt, setShowDetails }) {
  console.log(text)
const [trueHai,setTrueHai]=useState(null)
const [falseHai,setFalseeHai]=useState(null)

  useEffect(() => {
    setFalseeHai(null)
    setTrueHai(null)
  }, [text])

// logic to hide the option unwanted data is here
const unwantedOption = [
  "",
  "<p>None</p>",
  "<br/>",
  "None",
  "<p><br></p>",
  "<p></p>",
  undefined, 
  null
];

  return (
    // if any bad or unwanted option came then eliminate this
    <div className={`${unwantedOption.includes(text) ? "hidden" : ""}`}>
      <div
        className={`my-2 mx-1 px-3 py-2 cursor-pointer border border-gray-500 rounded-md lg:text-sm sm:text-sm option ${trueHai ?"bg-green-400" :""} ${falseHai ?"bg-red-400" :""} `} //option class is important
        variant="text"
        onClick={(e) => {
          if (text === trueOpt) {
            setShowDetails(true);
            setTrueHai(true)
            
          } else {
            setFalseeHai(true)
          }
        }}
      >
        <div id="question" dangerouslySetInnerHTML={{__html:text}}/>
      </div>
    </div>
  );
}
