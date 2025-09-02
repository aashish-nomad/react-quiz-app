import { useCallback, useState } from "react";
import QUESTIONS from "../questions.js";
import quizCompleteImage from "../assets/quiz-complete.png";
import Question from "./Question.jsx";

const TIMER = 15000;

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const [answerState, setAnswerState] = useState('');

  const activeQuestionIndex = answerState == '' ? userAnswers.length : userAnswers.length - 1;

  const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
    setAnswerState('answered');
    setUserAnswers((prevAnswers) => [...prevAnswers, selectedAnswer]);

    setTimeout(() => {
      const correctAnswer = QUESTIONS[activeQuestionIndex].answers[0];

      if (selectedAnswer == correctAnswer) {
        setAnswerState('correct');
      } else {
        setAnswerState('wrong');
      }

      // This timer will only start after the parent timer expired.
      setTimeout(() => {
        setAnswerState('');
      }, 2000);
    }, 1000);
  }, [activeQuestionIndex]);

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

  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex}
        questionText={QUESTIONS[activeQuestionIndex].text}
        answers={QUESTIONS[activeQuestionIndex].answers}
        answerState={answerState}
        lastSelecteAnswer={userAnswers[userAnswers.length - 1]}
        activeQuestionIndex={activeQuestionIndex}
        onAnswerSelect={handleSelectAnswer}
        handleQuestionSkip={handleQuestionSkip}
        timer={TIMER}
      />
    </div>
  );
}