"use client";
import React, { useState } from "react";

interface Question {
  question: string;
  options: string[];
  answer: string;
}

const AdminForm: React.FC = () => {
  const [question, setQuestion] = useState("");
  const [quizId, setQuizId] = useState(0);
  const [options, setOptions] = useState(["", "", "", ""]);
  const [quizError, setQuizError] = useState("");
  const [correctOptionIndex, setCorrectOptionIndex] = useState<number | null>(
    null
  );
  const [quizQuestions, setQuizQuestions] = useState<{
    [id: number]: Question[];
  }>({});

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleAddQuestion = () => {
    if (
      question &&
      options.every((opt) => opt) &&
      correctOptionIndex !== null
    ) {
      setQuizError("");
      const answer = options[correctOptionIndex];
      const existingQuestions = JSON.parse(
        localStorage.getItem("quizQuestions") || "{}"
      );
      const id = Object.keys(existingQuestions).length + 1;
      if (!quizId) {
        setQuizId(id);
      }
      setQuizQuestions({
        ...existingQuestions,
        [id]: [...(quizQuestions[id] || []), { question, options, answer }],
      });

      setQuestion("");
      setOptions(["", "", "", ""]);
      setCorrectOptionIndex(null);
    } else {
      setQuizError(
        "Please fill in all fields and select the correct answer before adding a question."
      );
    }
  };

  const handleSubmitQuiz = () => {
    setQuizError("");
    console.log("quizQuestions", quizQuestions);
    localStorage.setItem("quizQuestions", JSON.stringify(quizQuestions));
    alert("Quiz saved successfully!");
    setQuizQuestions([]);
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Admin Quiz Form</h2>

      <div className="mb-4">
        <label className="block font-medium mb-1">Question:</label>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full border rounded p-2"
          placeholder="Enter question"
        />
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-end mb-2">
          <label className="block font-medium mb-1">Options:</label>
          <span className="ml-1 w-10">Correct Answer</span>
        </div>
        {options.map((option, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className="w-full border rounded p-2 mr-2"
              placeholder={`Option ${index + 1}`}
            />
            <input
              type="checkbox"
              checked={correctOptionIndex === index}
              onChange={() => setCorrectOptionIndex(index)}
              className="form-checkbox"
            />
          </div>
        ))}
      </div>

      {quizError && <p className="text-red-500 mb-4">{quizError}</p>}

      <button
        onClick={handleAddQuestion}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mb-4"
      >
        Add Question
      </button>

      <button
        onClick={handleSubmitQuiz}
        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
      >
        Save Quiz
      </button>

      {quizQuestions[quizId] && quizQuestions[quizId].length > 0 && (
        <div className="mt-4">
          <h3 className="font-bold">Current Questions:</h3>
          <ul className="list-disc list-inside">
            {quizQuestions[quizId].map((item, index) => (
              <li key={index}>{item.question}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdminForm;
