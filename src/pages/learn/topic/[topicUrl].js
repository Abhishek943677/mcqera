import React from "react";
import { Paper } from "@mui/material";
import { mongoConnectLearn } from "../../../../lib/mongoConnectLearn";
import Link from "next/link";

const Route = ({ data, topicsInChapter, chapter }) => {
  // console.log(JSON.parse(data));

  return (
    <div>

      {/* --------seo stuffs------- */}


      {/* --------seo stuffs------- */}


      Chapter : {chapter}
      <br/>
      {JSON.parse(data).length !== 0 ? (
        JSON.parse(data).map((item, i) => {
          return (
            <Paper className="make-com-dark p-3 " key={i}>
              <h1 className="text-2xl text-center mb-3 mt-2">
                {item.topicName}
              </h1>

              {/* this is the section of blogpost */}
              <div
                className="blogpost"
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
            </Paper>
          );
        })
      ) : (
        <h1 className="text-2xl text-center">
          sorry , there is no data available at this url.
        </h1>
      )}

      <div className="make-com-dark my-2 p-3 flex flex-col rounded-md">
      <h1 className="text-2xl underline italic">More topics from {chapter} chapter</h1>
        {JSON.parse(topicsInChapter).map((item, index) => {
          return (
            <div key={index}>
              <Link href={item.url} className=" hover:opacity-50">{item.topicName}</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

//server side stuffs
// ----------------defining paths --------------
export async function getStaticPaths() {
  const db = await mongoConnectLearn();

  const collectionName = "topics";
  const collection = db.collection(collectionName); //accessing collection of trade

  const allTopics = await collection
    .find() // finding data from topics collection with subject name
    .project({ url: 1 })
    .toArray();

  const path = [];

  allTopics.map((item) => {
    const { url } = item;
    path.push({ params: { topicUrl: String(url) } });
  });

  // console.log(path);
  // console.log(path[3].params.route)

  return {
    paths: path,
    fallback: "blocking",
  };
}

// ---------defining props ----------
export async function getStaticProps(context) {
  const topicUrl = context.params.topicUrl;
  // console.log(topicUrl);

  const db = await mongoConnectLearn();
  const collectionName = "topics";
  const collection = db.collection(collectionName); //accessing collection of trade

  const topicData = await collection
    .find({ url: topicUrl }) // finding data from trade collection with subject name
    .project({ topicName: 1, content: 1, chapter: 1 })
    .toArray();

  const { chapter } = topicData[0];
  const topicsInChapter = await collection
    .find({ chapter })
    .project({ topicName: 1, url: 1 })
    .toArray();
  // console.log(topicsInChapter);
  return {
    props: {
      data: JSON.stringify(topicData),
      topicsInChapter: JSON.stringify(topicsInChapter),
      chapter,
      revalidate: 60,
    },
  };
}

export default Route;
