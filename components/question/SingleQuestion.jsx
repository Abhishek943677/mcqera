import React, { useEffect, useState } from "react";
import OptionButton from "./OptionButton";
import FavoriteBorderSharpIcon from "@mui/icons-material/FavoriteBorderSharp";
import ReportGmailerrorredSharpIcon from "@mui/icons-material/ReportGmailerrorredSharp";
import { Box, Button, Divider, Paper, Tooltip } from "@mui/material";
import PortableText from "react-portable-text";

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
    setShowDetails(false);
    const sorted = options.sort(() => Math.random() - 0.5);
    setOpt(sorted);
  }, [index, question, trueOpt]);

  // do stuffs links loader or white modal for each question
  if (opt.length === 0) {
    return (
      <>
        <br />
      </>
    );
  }

  return (
    <div
      elevation={4}
      id="wrapper"
      className="rounded-md make-com-dark my-2 px-2 py-3 shadow-xl"
    >
      <div className="flex">
        {/* index of question */}
        <p className="lg:text-base sm:textsm font-semibold text-red-700">{`${index}.`}</p>
        &nbsp;
        <p className="lg:text-sm sm:textsm flex">
          {/* question is displayed here */}
          <div id="question" dangerouslySetInnerHTML={{ __html: question }} />
        </p>
      </div>

      {/* option buttons here */}
      <OptionButton
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
      <OptionButton
        text={Object.values(opt[4])[0]}
        trueOpt={trueOpt}
        setShowDetails={setShowDetails}
      />

      {/* details  */}
      <div className="flex justify-between py-2 px-1">
        {/* side bar button */}
       
        {/* details button */}
        <Button
          variant="contained"
          size="small"
          className="p-2 cursor-pointer w-fit border border-blue-300"
          onClick={() => setShowDetails((p) => !p)}
        >
          Explanation
        </Button>

        <div className="flex">
          {/* <Tooltip title="save question">
            <p className="mx-4 cursor-pointer">
              <FavoriteBorderSharpIcon />
            </p>
          </Tooltip>

          <Tooltip title="report">
            <p className="cursor-pointer">
              <ReportGmailerrorredSharpIcon />
            </p>
          </Tooltip> */}
        </div>

      </div>

      {/* showing detials on button click or option click */}
      {showDetails ? (
        <div className="p-1 ">
          <section className="text-sm flex">
            {`Correct Answer is `}
            <span className="text-sm dark:text-green-300 text-green-500">
              {/* {`${trueOpt}`} */}
              <div
                id="question"
                className="ml-2 font-bold"
                dangerouslySetInnerHTML={{ __html: trueOpt }}
              />
            </span>
          </section>

          <Divider />

          {/* check if details not available */}
          {details && details.length > 0 && typeof details === "string" ? (
            <div
              id="question"
              dangerouslySetInnerHTML={{ __html: details }}
              className=" cursor-text sm:text-sm lg:text-sm flex flex-col justify-center"
            />
          ) : typeof details === "object" ? (
            <div id="question">
              <PortableText content={details} />
            </div>
          ) : (
            <span>Explantion not available</span>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
