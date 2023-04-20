import React, { useEffect, useState } from "react";
import OptionButton from "./OptionButton";
import FavoriteBorderSharpIcon from "@mui/icons-material/FavoriteBorderSharp";
import ReportGmailerrorredSharpIcon from "@mui/icons-material/ReportGmailerrorredSharp";
import { Box, Button, Paper, Tooltip } from "@mui/material";

export default function SingleQuestion({
  question,
  options,
  trueOpt,
  details,
  index,
}) {
  const [opt, setOpt] = useState([]);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const sorted = options.sort(() => Math.random() - 0.5);
    setOpt(sorted);
  }, []);

  // do stuffs links loader or white modal for each question
  if (opt.length === 0) {
    return (
      <>
        hey its waiting
        <br />
      </>
    );
  }

  return (
    <div
      elevation={4}
      id="wrapper"
      className="my-3 rounded-md make-com-dark m-2 p-4 shadow-xl"
    >
      <div className="flex">
      <p>
      {`${index}.`} 
      </p>
      &nbsp;
      <p>
      {question}

      </p>
      </div>

      <OptionButton
      className="bg-red-400"
        text={Object.values(opt[0])[0]}
        trueOpt={trueOpt}
        setShowDetails={setShowDetails}
      />
      <OptionButton
        text={Object.values(opt[1])[0]}
        trueOpt={trueOpt}
        setShowDetails={setShowDetails}
      />
      <OptionButton
        text={Object.values(opt[2])[0]}
        trueOpt={trueOpt}
        setShowDetails={setShowDetails}
      />
      <OptionButton
        text={Object.values(opt[3])[0]}
        trueOpt={trueOpt}
        setShowDetails={setShowDetails}
      />

      {/* <SimpleDialogDemo details={details} /> */}
      <div className="flex justify-between py-2 px-1">
        <Button
          variant="contained"
          size="small"
          className="p-2 cursor-pointer w-fit border border-blue-300"
          onClick={() => setShowDetails((p) => !p)}
        >
          details
        </Button>

        {/* side bar button */}
        <div className="flex">
          <Tooltip title="save question">
            <p className="mx-4 cursor-pointer">
              <FavoriteBorderSharpIcon />
            </p>
          </Tooltip>

          <Tooltip title="report">
            <p className="cursor-pointer">
              <ReportGmailerrorredSharpIcon />
            </p>
          </Tooltip>
        </div>
      </div>

      {/* showing detials on button click or option click */}
      {showDetails ? (
        <div className="p-1">
          <p className="text-sm">
            {`Correct Answer is `}
            <span className="text-lg dark:text-green-300 text-green-900 ">{`${trueOpt}`}</span>
          </p>
          {/* check if details not available */}
          {details.length > 0 ?
          <div
          dangerouslySetInnerHTML={{ __html: details }}
          className=" cursor-text"
          />
        :
          <span>Explantion not available</span>
        }
        </div>
      )
       : ""
      }
    </div>
  );
}
