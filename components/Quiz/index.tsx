import { useAuth } from "@/context/AuthContext";
import React, { useState } from "react";

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [quizId, setQuizId] = useState(0);

  const { email } = useAuth();

  const quizQuestionsStorage = JSON.parse(
    localStorage.getItem("quizQuestions") || "{}"
  );
  const quizNumber = Object.values(quizQuestionsStorage).length;
  const quizQuestions = quizQuestionsStorage[quizNumber] || [];
  if (!quizId && quizNumber) {
    setQuizId(quizNumber);
  }

  const storedData = JSON.parse(localStorage.getItem("quizResults") || "{}");
  const storedAnswers = storedData[quizId] || {};

  const handleOptionSelect = (option: any) => {
    setAnswers((prev) => {
      const newAnswers: any = [...prev];
      newAnswers[currentQuestionIndex] = option;
      return newAnswers;
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSubmit = () => {
    const results = {
      answers: answers,
      submittedAt: new Date().toISOString(),
    };

    if (!storedAnswers[email]) {
      storedAnswers[email] = results;
    }

    localStorage.setItem(
      "quizResults",
      JSON.stringify({ ...storedData, [quizId]: storedAnswers })
    );
    setAnswers([]);
    setCurrentQuestionIndex(0);
  };

  if (!quizQuestions.length) {
    return (
      <div className="mt-6 text-center p-4 max-w-lg mx-auto bg-white rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">No quizes found!</h2>
      </div>
    );
  }

  if (storedAnswers[email]) {
    return (
      <div className="mt-6 text-center p-4 max-w-lg mx-auto bg-white rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">
          You have already submitted the quiz!
        </h2>
        <p>Please come back later when Admin will add new quiz. Thank you!</p>
      </div>
    );
  }

  return (
    <div className="my-6 p-4 max-w-lg mx-auto bg-white rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">
        {quizQuestions[currentQuestionIndex].question}
      </h2>
      <div className="space-y-2">
        {quizQuestions[currentQuestionIndex].options.map(
          (
            option:
              | string
              | number
              | bigint
              | boolean
              | React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                >
              | Iterable<React.ReactNode>
              | React.ReactPortal
              | Promise<React.AwaitedReactNode>
              | null
              | undefined,
            index: React.Key | null | undefined
          ) => (
            <button
              key={index}
              className={`w-full text-left p-2 border rounded-md ${
                answers[currentQuestionIndex] === option
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100"
              } hover:bg-blue-200`}
              onClick={() => handleOptionSelect(option)}
            >
              {option}
            </button>
          )
        )}
      </div>
      <div className="mt-4">
        {currentQuestionIndex < quizQuestions.length - 1 ? (
          <button
            onClick={handleNext}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
