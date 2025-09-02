import QuestionTimer from "./QuestionTimer.jsx";
import Answers from "./Answers.jsx";

export default function Question({ questionText, answers, onAnswerSelect, lastSelecteAnswer, answerState,
  handleQuestionSkip, timer
}) {
  return (<div id="question">
    <QuestionTimer
      timeout={timer}
      onTimeOut={handleQuestionSkip}
    />
    <h2>{questionText}</h2>
    <Answers
      answers={answers}
      selectedAnswer={lastSelecteAnswer}
      answerState={answerState}
      onAnswerSelect={onAnswerSelect}
    />
  </div>);
}