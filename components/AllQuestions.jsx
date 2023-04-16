import axios from "axios";
import React, { useEffect, useState } from "react";
import SingleQuestion from "./SingleQuestion";
import { useRouter } from "next/router";

export default function AllQuestions({ questions }) {
  const router = useRouter();
  // console.log(question)

  return (
    <div className="flex mx-auto lg:w-7/12 md:w-10/12 sm:11/12 flex-col px-4 py-2">
      {questions
        ? questions.map((i, index) => {
            return (
              <SingleQuestion
                key={index}
                question={i.question}
                details={i.detail}
                trueOpt={i.trueOpt}
                options={[
                  { trueOpt: i.trueOpt },
                  { falseOpt1: i.falseOpt1 },
                  { falseOpt2: i.falseOpt2 },
                  { falseOpt3: i.falseOpt3 },
                ]}
                index={index + 1 + (router.query.route[2] - 1) * 10}
              />
            );
          })
        : ""}
    </div>
  );
}
