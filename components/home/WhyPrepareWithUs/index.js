import React from "react";
import Card from "./Card";

export default function Index() {
  const config = [
    {
      image: "/svgAssets/aiImage.svg",
      title: "AI Based Platform",
      description:
        "Our AI analyzes your strengths and weaknesses, tailoring questions to your specific needs. This ensures that you focus on the areas that matter most, maximizing your study efficiency",
    },
    {
      image: "/svgAssets/train_brain.svg",
      title: "Up To Date",
      description:
        "With targeted practice, real-time analytics, and a deep understanding of your progress, you’ll enter your exam with the confidence that you’ve prepared in the best way possible.",
    },
    {
      image: "/svgAssets/booksBurden.png",
      title: "Easy Access",
      description:
        "With our user-friendly interface, you can access your practice sessions on any device, whether at home or on the go. Flexibility in your study schedule means you can prepare whenever it’s most convenient for you",
    },
    {
      image: "/svgAssets/stayfocused.svg",
      title: "Lesser Ads",
      description:
        "We prioritize your study experience by keeping our platform clean and clutter-free. Say goodbye to intrusive pop-ups and disruptive ads, so you can concentrate fully on your preparation.",
    },
    {
      image: "/svgAssets/mentors.svg",
      title: "Best Mentors Guide",
      description:
        "Our platform connects you with experienced mentors who provide personalized guidance. Whether you need help understanding a tricky concept or advice on exam strategies, our mentors are here to support you",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-slate-950 to-gray-500 text-white mx-auto w-full">
      <h2 className=" text-center text-4xl font-extrabold mb-4" data-aos="fade-up" data-aos-duration='300'>
        Why Prapare With Us?
      </h2>
      <div class="w-[60%] mx-auto h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

      <div className="mx-auto px-4  sm:px-6  lg:px-8">
        {config.map((item, index) => (
          <Card key={index} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}
