import React from "react";
import SingleQuestion from "../../../../components/SingleQuestion";
import { clientPreviousYear } from "../../../../lib/sanityConnect";

export default function Exam({ data }) {
  if (!data) {
    return <div>Not found</div>
  }
  return (
    <main className="flex mx-auto sm:11/12 flex-col px-2 py-2">
      <p className="mx-auto text-lg">{data.paper.toUpperCase()}</p>
      {data.questions ? data.questions.map((i, index) => {
        return (
          <SingleQuestion
            key={index}
            question={i.question}
            details={i.details}
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

export async function getStaticProps(context) {

  const data = await clientPreviousYear.fetch(`*[_type=="exams" && slug.current=="${context.params.papername}"]{paper,questions}[0]`);

  return {
    props: {
      data: data
    },
    revalidate: 60,
  };
}


export async function getStaticPaths() {

  const pathsdata = await clientPreviousYear.fetch(`*[_type=="exams"]{slug}`)
  const path = pathsdata.map((item) => {
    return { params: { papername: item.slug.current } }
  })

  console.log(path[0].params)
// [{ params: { papername: 'drdo-electrical-2001' } },{ params: { papername: 'ssc-je-electrical-2021' } },{ params: { papername: 'uppcl-tg33' } }]
  return {
    paths: path,
    fallback: "blocking",
  }
}
