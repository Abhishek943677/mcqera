import React from "react";
import { clientPreviousYear } from "../../../../lib/sanityConnect";
import { NextSeo } from "next-seo";
import SingleQuestion from "../../../../components/question/SingleQuestion";
import PortableText from "react-portable-text";

export default function Exam({ data }) {
  console.log(data);

  if (!data) {
    return <div>Not found</div>;
  }
  return (
    <main className="flex mx-auto sm:11/12 flex-col px-1 py-2">
      {/* seo */}
      <NextSeo 
      title={`${data.paper} question paper with solution | mcqera`} 
      description={`Access a comprehensive collection of previous year question papers of ${data.paper} with solutions . Enhance your exam preparation with solved question papers and improve your understanding of exam patterns and question types.`}
      canonical={`https://mcqera.com/previos-year/paper/${data.paper}`}
      />

      {/*  seo*/}

      <h1 className="mx-auto text-lg">{data.paper.toUpperCase()}</h1>

      {/* details about the exam */}
      <div className="blogpost my-3" >
      {data.details && <PortableText content={data.details} />}
      </div>

      {data.questions ? (
        data.questions.map((i, index) => {
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
        })
      ) : (
        <div className="text-lg my-5 mx-auto">Questions are not uploaded</div>
      )}
    </main>
  );
}

export async function getStaticProps(context) {
  const data = await clientPreviousYear.fetch(
    `*[_type=="exams" && slug.current=="${context.params.papername}"]{paper,questions,details}[0]`
  );

  return {
    props: {
      data: data,
    },
    revalidate: 1200,
  };
}

export async function getStaticPaths() {
  const pathsdata = await clientPreviousYear.fetch(`*[_type=="exams"]{slug}`);
  const path = pathsdata.map((item) => {
    return { params: { papername: item.slug.current } };
  });

  // console.log(path[0].params);
  // [{ params: { papername: 'drdo-electrical-2001' } },{ params: { papername: 'ssc-je-electrical-2021' } },{ params: { papername: 'uppcl-tg33' } }]
  return {
    paths: path,
    fallback: "blocking",
  };
}
