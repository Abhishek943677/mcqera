import React from "react";
import CardComponent from "./Card";

export default function Index() {
  const config = [
    {
      title: "Exam",
      description:
        "Boost your competitive exams preparation with us. Access Previous year Papers , Quizzes , Handwritten Notes  , Syllabus and Quicklinks",
      link: "/exam",
    },
    {
      title: "Quizzes",
      description:
        "Boost your competitive exams preparation with free MCQs. Practice mock tests with detailed explanations to success in the exam",
      link: "/quiz",
    },
    {
      title: "Previous Year Questions",
      description:
        "Access a wide collection of previous year MCQ papers for comprehensive exam preparation. Practice with real exam questions, test your knowledge, and enhance your exam readiness with these valuable resources.",
      link: "/previous-year",
    },
    {
      title: "Learn Topics",
      description:
        "Access a wide range of comprehensive learning resources and courses on various subjects. Enhance your knowledge and skills with high-quality educational content.",
      link: "/learn",
    },
    {
      title: "Notes",
      description:
        "Explore a wide collection of handwritten notes offering comprehensive study materials and resources. Access well-organized and visually appealing notes to enhance your learning experience.",
      link: "/notes",
    },
    {
      title: "Quicklinks",
      description:
        "Explore a comprehensive collection of quick links to multiple choice questions (MCQs) on various topics. Access a wide range of MCQs to test your knowledge. All questions are with detailed answers.",
      link: "/quicklinks",
    },
  ];

  return (
    <>
      <div
        data-aos="zoom-in-up"
        data-aos-duration="500"
        // className={`flex flex-col  px-0 !mx-[-5px] bg-slate-950 pt-20 rounded-t-[30%] pb-10`}
        className={`flex flex-col  px-0 mx-0 bg-gradient-to-b from-slate-950 to-slate-800 pt-20 rounded-t-[20rem] pb-10`}
        id="services"
      >
        <p
          className={` text-4xl mx-auto text-center font-extrabold mb-4`}
          data-aos="fade-up"
          data-aos-duration="300"
        >
          Services
        </p>
        <div class="w-[80%] mx-auto h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

        <div className="flex mx-auto px-4 flex-wrap justify-center space-x-4 ">
          {config.map((item, index) => (
            <CardComponent key={index} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}
