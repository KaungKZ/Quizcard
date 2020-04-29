import React, { useState, useRef, useEffect } from "react";
import answerIcon from "../images/question.svg";

export default function QuizcardInner({ flashcard }) {
  const [toggleCard, setToggleCard] = useState(false);
  const [cardHeight, setCardHeight] = useState("initial");
  const cardEl = useRef();

  function calculateMaxHeight() {
    const cardHeight = cardEl.current.getBoundingClientRect().height;

    setCardHeight(Math.max(cardHeight, 250));
  }

  useEffect(calculateMaxHeight, [flashcard.answer, flashcard.question]);

  useEffect(() => {
    window.addEventListener("resize", calculateMaxHeight);
    return () => window.removeEventListener("resize", calculateMaxHeight);
  }, []);

  return (
    <div className="quiz-card" ref={cardEl} style={{ height: cardHeight }}>
      <div className={`front-card ${toggleCard ? "toggle" : ""}`}>
        <div className="title">
          <h3>{flashcard.question}</h3>
        </div>
        <div className="options">
          {flashcard.options.map((option) => {
            return (
              <p className="option" key={option}>
                {option}
              </p>
            );
          })}
        </div>
      </div>
      <div className={`${toggleCard ? "show-answer" : "hide-answer"}`}>
        <p className="intro-answer">The answer is</p>
        <p className="answer">{flashcard.answer}</p>
      </div>
      <div
        className="answer-icon"
        title={`${toggleCard ? "go back to question" : "view answer"}`}
        onClick={() => setToggleCard(!toggleCard)}
      >
        <img src={answerIcon} alt="" className="answer-icon-img" />
      </div>
    </div>
  );
}
