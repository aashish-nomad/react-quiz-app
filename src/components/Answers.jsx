import { useRef } from "react";


export default function Answers({ answers, selectedAnswer, answerState, onAnswerSelect }) {
  const shuffeledAnswers = useRef();

  if (!shuffeledAnswers.current) {
    shuffeledAnswers.current = [...answers.sort(() => Math.random() - 0.5)];
  }


  return <ul id="answers">
    {shuffeledAnswers.current.map((answer) => {

      let cssClass = "";

      const isSelected = selectedAnswer === answer;

      if (answerState === "answered" && isSelected) {
        cssClass = "selected";
      }

      if ((answerState === "correct" || answerState === "wrong") && isSelected) {
        cssClass = answerState; // applies "correct" or "wrong"
      }

      return (
        <li key={answer} className="answer">
          <button className={cssClass} onClick={() => onAnswerSelect(answer)} disabled={answerState !== ''}>
            {answer}
          </button>
        </li>
      );
    })}
  </ul>
}
