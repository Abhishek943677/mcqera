import React from "react";
import { clientQuickLinks } from "../../../lib/sanityConnect";
import { NextSeo } from "next-seo";
import SingleQuestion from "../../../components/question/SingleQuestion";

export default function Index({ questions, title, category }) {
  // console.log(category)
  // console.log(title)
  return (
    <div>
      {/* SEO... */}
      <NextSeo
        title={title}
        description={`Get top questions of ${category} of topic ${title} with answer and detailed solutions. Boost your exam preparation and test your knowledge with our comprehensive MCQ website. Access a vast collection of multiple-choice questions covering topic ${title}`}
        canonical={`https://mcqera.in/quicklinks/${category}/${title}`}
      />
      {/*...SEO  */}

      <h1 className="text-xl text-center mb-5">{title.toUpperCase()}</h1>

      {questions.length > 0 ? (
        JSON.parse(questions).map((i, index) => {
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
    </div>
  );
}

export async function getStaticPaths(context) {
  const path = [];
  const Pathsquery = `*[_type=="quicklinks"]{branch,slug}`;
  const pathsInitialData = await clientQuickLinks.fetch(Pathsquery);

  pathsInitialData.forEach(({ branch, slug }) => {
    branch.forEach((item, index)=>{
      path.push({ params: { route: [String(item), String(slug.current)] } });
    })
  });
  return {
    // paths: [{ params: { route: ['uppcl','network'] } }],
    paths: path,
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const category = context.params.route[0];
  const slug = context.params.route[1];
  const res = await clientQuickLinks.fetch(
    `*[_type=="quicklinks" && "${category}" in branch && slug.current=="${slug}"]{question,title}`
  );
  // const res = await clientQuickLinks.fetch(`*[_type=="quicklinks" && slug.current=="${slug}"]{question,title}`)
  console.log(res);

  if (!res[0].question) {
    return {
      props: {
        questions: [],
        title: res[0].title,
        category,
      },
      revalidate: 1200,
    };
  }

  const stringifiedRes = JSON.stringify(res[0].question);
  // console.log(stringifiedRes)

  return {
    props: {
      questions: stringifiedRes,
      title: res[0].title,
      category,
    },
    revalidate: 1200,
  };
}
