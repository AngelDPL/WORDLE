import React, { useState, useEffect } from "react";
import "./App.css";
import Row from "../components/Row/Row.jsx";

const App = () => {
  const wordList = [
    "REACT",
    "BUILD",
    "CODES",
    "WORLD",
    "BRAIN",
    "CLOCK",
    "FRAME",
    "GUESS",
    "LOGIC",
    "MUSIC",
    "NIGHT",
    "PLANE",
    "QUICK",
    "ROBOT",
    "STEEL",
    "TOWER",
    "UNITY",
    "VIRUS",
    "WATER",
    "YACHT",
  ];

  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    return wordList[randomIndex];
  };

  const [targetWord, setTargetWord] = useState("");
  const maxAttempts = 6;

  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setTargetWord(getRandomWord());
  }, []);

  // Función para reiniciar el juego
  const resetGame = () => {
    setTargetWord(getRandomWord());
    setGuesses([]);
    setCurrentGuess("");
    setIsGameOver(false);
    setErrorMessage("");
  };

  const handleInputChange = (e) => {
    setCurrentGuess(e.target.value.toUpperCase());
    setErrorMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleGuess();
    }
  };

  const handleGuess = () => {
    if (currentGuess.length !== 5) {
      setErrorMessage(`The word must have 5 letters.`);
      return;
    }

    const updateGuesses = [...guesses, currentGuess];
    setGuesses(updateGuesses);
    setCurrentGuess("");
    setErrorMessage("");

    if (currentGuess === targetWord || updateGuesses.length >= maxAttempts) {
      setIsGameOver(true);
    }
  };

  return (
    <div className="main-container">
      <h1>Wordle</h1>
      {guesses.map((guess, index) => (
        <Row key={index} guess={guess} targetWord={targetWord} />
      ))}
      {!isGameOver && (
        <>
          <input
            value={currentGuess}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown} 
            maxLength={5}
            placeholder="Enter your guess"
            autoFocus 
          />

          <button onClick={handleGuess}>Guess</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </>
      )}
      {isGameOver && (
        <div className="game-over">
          {guesses[guesses.length - 1] === targetWord ? (
            <p className="success-message">
              Congratulations! You guessed the word correctly.
            </p>
          ) : (
            <p className="failure-message">{`Game over! The word was: ${targetWord}`}</p>
          )}
          <button className="play-again" onClick={resetGame}>
            Play again
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
