import React, { useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import { clientMenu } from "../lib/sanityConnect";
import DownArrow from "./widgets/DownArrow";

// Custom fetcher for SWR
const fetcher = async () => {
  return await clientMenu.fetch(
    `*[_type=="exam"]{
      examname, 
      branch->{title}, 
      category[]->{title}
    }`
  );
};

const SideMenu = () => {
  const { data: examData = [], error } = useSWR("examData", fetcher, {
    revalidateOnFocus: false, // Do not revalidate on focus
    dedupingInterval: 1800000, // Cache data for 30 minutes
    refreshInterval: 0, // Disable auto-refresh
  });

  const [openCategory, setOpenCategory] = useState(null); // Track open category

  if (error) return <div>Error loading exam data</div>;
  if (!examData.length) return <div>Loading...</div>;

  // Group exams by category
  const groupedExams = examData.reduce((acc, exam) => {
    console.log(exam);
    exam.category.forEach((cat) => {
      const categoryTitle = cat.title;

      if (!acc[categoryTitle]) {
        acc[categoryTitle] = [];
      }
      acc[categoryTitle].push(exam);
    });
    return acc;
  }, {});

  const toggleCategory = (category) => {
    setOpenCategory(openCategory === category ? null : category); // Toggle open category
  };

  return (
    <div className="">
      {Object.keys(groupedExams).map((category, index) => (
        <div key={index} className="mb-2 border border-gray-300 rounded-lg">
          <h2
            className="mb-1 cursor-pointer p-2 rounded-t-lg"
            onClick={() => toggleCategory(category)} // Handle click
          >
            <span className="flex flex-row">
              {category.toUpperCase()} <DownArrow />{" "}
              {/* Display the category title */}
            </span>
          </h2>
          {openCategory === category && ( // Render exams only if the category is open
            <div className="ml-4 rounded-b-lg">
              {groupedExams[category].map((exam, examIndex) => (
                <Link
                  key={examIndex}
                  href={`/exam/${exam.branch.title}/${exam.examname}`}
                >
                  <p className="block text-blue-400 hover:underline mb-1 w-40">
                    {exam.examname.toUpperCase()}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SideMenu;

// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import { titleCase } from "../usefulFun/titleCase";
// import { clientMenu } from "../lib/sanityConnect";

// const SideMenu = () => {
//   const [examData, setExamData] = useState([]);
//   const [openCategory, setOpenCategory] = useState(null); // Track open category

//   useEffect(() => {
//     const fetchData = async () => {
//       const rawExamData = await clientMenu.fetch(
//         `*[_type=="exam"]{
//           examname,
//           branch->{title},
//           category[]->{title}
//         }`
//       );

//       // Set exam data
//       setExamData(rawExamData);
//     };

//     fetchData();
//   }, []);

//   // Group exams by category
//   const groupedExams = examData.reduce((acc, exam) => {
//     exam.category.forEach((cat) => {
//       const categoryTitle = cat.title;

//       if (!acc[categoryTitle]) {
//         acc[categoryTitle] = [];
//       }
//       acc[categoryTitle].push(exam);
//     });
//     return acc;
//   }, {});

//   const toggleCategory = (category) => {
//     setOpenCategory(openCategory === category ? null : category); // Toggle open category
//   };

//   return (
//     <div className=" bg-gray-100 w-full h-full">
//       {Object.keys(groupedExams).map((category, index) => (
//         <div key={index} className="mb-2 border border-gray-300 rounded-lg">
//           <h2
//             className="text-lg font-semibold text-gray-800 mb-2 cursor-pointer bg-gray-200 p-2 rounded-t-lg"
//             onClick={() => toggleCategory(category)} // Handle click
//           >
//             {category.toUpperCase()} {/* Display the category title */}
//           </h2>
//           {openCategory === category && ( // Render exams only if the category is open
//             <div className="ml-4 p-2 rounded-b-lg">
//               {groupedExams[category].map((exam, examIndex) => (
//                 <Link
//                   key={examIndex}
//                   href={`/exam/${exam.branch.title}/${exam.examname.replaceAll(" ", "-")}`}
//                 >
//                   <p className="block text-blue-600 hover:underline mb-1">
//                     {exam.examname.replaceAll("-", " ").toUpperCase()}
//                   </p>
//                 </Link>
//               ))}
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default SideMenu;
