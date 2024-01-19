import React, { useState, useEffect } from 'react';
import './TicTacToe.css';

const initialBoard = Array(9).fill(null);

const TicTacToe = ({onExit}) => {
  const [board, setBoard] = useState(initialBoard);
  const [isXNext, setIsXNext] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0 });
  const [gameOver, setGameOver] = useState(false);
  const theEnd = () => {
    alert('Hope you enjoyed the game!')
    onExit(null);
  }
  useEffect(() => {
    const winner = calculateWinner();
    if (winner) {
      setGameOver(true);
      updateScores(winner);
    } else if (board.every((square) => square !== null)) {
      setGameOver(true);
    }
  }, [board]);

  const calculateWinner = () => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return null;
  };

  const handleClick = (index) => {
    if (gameOver || board[index] || calculateWinner()) {
      return;
    }

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';

    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setIsXNext(true);
    setGameOver(false);
  };

  const restartGame = () => {
    setBoard(initialBoard);
    setIsXNext(true);
    setGameOver(false);
    
  };

  const updateScores = (winner) => {
    if (winner) {
      setScores((prevScores) => ({
        ...prevScores,
        [winner]: prevScores[winner] + 1,
      }));
    }
  };

  const status = calculateWinner()
    ? `Winner: ${calculateWinner()}`
    : gameOver
    ? "It's a draw!"
    : `Next player: ${isXNext ? 'X' : 'O'}`;

  return (
    <div className="tic-tac-toe">
      <div className="status">{status}</div>
      <div className="scores">
        <div>Player X: {scores.X}</div>
        <div>Player O: {scores.O}</div>
      </div>
      <div className="board">
        {Array.from({ length: 3 }, (_, row) => (
          <div key={row} className="board-row">
            {Array.from({ length: 3 }, (_, col) =>
              renderSquare(row * 3 + col)
            )}
          </div>
        ))}
      </div>
      <div className="button-container">
        <button className="exit-button" onClick={() => theEnd()}>
          Exit Game
        </button>
        <button className="restart-button" onClick={restartGame}>
          Restart Game
        </button>
      </div>
    </div>
  );

  function renderSquare(index) {
    const squareValue = board[index];
    const squareClassName = `square ${squareValue === 'X' ? 'square-X' : ''} ${squareValue === 'O' ? 'square-O' : ''}`;
  
    return (
      <button className={squareClassName} onClick={() => handleClick(index)}>
        {squareValue}
      </button>
    );
  }

};

export default TicTacToe;
