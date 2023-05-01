import React from "react";
import SingleQuestion from "../../../components/SingleQuestion";
import { clientPreviousYear } from "../../../lib/sanityConnect";

export default function Exam({ data }) {
  console.log(data)
  if(!data){
    return <div>Not found</div>
  }
    return (
      <main className="flex mx-auto lg:w-9/12 md:w-10/12 sm:11/12 flex-col px-4 py-2">
      <p className="mx-auto text-lg">{data.paper.toUpperCase()}</p>
        {data.questions ? data.questions.map((i, index) => {
          return (
            <SingleQuestion
              key={index}
              question={i.question}
              details=""
              trueOpt={i.sahianswer}
              options={[
                { trueOpt: i.sahianswer },
                { falseOpt1: i.galat1 },
                { falseOpt2: i.galat2 },
                { falseOpt3: i.galat3 },
              ]}
              index={index + 1}
            />
          );
        }) : <div className="text-lg my-5 mx-auto">Questions are not uploaded</div>}
      </main>
    );
}

export async function getServerSideProps(context) {

  const data = await clientPreviousYear.fetch(`*[_type=="exams" && slug.current=="${context.params.papername}"]{paper,questions}[0]`);

  // console.log(data)
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=200, stale-while-revalidate=500"
  );
  return {
    props: {
      data:data
    },
  };
}
