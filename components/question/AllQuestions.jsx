import React from "react";
import { useRouter } from "next/router";
import SingleQuestion from "./SingleQuestion";

export default function AllQuestions({ questions }) {
  const router = useRouter();

  return (
    // <div className="flex mx-auto lg:w-9/12 md:w-10/12 sm:11/12 flex-col lg:px-4 sm:px-1 py-2">
    <div className="flex mx-auto lg:w-full md:w-full sm:11/12 flex-col lg:px-1 sm:px-1 py-2">
      {questions
        ? JSON.parse(questions).map((i, index) => {
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
                  { falseOpt4: i.que.falseOpt4 },
                ]}
                index={index + 1 + (router.query.route[2] - 1) * 10}// change 10 for correct indexing
              />
            );
          })
        : ""}
    </div>
  );
}
