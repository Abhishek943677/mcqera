import React from "react";
import { mongoConnectLearn } from "../../../lib/mongoConnectLearn";
import { Paper } from "@mui/material";
import Link from "next/link";
import { NextSeo } from "next-seo";
import { getLearnData } from "../../../logics/getLearnData";

const Route = ({ data, course, subject }) => {
  // console.log(JSON.parse(data));

  return (
    <div>
      {/* seo */}
      <NextSeo
        title={`${course} | ${subject} | mcqera | Comprehensive Learning Resources`}
        description={`Access in-depth learning resources and tutorials on ${subject} subjects of ${course} course . Enhance your understanding and problem-solving abilities in this critical field of study.`}
        canonical={`https://mcqera.com/learn/${course}/${subject}`}
        additionalMetaTags={[
          {
            name: "keywords",
            content: `${course}, ${subject}, Educational content,E-learning,Learning resources,Education platform            `,
          },
        ]}
      />
      {/* seo */}

      <h1>Course : {course}</h1>
      <h1>Subject : {subject}</h1>
      {JSON.parse(data).length !== 0 ? (
        JSON.parse(data).map((element, i) => {
          return (
            <Paper className="make-com-dark p-3 my-1" key={i}>
              <h1 className="text-2xl text-center">{element[0].chapter.toUpperCase()}</h1>
              {element.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="p-1 hover:opacity-50 w-full cursor-pointer"
                  >
                    <Link href={`/learn/topic/${item.url}`} className="w-full">
                      <h1>{item.topicName}</h1>
                    </Link>
                  </div>
                );
              })}
            </Paper>
          );
        })
      ) : (
        <h1 className="text-2xl text-center">{`Topics were not uploaded for course: ${course} and Subject : ${subject} 
      till now..... Please try again later`}</h1>
      )}
    </div>
  );
};

//server side stuffs
// ----------------defining paths --------------
export async function getStaticPaths() {
  const lessonsObj = await getLearnData();

  const path = [];

  lessonsObj.map((item) => {
    const { course, subjectArray } = item;
    subjectArray.map((subject) => {
      path.push({
        params: { route: [String(course), String(subject.subject)] },
      });
    });
  });

  // console.log("end");
  // console.log(path);

  return {
    // paths: [{ params: { route: ['electrical','network'] } },{ params: { route: ['electrical','network'] } }],
    paths: path,
    fallback: "blocking",
  };
}

// -------- getting props -----------
export const getStaticProps = async (context) => {
  const course = context.params.route[0];
  const subject = context.params.route[1];

  const db = await mongoConnectLearn();
  const collectionName = "topics";
  const collection = db.collection(collectionName); //accessing collection of topics

  const dataUnorganised = await collection
    .find({ course, subject }) // finding data from trade collection with subject name
    .project({ chapter: 1, topicName: 1, url: 1 })
    .toArray();

  if (dataUnorganised.length === 0) {
    return {
      props: {
        data: JSON.stringify([]),
        course,
        subject,
      },
      revalidate: 1200,
    };
  }

  // organization fo data for best viewing
  const sorted = dataUnorganised.sort((a, b) => a.url.length - b.url.length);

  const gotArrayOfSession = sorted.map((i, index) => {
    return i.chapter;
  });

  const uniqueArrayOfSession = [...new Set(gotArrayOfSession)];
  var furnished = [];

  for (let i = 0; i < uniqueArrayOfSession.length; i++) {
    const chapter = uniqueArrayOfSession[i];
    const d = dataUnorganised.filter((i) => i.chapter === chapter);
    const sorted = d.sort((a, b) => b.url.length - a.url.length);
    furnished.push(sorted);
  }

  // console.log(dataUnorganised);
  // console.log(furnished)

  return {
    props: {
      data: JSON.stringify(furnished),
      course,
      subject,
    },
    revalidate: 1200,
  };
};

export default Route;
