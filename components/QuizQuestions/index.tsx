"use client";

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

interface Question {
  question: string;
  options: string[];
  answer: string;
}

const QuestionsList: React.FC = () => {
  const [questions, setQuestions] = useState<any>([]);
  const router = useRouter();
  const handleNavigate = (quizId: number | string) => {
    router.push(`/quizAnswers/${quizId}`);
  };

  useEffect(() => {
    const storedQuestions = JSON.parse(
      localStorage.getItem("quizQuestions") || "{}"
    );
    setQuestions(storedQuestions);
  }, []);

  console.log("questions", questions);

  return (
    <div className="mb-6 p-6 max-w-2xl mx-auto bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6">Stored quizes</h2>

      {!Object.keys(questions).length ? (
        <p className="text-gray-600">No quizes available.</p>
      ) : (
        <ul className="space-y-6">
          {Object.keys(questions).map((quizId) => (
            <li
              key={quizId}
              onClick={() => handleNavigate(quizId)}
              className="p-4 border rounded-md shadow-sm cursor-pointer"
            >
              <h3 className="font-semibold text-lg">Quiz ID: {quizId}</h3>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuestionsList;
