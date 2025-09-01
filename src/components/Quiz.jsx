import { useCallback, useState } from "react";
import QUESTIONS from "../questions.js";
import quizCompleteImage from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer.jsx";

const TIMER = 15000;

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex = userAnswers.length;

  const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
    setUserAnswers((prevAnswers) => [...prevAnswers, selectedAnswer]);
  }, []);

  const handleQuestionSkip = useCallback(function handleQuestionSkip() {
    handleSelectAnswer(null)
  }, [handleSelectAnswer])

  const quizIsComplete = activeQuestionIndex == QUESTIONS.length;

  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizCompleteImage} alt="Trophy icon" />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  const question = QUESTIONS[activeQuestionIndex];
  const shuffeledAnswers = [...question.answers.sort(() => Math.random() - 0.5)];

  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer timeout={TIMER} onTimeOut={handleQuestionSkip} key={activeQuestionIndex} />
        <h2>{question.text}</h2>
        <ul id="answers">
          {shuffeledAnswers.map((answer) => (
            <li key={answer} className="answer">
              <button onClick={() => handleSelectAnswer(answer)}>
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}