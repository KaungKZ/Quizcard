import React, { useContext } from "react";
import QuizcardInner from "./QuizcardInner";
import { context } from "./App";

export default function Quizcard({ flashcards }) {
  const { loading } = useContext(context);
  return (
    <div className={`card-container ${loading ? "hidden" : ""}`}>
      {flashcards.map((flashcard) => {
        return (
          <QuizcardInner
            flashcard={flashcard}
            key={flashcard.id}
          ></QuizcardInner>
        );
      })}
    </div>
  );
}
