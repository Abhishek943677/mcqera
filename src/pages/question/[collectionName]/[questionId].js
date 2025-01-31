
// pages/[collectionName]/[questionId].js
import { ObjectId } from "mongodb";
import SingleQuestion from "../../../../components/question/SingleQuestion";
import { mongoConnect } from "../../../../lib/mongoConnect";
import { NextSeo } from "next-seo";
import sanitizeHtml from "sanitize-html";
import { Card } from "@mui/material";
import Link from "next/link";
import { clientMenu } from "../../../../lib/sanityConnect";
import QuizList from "../../../../components/exam/QuizList";

const QuestionPage = ({ questionData, quizData, collectionName }) => {
  console.log(quizData);
  const question = JSON.parse(questionData);
  const {
    question: questionText,
    trueOpt,
    falseOpt1,
    falseOpt2,
    falseOpt3,
    falseOpt4,
    detail,
  } = question.que;

  // Clean HTML for SEO description
  const cleanQuestion = sanitizeHtml(questionText, {
    allowedTags: [], // Remove all tags
    allowedAttributes: {},
  });

  const cleanDetails = sanitizeHtml(detail, {
    allowedTags: [], // Remove all tags
    allowedAttributes: {},
  });

  // Sanitize options for SEO
  const cleanTrueOpt = sanitizeHtml(trueOpt, {
    allowedTags: [], // Remove all tags
    allowedAttributes: {},
  });

  //   const cleanFalseOpts = [
  //     sanitizeHtml(falseOpt1, { allowedTags: [], allowedAttributes: {} }),
  //     sanitizeHtml(falseOpt2, { allowedTags: [], allowedAttributes: {} }),
  //     sanitizeHtml(falseOpt3, { allowedTags: [], allowedAttributes: {} }),
  //     sanitizeHtml(falseOpt4, { allowedTags: [], allowedAttributes: {} }),
  //   ];

  return (
    <>
      <NextSeo
        title={`Question: ${cleanQuestion}`} // Use cleaned question text for SEO
        description={`Question: ${cleanQuestion}. Correct Answer: ${cleanTrueOpt}. Details: ${cleanDetails}`} // Cleaned description
        canonical={`https://mcqera.in/question/${questionData._id}`}
        additionalMetaTags={[
          {
            name: "keywords",
            content:
              "MCQ, multiple choice questions, question bank, exam preparation, quiz, study materials, education, learning resources, handwritten notes",
          },
        ]}
      />

      <div className="container mx-auto my-4 p-4">
        <SingleQuestion
          question={questionText} // Display the question with HTML as is
          options={[
            { trueOpt: trueOpt }, // Pass original HTML
            { falseOpt1: falseOpt1 }, // Pass original HTML
            { falseOpt2: falseOpt2 }, // Pass original HTML
            { falseOpt3: falseOpt3 }, // Pass original HTML
            { falseOpt4: falseOpt4 }, // Pass original HTML
          ]}
          trueOpt={trueOpt} // Pass original HTML
          details={detail} // Pass original HTML directly for rendering
          index={1} // Adjust index logic as needed
        />
      </div>

      {/* Recommendation Section */}
      <h2 className="text-2xl font-bold bg-clip-text text-transparent mx-1 tracking-wide drop-shadow-lg animate-pulse bg-gradient-to-r from-[#ec7b6e] to-[#f5af19]">
        Explore other questions in {collectionName}
      </h2>
      {JSON.parse(quizData).length > 0 ? (
        <QuizList quizData={JSON.parse(quizData)} />
      ) : (
        <div>No data</div>
      )}
    </>
  );
};

// Fetching question data on the server-side
export async function getServerSideProps(context) {
  const { collectionName, questionId } = context.params;

  // Connect to MongoDB
  const db = await mongoConnect();

  // Fetch the question from the specified collection
  const questionData = await db
    .collection(collectionName)
    .findOne(
      { _id: new ObjectId(questionId) },
      { projection: { que: 1, trade: 1, subject: 1 } }
    );

  // this is recomendation according to collection name based on clientmenu

  const rawQuizData = await clientMenu.fetch(
    `*[_type=="branch" && title=="${collectionName}" ]{title , subjects[]->{name}}`
  );
  const quizData = rawQuizData.map((item, index) => {
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

  return {
    props: {
      questionData: JSON.stringify(questionData),
      quizData: JSON.stringify(quizData),
      collectionName,
    },
  };
}

export default QuestionPage;
