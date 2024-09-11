import React from "react";

export default function Index() {
  const config = [
    {
      title: "Easy to Use",
      description:
        "Our platform is designed with user experience in mind. Intuitive navigation and a clean interface ensure that you can focus on what truly matters—your preparation. Whether you're a tech-savvy student or new to online learning, our easy-to-use system simplifies your study sessions.",
    },
    {
      title: "Save questions for later access",
      description:
        "We offer an extensive library of questions across various subjects and difficulty levels. Our diverse question bank is curated to challenge you and provide comprehensive practice. This variety helps you build a strong foundation and master topics with confidence.",
    },
    {
      title: "Wide Collection of Learning Materials",
      description:
        "Access a vast array of learning materials tailored to different learning styles. From interactive quizzes and practice exams to detailed study guides and reference articles, we provide everything you need to excel. Our resources are designed to cater to all learning preferences, ensuring a well-rounded study experience.",
    },
    {
      title: "Best Explanation",
      description:
        "Our platform provides clear, concise, and effective explanations for every question. We believe that understanding the 'why' behind each answer is crucial. Our expert-written explanations help you grasp complex concepts and apply them confidently in your exams.",
    },
    {
      title: "AI-Based Solutions",
      description:
        "Leverage the power of artificial intelligence with our AI-based solutions. Our intelligent algorithms analyze your performance, identify strengths and weaknesses, and tailor your practice sessions to meet your specific needs. This personalized approach maximizes your study efficiency and helps you achieve your goals faster.",
    },
    {
      title: "Practice with More Questions",
      description:
        "Maximize your study effectiveness by practicing with an even greater number of questions. Our platform continuously expands its question bank to include the latest trends and topics, ensuring you have access to a broad range of practice materials.",
    },
  ];

  return (
    <section id="features" className=" bg-gradient-to-b from-slate-800  to-slate-950 text-white py-16 mx-[-0px]" data-aos="fade-down" data-aos-duration='300'>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold sm:text-4xl mb-4" data-aos="fade-up" data-aos-duration='300'>
            Features of our platform
          </h2>
          <div class="w-[80%] mx-auto h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

          <p className="mt-4 text-gray-300">
            Discover the unique features that set our platform apart and make your learning experience exceptional. From user-friendly design to cutting-edge AI solutions, we provide everything you need to excel.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {config.map((item, index) => (
            <div
            data-aos="flip-left"
             data-aos-duration="700"
              key={index}
              className=" bg-gradient-to-r from-blue-950 to bg-slate-950 p-6 rounded-lg shadow-lg hover:opacity-80 transition duration-300 ease-in-out"
              // className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300 ease-in-out"
            >
              <div className="flex items-start gap-4 mb-4">
                <span className="flex-shrink-0 rounded-full bg-gray-700 p-4">
                  <svg
                    className="h-6 w-6 text-violet-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                    ></path>
                  </svg>
                </span>

                <div className=" cursor-default">
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="mt-2 text-gray-300">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


// import React from "react";

// export default function Index() {
//   const config = [
//     {
//       title: "Easy to Use",
//       description:
//         "Our platform is designed with user experience in mind. Intuitive navigation and a clean interface ensure that you can focus on what truly matters—your preparation. Whether you're a tech-savvy student or new to online learning, our easy-to-use system simplifies your study sessions.",
//     },
//     {
//       title: "Wide Collection of Questions",
//       description:
//         "We offer an extensive library of questions across various subjects and difficulty levels. Our diverse question bank is curated to challenge you and provide comprehensive practice. This variety helps you build a strong foundation and master topics with confidence.",
//     },
//     {
//       title: "Wide Collection of Learning Materials",
//       description:
//         "Access a vast array of learning materials tailored to different learning styles. From interactive quizzes and practice exams to detailed study guides and reference articles, we provide everything you need to excel. Our resources are designed to cater to all learning preferences, ensuring a well-rounded study experience.",
//     },
//     {
//       title: "Best Explanation",
//       description:
//         "Our platform provides clear, concise, and effective explanations for every question. We believe that understanding the 'why' behind each answer is crucial. Our expert-written explanations help you grasp complex concepts and apply them confidently in your exams.",
//     },
//     {
//       title: "AI-Based Solutions",
//       description:
//         "Leverage the power of artificial intelligence with our AI-based solutions. Our intelligent algorithms analyze your performance, identify strengths and weaknesses, and tailor your practice sessions to meet your specific needs. This personalized approach maximizes your study efficiency and helps you achieve your goals faster.",
//     },
//     {
//       title: "Practice with More Questions",
//       description:
//         "Maximize your study effectiveness by practicing with an even greater number of questions. Our platform continuously expands its question bank to include the latest trends and topics, ensuring you have access to a broad range of practice materials.",
//     },
//   ];

//   return (
//     <section className="bg-gray-900 text-white py-16 cursor-default mx-[-5px]">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl font-extrabold sm:text-4xl">
//             What Makes Us Special
//           </h2>
//           <p className="mt-4 text-gray-300">
//             Discover the unique features that set our platform apart and make your learning experience exceptional. From user-friendly design to cutting-edge AI solutions, we provide everything you need to excel.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
//           {config.map((item, index) => (
//             <div
//               key={index}
//               className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300 ease-in-out"
//             >
//               <div className="flex items-start gap-4 mb-4">
//                 <span className="flex-shrink-0 rounded-full bg-gray-700 p-4">
//                   <svg
//                     className="h-6 w-6 text-blue-500"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
//                     <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
//                     ></path>
//                   </svg>
//                 </span>

//                 <div>
//                   <h3 className="text-xl font-semibold">{item.title}</h3>
//                   <p className="mt-2 text-gray-300">{item.description}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
