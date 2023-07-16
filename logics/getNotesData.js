import React from "react";
import { clientNotes } from "../lib/sanityConnect";

export default async function getNotesData() {
  const dataUnorganised = await clientNotes.fetch(
    `*[_type=="notes"]{category,slug,title}`
  );
  const sorted = dataUnorganised.sort(
    (a, b) => a.category.length - b.category.length
  );

  const gotArrayOfSession = sorted.map((i, index) => {
    return i.category;
  });

  const uniqueArrayOfSession = [...new Set(gotArrayOfSession)];
  var furnished = [];

  for (let i = 0; i < uniqueArrayOfSession.length; i++) {
    const category = uniqueArrayOfSession[i];
    const d = dataUnorganised.filter((i) => i.category === category);
    const sorted = d.sort((a, b) => b.title.length - a.title.length);
    furnished.push(sorted);
  }
  return furnished;
}
