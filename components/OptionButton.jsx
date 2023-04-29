import React, { useEffect } from "react";

export default function OptionButton({ text, trueOpt, setShowDetails }) {

  return (
    <div>
      <p
        className="my-2 mx-1 px-3 py-2 cursor-pointer border border-gray-500 rounded-md lg:text-lg sm:text-sm option " //option class is important
        variant="text"
        onClick={(e) => {
          setShowDetails(true);
          if (text === trueOpt) {
            // console.log("true")
            // e.target.classList.add('active')
            e.target.style.backgroundColor = "green";
          } else {
            // console.log("not true")
            e.target.style.backgroundColor = "red";
            // e.target.classList.add('not-active')
          }
        }}
      >
        {text}
      </p>
    </div>
  );
}
