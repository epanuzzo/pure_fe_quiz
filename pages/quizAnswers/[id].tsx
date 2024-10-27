"use client";

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

interface Question {
  question: string;
  options: string[];
  answer: string;
}

interface UserAnswer {
  [email: string]: {
    answers: string[];
    submittedAt: string;
  };
}

interface QuizResultProps {
  quizId: string;
  userEmail: string;
}

const QuizResult: React.FC<QuizResultProps> = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<UserAnswer>({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const storedQuestions = JSON.parse(
      localStorage.getItem("quizQuestions") || "{}"
    );
    const storedResults = JSON.parse(
      localStorage.getItem("quizResults") || "{}"
    );
    setQuestions(storedQuestions[parseInt(id as string)] || []);
    setUserAnswers(storedResults[parseInt(id as string)] || []);
  }, [id]);

  console.log("userAnswers", userAnswers);

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6">Quiz Results</h2>

      {questions.length === 0 ? (
        <p className="text-gray-600">No questions available.</p>
      ) : (
        <ul className="space-y-6">
          {questions.map((question, index) => {
            return (
              <li key={index} className="p-4 border rounded-md shadow-sm">
                <h3 className="font-semibold text-lg mb-2">
                  {index + 1}. {question.question}
                </h3>
                <ul className="list-disc pl-6 space-y-1">
                  {question.options.map((option, optIndex) => (
                    <li
                      key={optIndex}
                      className={`${
                        option === question.answer
                          ? "text-green-600"
                          : "text-gray-700"
                      }`}
                    >
                      {option}
                      <span>
                        {Object.entries(userAnswers).map(([email, answer]) => (
                          <React.Fragment key={email}>
                            {answer.answers[index] === option && (
                              <span className="text-blue-500"> {email}, </span>
                            )}
                          </React.Fragment>
                        ))}
                      </span>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default QuizResult;
