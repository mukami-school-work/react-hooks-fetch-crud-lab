import QuestionItem from "./QuestionItem";
import React, { useEffect, useState } from "react";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then(res => res.json())
    .then(questions => setQuestions(questions))
  }, []);

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questions.map((question) => (
        <QuestionItem
          key={question.id}
          question={question}
        />
      ))}</ul>
    </section>
  );
}

export default QuestionList;
