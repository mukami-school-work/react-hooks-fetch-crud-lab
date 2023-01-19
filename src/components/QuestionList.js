import QuestionItem from "./QuestionItem";
import React, { useEffect, useState } from "react";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then(res => res.json())
    .then(questions => setQuestions(questions))
  }, []);

  function handleDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => {
        const updatedQuestions = questions.filter((question) => question.id !== id);
        setQuestions(updatedQuestions);
      });
  }

  function handleCorrectAnswerChange(id, correctIndex){
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({correctIndex})
    })
    .then(res => res.json())
    .then((updatedQuestion) => {
      const updatedQuestions = questions.map((question) => {
        if (question.id === updatedQuestion.id) return updatedQuestion;
        return question;
      });
      setQuestions(updatedQuestions);
    })

  }


  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questions.map((question) => (
        <QuestionItem
          key={question.id}
          question={question}
          onDeleteClick={handleDelete}
          onCorrectAnswerChange={handleCorrectAnswerChange}
        />
      ))}</ul>
    </section>
  );
}

export default QuestionList;
