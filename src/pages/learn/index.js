import React, { useState } from "react";
import { mongoConnectLearn } from "../../../lib/mongoConnectLearn";
import Link from "next/link";

const Home = ({ lessonsObj }) => {
  // console.log(JSON.parse(lessonsObj));

  return (
    <div>
      {JSON.parse(lessonsObj).map((item,index) => {
        return (
          <div className="p-2 rounded-md my-3 make-com-dark" key={index}>
            <p className="text-center text-2xl py-1">{item.course}</p>
            <div>
              {item.subjectArray.map((subject,index) => {
                return (
                  <div className="mb-1 hover:opacity-50 cursor-pointer" key={index}>
                    <Link href={`learn/${item.course}/${subject.subject}`} className="w-full">
                      {subject.subject}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

//server side things
export const getStaticProps = async () => {
  const db = await mongoConnectLearn();
  const collection = db.collection("learnObj"); //accessing collection of trade

  const data = await collection
    .find() // finding data from trade collection with subject name
    .toArray();

  return {
    props: {
      lessonsObj: JSON.stringify(data),
      revalidate: 60,
    },
  };
};

export default Home;
