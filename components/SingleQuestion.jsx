import React, { useEffect, useState } from "react";
import OptionButton from "./OptionButton";
import SimpleDialogDemo from "./SimpleDialog";
import { Box, Paper } from "@mui/material";

export default function SingleQuestion({ question, options,trueOpt, details,index }) {
  const [opt, setOpt] = useState([]);
  const [showDetails,setShowdetails]=useState(false)
  
  useEffect(() => {
    const sorted = options.sort(() => Math.random() - 0.5)
    setOpt(sorted);
  }, []);

  // do stuffs links loader or white modal for each question
  if(opt.length===0){
    return <>
    hey its waiting
    <br/>
    </>
}
  return (

    <div elevation={4} id="wrapper" className="my-3 rounded-md make-com-dark m-2 p-4 shadow-xl">
      <p>{index}. {question}</p>

      <OptionButton setShowdetails={setShowdetails} text={Object.values(opt[0])[0]} trueOpt={trueOpt} />
       <OptionButton setShowdetails={setShowdetails} text={Object.values(opt[1])[0]} trueOpt={trueOpt} />
       <OptionButton setShowdetails={setShowdetails} text={Object.values(opt[2])[0]} trueOpt={trueOpt} />
      <OptionButton setShowdetails={setShowdetails} text={Object.values(opt[3])[0]} trueOpt={trueOpt} />

      {!showDetails ? "" : 
      <SimpleDialogDemo details={details} />
    }
    </div>
  );
}
