import React from "react";
import Link from "next/link";

const SideMenu = () => {
  // Example usage
  const data = [
    {
      examname: "ssc-je-electrical",
      branch: "electrical",
      category: "Engineering",
    },
    {
      examname: "uppcl-je-electrical",
      branch: "electrical",
      category: "Engineering",
    },
    {
      examname: "uppcl-je-mechanical",
      branch: "mechanical",
      category: "Engineering",
    },
    {
      examname: "ssc-je-mechanical",
      branch: "mechanical",
      category: "Engineering",
    },
    
  ];

  // Group the data by category
  const groupedData = data.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="p-4 bg-gray-100 w-full h-full">
      {Object.keys(groupedData).map((category) => (
        <div key={category} className="mb-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            {category}
          </h2>
          {groupedData[category].map((exam, index) => (
            <div key={index} className="ml-4">
              <h3 className="text-md font-medium text-gray-600 mb-1">
                {exam.branch}
              </h3>
              <Link href={`/${exam.branch}/${exam.examname}`}>
                <p className="block text-blue-600 hover:underline mb-1">
                  {exam.examname}
                </p>
              </Link>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
export default SideMenu;
