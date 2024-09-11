import { clientPreviousYear } from "../lib/sanityConnect";

export default async function getPreviousYearData() {
  
  const result = await clientPreviousYear.fetch(`*[_type=="exams"]{branch,examname}`);
  // const result = await clientPreviousYear.fetch(`*[_type=="exams"]{branch,examname}`, { next: { revalidate: 600 } });//60*10 == 10min

  // const { result } = await fetch("https://ltxionfe.api.sanity.io/v1/data/query/production?query=*%5B_type%3D%3D%22exams%22%5D%7Bbranch%2Cexamname%7D",{ next: { revalidate: 6000 } })
  // .then((res) => res.json());


  // console.log(result);


  const sorted = result.sort((a, b) => a.branch.length - b.branch.length);
  // console.log(sorted);

  function removeDuplicates(books) {
    const jsonObject = books.map(JSON.stringify);

    const uniqueSet = [...new Set(jsonObject)];
    const uniqueArray = Array.from(uniqueSet).map(JSON.parse);

    return uniqueArray;
  }
  const uniqueArray = removeDuplicates(sorted);
  // console.table(uniqueArray);

  const gotArrayOfExamname = uniqueArray.map((i, index) => {
    return i.branch;
  });
  const uniqueArrayOfExamname = [...new Set(gotArrayOfExamname)];
  //   console.log(uniqueArrayOfExamname);

  var furnished = [];

  for (let i = 0; i < uniqueArrayOfExamname.length; i++) {
    const branch = uniqueArrayOfExamname[i];
    const d = uniqueArray.filter((i) => i.branch === branch);
    const sorted = d.sort((a, b) => b.examname.length - a.examname.length);
    furnished.push(sorted);
  }
  return furnished;
}
