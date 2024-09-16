import React from "react";
import { clientNotes } from "../lib/sanityConnect";

export default async function getNotesData() {
  const dataUnorganised = await clientNotes.fetch(
    `*[_type=="notes"]{branch,slug,title , examname}`
  );
  // Step 1: Flatten the branch array into individual entries
  const flattened = dataUnorganised.flatMap((item) =>
    item.examname.map((examname) => ({
      branch: item.branch,
      examname: examname,
      title: item.title,
      slug: item.slug,
    }))
  );

  const sorted = flattened.sort(
    (a, b) => a.examname.length - b.examname.length
  );

  const gotArrayOfSession = sorted.map((i, index) => {
    return i.examname;
  });

  const uniqueArrayOfSession = [...new Set(gotArrayOfSession)];
  var furnished = [];

  for (let i = 0; i < uniqueArrayOfSession.length; i++) {
    const examname = uniqueArrayOfSession[i];
    const d = flattened.filter((i) => i.examname === examname);
    const sorted = d.sort((a, b) => b.title.length - a.title.length);
    furnished.push(sorted);
  }
  return furnished;
}
