import React, { useState, useRef, useEffect } from 'react';
import './TossCoin.css';

const TossCoin = ({ handleExit }) => {
  const [result, setResult] = useState(null);
  const [playerName, setPlayerName] = useState('');
  const [playerScore, setPlayerScore] = useState(0);
  const [betAmount, setBetAmount] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [selectedPrediction, setSelectedPrediction] = useState(null);
  const [timer, setTimer] = useState(30);
  const [canTossCoin, setCanTossCoin] = useState(true);

  const coinRef = useRef(null);

  useEffect(() => {
    let countdown;
    if (isTimerRunning && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0 && isTimerRunning) {
      endRound();
    }

    return () => {
      clearInterval(countdown);
    };
  }, [isTimerRunning, timer]);

  const tossCoin = () => {
    if (betAmount <= 0 || !selectedPrediction || playerName.trim() === '') {
      alert('Please enter a valid name, bet amount, and select a prediction.');
      return;
    }

    setCanTossCoin(false); 

    setIsTimerRunning(true);

    const randomResult = Math.random() < 0.5 ? 'Heads' : 'Tails';

    setResult(randomResult);

    const predictionCorrect = selectedPrediction === randomResult;

    const newScore = predictionCorrect ? playerScore + betAmount : playerScore - betAmount;

    updateLocalStorage(playerName, newScore);

    setPlayerScore(newScore);
  };

  const endRound = () => {
    alert(`Round Over!\nYour Score: ${playerScore}`);
    setBetAmount(0);
    setResult(null);
    setIsTimerRunning(false);
    setTimer(30);

    // Enable tossing for the next round
    setCanTossCoin(true);
    setPlayerScore(0);
  };

  const handleBetChange = (event) => {
    const amount = parseInt(event.target.value, 10);
    setBetAmount(isNaN(amount) ? 0 : amount);
  };

  const handlePrediction = (prediction) => {
    setSelectedPrediction(prediction);
  };

  const handleExitt = () => {
    alert('Thanks for playing!');
    handleExit(null);
  };

  const displayHelp = () => {
    alert(
      "Welcome to the Coin Toss Game!\n\n" +
      "1. Enter your name.\n" +
      "2. Enter the amount you want to bet.\n" +
      "3. Select 'Heads' or 'Tails'.\n" +
      "4. Click 'Toss Coin' to see the result.\n" +
      "5. You have 30 seconds for each round. Make your bet and select a prediction before time runs out!\n" +
      "6. If your prediction is correct, you'll win the bet amount. Otherwise, you'll lose it.\n" +
      "7. Try to achieve the highest score!\n" +
      "8. After each round, you can choose to restart, exit, or continue playing."
    );
  };

  const updateLocalStorage = (name, newScore) => {
    const existingData = localStorage.getItem('coinTossGameData');
    let data;

    if (existingData) {
      data = JSON.parse(existingData);

      const userIndex = data.findIndex((user) => user.name === name);

      if (userIndex !== -1) {
        if (newScore > data[userIndex].score) {
          data[userIndex].score = newScore;
        }
      } else {
        data.push({ name, score: newScore });
      }
    } else {
      data = [{ name, score: newScore }];
    }

    localStorage.setItem('coinTossGameData', JSON.stringify(data));
  };

  return (
    <div className="coin-container">
      <h1>Coin Toss Game</h1>
      <div className="coin">
        <div className={`coin-image ${canTossCoin ? 'clickable' : ''}`} ref={coinRef} onClick={canTossCoin ? tossCoin : null}></div>
        {result && <p className={`result ${result.toLowerCase()}`}>{result}</p>}
        <div className="coin-options">
          <button onClick={() => handlePrediction('Heads')} className={selectedPrediction === 'Heads' ? 'selected' : ''}>Heads</button>
          <button onClick={() => handlePrediction('Tails')} className={selectedPrediction === 'Tails' ? 'selected' : ''}>Tails</button>
        </div>
        <input
          type="text"
          placeholder="Enter Your Name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter Bet Amount"
          value={betAmount}
          onChange={handleBetChange}
        />
        <button onClick={tossCoin} >
          Toss Coin
        </button>
        <button onClick={displayHelp}>Help</button>
        <p className="score">Score: {playerScore}</p>
        {isTimerRunning && <p className="timer">Time Remaining: {timer}s</p>}
        <div className="end-round-buttons">
          <button onClick={endRound}>
            End Round
          </button>
          <button onClick={handleExitt}>Exit</button>
        </div>
      </div>
    </div>
  );
};

export default TossCoin;
