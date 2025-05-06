import React from "react";
import "./Row.css";

const Row = ({ guess, targetWord }) => {
  
  const getLetterStatus = (letter, index) => {
    if (letter === targetWord[index]) {
      return "correct";
    } else if (targetWord.includes(letter)) {
      return "present";
    } else {
      return "absent";
    }
  };

  return (
    <div className="word-row">
      {guess.split("").map((letter, index) => (
        <span
          key={index}
          className={`letter ${getLetterStatus(letter, index)}`}
        >
          {letter}
        </span>
      ))}
    </div>
  );
};

export default Row;
