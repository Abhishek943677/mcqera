import { clientQuickLinks } from "../lib/sanityConnect";

export default async function getQuickLinkData() {
  const quicklinksUnorganised = await clientQuickLinks.fetch(
    `*[_type=="quicklinks"]{branch,title,slug,examname}`
  );

  /// Step 1: Flatten the branch array into individual entries
  const flattened = quicklinksUnorganised.flatMap((item) =>
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
