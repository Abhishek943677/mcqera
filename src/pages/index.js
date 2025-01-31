import React from "react";
import { useEffect } from "react";
import Intro from "../../components/home/intro";
import Services from "../../components/home/Services";
import Features from "../../components/home/Features";
import WhyPrepareWithUs from "../../components/home/WhyPrepareWithUs";
import Menu from "../../components/home/Menu";
import Banner from "../../components/home/Banner";
import { NextSeo } from "next-seo";

export default function Home() {
  return (
    <main className="-m-1">
      {/* seo */}
      <NextSeo
        title={`Home | Mcqera : One-Stop Solution for Govt Exam Preparation | PYQs, Notes & Mock Tests`}
        description={`Mcqera offers a comprehensive platform for government exam preparation with previous year questions (PYQs), detailed handwritten notes, quizzes, and mock tests. Explore high-quality learning resources for SSC, UPSC, Banking, Railways, and more. Start your journey to success with expertly curated study materials and exam tips`}
        canonical={`https://mcqera.in/`}
        additionalMetaTags={[
          {
            name: "keywords",
            content:
              "government exams, SSC, UPSC, banking exams, railways exams, PYQs, previous year questions, exam preparation, handwritten notes, mock tests, quizzes, online learning, competitive exams, study materials, high-quality resources, govt exam syllabus, free learning resources, govt job preparation, MCQEra",
          },
        ]}
      />

      {/*  seo*/}
      <Banner />
      <Menu />
      <Services />
      <Features />
      <WhyPrepareWithUs />
    </main>
  );
}
