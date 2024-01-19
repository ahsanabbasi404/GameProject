import React,{useState} from 'react';
import Sidebar from './components/Sidebar';
import Tictac from './components/Tictac'
import TossCoin from './components/TossCoin'
import FruitGame from './components/FruitGame'
import BubbleGame from './components/BubbleGame';
const MainBody = () => {
  const remainingStyles = {
    flex: 1,
    backgroundImage: `url('https://i.pinimg.com/originals/d0/e0/e2/d0e0e259bf0aba4da742bedff1d4b8a5.gif')`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    minHeight: '100vh',
  };

  const [gameComponent, setGameComponent] = useState(null);

  const handleGameSelection = (game) => {
    setGameComponent(game);
    console.log(`In parent ${game}`)
  };

  return (
    <div style={{ display: 'flex', position: 'relative' }}>
      <div style={{ flex: '1', position: 'relative' }}>
        {gameComponent === 'Fruit Game' && <FruitGame onExit={handleGameSelection}/>}
        {gameComponent === 'Toss Coin' && <TossCoin handleExit={handleGameSelection}/>}
        {gameComponent === 'Tic Tac Toe' && <Tictac onExit={handleGameSelection}/>}
        {!gameComponent && (
          <>
           <Sidebar handleGameSelection={handleGameSelection} />
            <div style={remainingStyles}></div>
            <BubbleGame />
          </>
        )}
      </div>
    </div>
  );
};

export default MainBody;