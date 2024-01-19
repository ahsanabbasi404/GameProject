
import React, { useState, useEffect } from 'react';
import './FruitGame.css';

const fruitTypes = ['🍎', '🍌', '🍇', '🍊', '🍓', '🍍', '🥭', '🍉', '🍒'];

const GameComponent = ({ onExit }) => {
  const [visibleFruits, setVisibleFruits] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30);

  const generateRandomFruit = () => {
    const randomFruit = fruitTypes[Math.floor(Math.random() * fruitTypes.length)];
    const randomPosition = {
      top: Math.random() * 70 + 10 + '%',
      left: Math.random() * 90 + 5 + '%',
    };
    return { id: Date.now(), fruit: randomFruit, position: randomPosition };
  };

  const startGame = () => {
    setScore(0);
    setGameOver(false);
    setTimeRemaining(30);
    spawnFruits();
  };

  const spawnFruits = () => {
    const intervalId = setInterval(() => {
      const newFruits = [...visibleFruits, generateRandomFruit()];
      setVisibleFruits(newFruits.slice(-2)); 
    }, 1500);

    setTimeout(() => {
      clearInterval(intervalId);
      endGame();
    }, 30000); 
  };

  const endGame = () => {
    setVisibleFruits([]);
    setGameOver(true);
  };

  const restartGame = () => {
    setGameOver(false);
    startGame();
  };

  const sliceFruit = (id) => {
    const remainingFruits = visibleFruits.filter((fruit) => fruit.id !== id);
    setScore((prevScore) => prevScore + 1);
    setVisibleFruits(remainingFruits);
  };

  const handleExit = () => {
    alert("Hope you enjoyed the game!")
    onExit(null);
  };

  useEffect(() => {
    startGame();
  }, []); 

  useEffect(() => {
    if (timeRemaining === 0) {
      endGame();
    }
  }, [timeRemaining]);

  useEffect(() => {
    let countdownInterval;
    if (!gameOver) {
      countdownInterval = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => {
      clearInterval(countdownInterval);
    };
  }, [gameOver]);

  useEffect(() => {
    const fruitDisappearTimeouts = [];
    visibleFruits.forEach((fruit) => {
      const timeoutId = setTimeout(() => {
        const remainingFruits = visibleFruits.filter((f) => f.id !== fruit.id);
        setVisibleFruits(remainingFruits);
      }, 1500);

      fruitDisappearTimeouts.push(timeoutId);
    });

    return () => {
      fruitDisappearTimeouts.forEach((timeoutId) => clearTimeout(timeoutId));
    };
  }, [visibleFruits]);

  return (
    <div className="game-container">
      <h1 className="game-title">Slice the Fruit!</h1>
      <div className="fruit-container">
        {visibleFruits.map((fruit) => (
          <div
            key={fruit.id}
            onClick={() => sliceFruit(fruit.id)}
            className="fruit"
            style={{ top: fruit.position.top, left: fruit.position.left }}
          >
            {fruit.fruit}
          </div>
        ))}
      </div>
      <div className="game-info">
        <p className="score-label">Score: {score}</p>
        <p className="time-remaining-label">Time Remaining: {timeRemaining}s</p>
        <button onClick={handleExit} className="exit-button">
              Exit Game
            </button>
        {gameOver && (
          <div className="game-over-message">
            <h2>Game Over!</h2>
            <p>Your score is {score}</p>
            <button onClick={restartGame} className="restart-button">
              Restart Game
            </button>
            <br />
            <br />
          </div>
        )}
      </div>
    </div>
  );
};

export default GameComponent;
