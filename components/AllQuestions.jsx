import axios from "axios";
import React, { useEffect, useState } from "react";
import SingleQuestion from "./SingleQuestion";
import { useRouter } from "next/router";

export default function AllQuestions({ questions }) {
  const router = useRouter();
  // console.log(question)

  return (
    <div className="flex mx-auto lg:w-9/12 md:w-10/12 sm:11/12 flex-col lg:px-4 sm:px-1 py-2">
      {questions
        ? JSON.parse(questions).map((i, index) => {
          // console.log(i)
            return (
              <SingleQuestion
                key={index}
                question={i.que.question}
                details={i.que.detail}
                trueOpt={i.que.trueOpt}
                options={[
                  { trueOpt: i.que.trueOpt },
                  { falseOpt1: i.que.falseOpt1 },
                  { falseOpt2: i.que.falseOpt2 },
                  { falseOpt3: i.que.falseOpt3 },
                ]}
                index={index + 1 + (router.query.route[2] - 1) * 10}
              />
            );
          })
        : ""}
    </div>
  );
}
