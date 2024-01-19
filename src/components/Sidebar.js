import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle, faGamepad, faPlayCircle, faTrophy } from '@fortawesome/free-solid-svg-icons';

const twinkling = keyframes`
  0% { background-position: 0 0; }
  100% { background-position: 1000px 500px; }
`;

const SidebarContainer = styled.div`
  background-color: #2c3e50;
  width: 250px;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  overflow-y: auto;
  font-family: 'Roboto', sans-serif;
  overflow: hidden;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: url('https://i.pinimg.com/originals/17/2d/3c/172d3ca203948062edffc03aa5c412a3.gif');
    opacity: 0.5;
    top: 0;
    left: 0;
    z-index: -1;
    animation: ${twinkling} 20s linear infinite;
  }
  &:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 3px; /* Adjust the width of the border */
    height: 100%;
    background: linear-gradient(to bottom, red, orange, yellow, green, blue, indigo, violet); /* Adjust colors */
    animation: borderAnimation 6s ease-in-out infinite;
  }

  @keyframes borderAnimation {
    0%, 100% {
      height: 0;
    }
    50% {
      height: 100%;
    }
    55% {
      height: 100%;
      animation-timing-function: cubic-bezier(0.5, 0, 0.5, 1); /* Pause at the end */
    }
    100% {
      height: 0;
    }
  }
`;

const SidebarContent = styled.div`
  padding: 20px;
  color: #fff;
`;

const Title = styled.h2`
  font-size: 28px;
  margin-bottom: 20px;
  font-family: 'Bangers', cursive;
`;

const MenuList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const MenuItem = styled.li`
  margin-bottom: 15px;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateX(5px);
  }
`;

const MenuLink = styled.a`
  color: #fff;
  text-decoration: none;
  font-size: 20px;
  display: flex;
  align-items: center;
  font-family: 'Roboto', sans-serif;
  transition: color 0.3s ease;

  &:hover {
    color: #f39c12;
  }
`;

const GameSelectionContainer = styled.div`
  color: #fff;
  padding: 10px;

  p {
    margin-bottom: 10px;
  }

  button {
    background-color: #f39c12;
    color: #fff;
    border: none;
    padding: 8px 16px;
    margin-right: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #e67e22;
    }
  }
`;

const HighscoresContainer = styled.div`
  color: #fff;
  padding: 10px;

  h3 {
    margin-bottom: 10px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;

    th, td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }

    th {
      background-color: #f39c12;
      color: #fff;
    }
  }
`;

const HighscoresTable = () => {
  const [highscores, setHighscores] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem('coinTossGameData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);

      
      const sortedHighscores = parsedData.sort((a, b) => b.score - a.score);
      setHighscores(sortedHighscores.filter((item, index) => index<5));
    }
  }, []); 

  return (
    <HighscoresContainer>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {highscores.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </HighscoresContainer>
  );
};


const Sidebar = ({ handleGameSelection }) => {
  const [showHelpDialog, setShowHelpDialog] = useState(false);
  const [showHighscores, setShowHighscores] = useState(false);

  const handlePlayGameClick = () => {
   
    handleGameSelection(selectedGame);
  };

  const handleHelpClick = () => {
    setShowHelpDialog(true);
  };

  const handleHighscoresClick = () => {
    setShowHighscores(true);
  };

  const handleCloseHelpDialog = () => {
    setShowHelpDialog(false);
  };

  const handleCloseHighscores = () => {
    setShowHighscores(false);
  };

  const [selectedGame, setSelectedGame] = useState(null);

  const handleGameSelect = (game) => {
    setSelectedGame(game);
  };

  const SelectedGameLabel = styled.div`
    background-color: #3498db;
    color: #fff;
    padding: 10px;
    border-radius: 5px;
    margin-top: 10px;
    font-size: 18px;
    display: inline-block;
  `;

  const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
  `;

  const DialogBox = styled.div`
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    max-width: 80%;
  `;

  const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    color: #fff;
    font-size: 70px;
    cursor: pointer;
    z-index: 1001;
    padding: 0;
    outline: none;

    &:hover {
      color: #f39c12;
    }
  `;

  return (
    <SidebarContainer>
      <SidebarContent>
        <Title>Arcade Menu</Title>
        <MenuList>
          <MenuItem>
            <MenuLink href="#" onClick={handleHelpClick}>
              <FontAwesomeIcon icon={faQuestionCircle} style={{ marginRight: '10px' }} />
              Help
            </MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink href="#" onClick={() => handleGameSelect('Selected Game')}>
              <FontAwesomeIcon icon={faGamepad} style={{ marginRight: '10px' }} />
              Select Game
            </MenuLink>
          </MenuItem>
         
          <MenuItem>
            <MenuLink href="#" onClick={handlePlayGameClick}>
              <FontAwesomeIcon icon={faPlayCircle} style={{ marginRight: '10px' }} />
              Play Game
            </MenuLink>
          </MenuItem>
        
          <MenuItem>
            <MenuLink href="#" onClick={handleHighscoresClick}>
              <FontAwesomeIcon icon={faTrophy} style={{ marginRight: '10px' }} />
              Highscores
            </MenuLink>
          </MenuItem>
        </MenuList>
     
        {selectedGame === 'Selected Game' && (
          <GameSelectionContainer>
            <p>Select a game:</p>
            <button onClick={() => handleGameSelect('Toss Coin')}>Toss Coin</button>
            <button onClick={() => handleGameSelect('Tic Tac Toe')}>Tic Tac Toe</button>
            <button onClick={() => handleGameSelect('Fruit Game')}>Fruit Game</button>
          </GameSelectionContainer>
        )}
      
        {showHelpDialog && (
          <Overlay>
            <DialogBox>
        <CloseButton onClick={handleCloseHelpDialog}>&times;</CloseButton>
        <h2>Help</h2>
        <p>
          Welcome to Game Arena! Explore and enjoy various games:
        </p>
        <ul>
        <li>
          <strong>Bubble Game:</strong> Click the bubbles as they appear on the screen, click it 6 times and you will recieve a random quote!.
          </li>
          <li>
            <strong>Fruit Game:</strong> Slice and dice! Test your reflexes by slicing fruits as they appear on the screen.
          </li>
          <li>
            <strong>Tictac:</strong> Classic tic-tac-toe game. Challenge a friend and see who can get three in a row first!
          </li>
          <li>
            <strong>Toss Coin:</strong> Make decisions the old-fashioned way! Toss a virtual coin and let fate decide.
          </li>
        </ul>
      </DialogBox>
          </Overlay>
        )}
        
        {showHighscores && (
  <Overlay>
    <DialogBox>
      <CloseButton onClick={handleCloseHighscores}>&times;</CloseButton>
      <h2>Highscores - Toss Coin</h2>
      <HighscoresTable />     
    </DialogBox>
  </Overlay>
)}

      </SidebarContent>
     
      {selectedGame && selectedGame !== 'Selected Game' && (
        <SelectedGameLabel>
          Selected Game: {selectedGame}
        </SelectedGameLabel>
      )}
    </SidebarContainer>
  );
};

export default Sidebar;
