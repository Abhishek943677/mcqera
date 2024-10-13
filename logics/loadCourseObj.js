import { clientMenu } from "../lib/sanityConnect";

// Function to transform the array
const transformArray = (arr) => {
  return arr.map((item, index) => {
    // Define a new _id starting from 2 (to match the output format)
    const _id = index + 1;

    // Map over the subjects to convert them into an array of strings
    const subjects = item.subjects.map((subject) => subject.name);

    // Return the new object with _id, trade (from title), and subjects
    return {
      _id: _id,
      trade: item.title, // use 'title' as 'trade'
      subjects: subjects,
    };
  });
};


export async function loadCourseObj() {
  const dataUnorganised = await clientMenu.fetch(
    `*[_type=="branch"]{title , subjects[]->{name}}`
  );

  const courseObj = transformArray(dataUnorganised);
  return courseObj ;
}

