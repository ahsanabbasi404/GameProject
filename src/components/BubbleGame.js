import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

const BubbleGame = () => {
  const [bubbles, setBubbles] = useState([]);
  const [score, setScore] = useState(0);
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    const bubbleInterval = setInterval(() => {
      const bubble = {
        id: Math.random(),
        top: Math.random() * (window.innerHeight - 100),
        left: Math.random() * (window.innerWidth - 350) + 250,
      };
      setBubbles((prevBubbles) => [...prevBubbles, bubble]);

      setTimeout(() => {
        setBubbles((prevBubbles) => prevBubbles.filter((b) => b.id !== bubble.id));
      }, 2000);
    }, 1000);

    return () => clearInterval(bubbleInterval);
  }, []);

  useEffect(() => {
    if (score > 0 && score % 5 === 0) {
      fetchData();
    }
  }, [score]);

  const handleBubbleClick = (id) => {
    setBubbles((prevBubbles) =>
      prevBubbles.map((bubble) => {
        if (bubble.id === id) {
          setScore((prevScore) => prevScore + 1);
          return { ...bubble, popped: true };
        }
        return bubble;
      })
    );
  };

  const fetchData = () => {
    fetch('https://api.quotable.io/random')
      .then((response) => response.json())
      .then((data) => {
        setQuote({
          content: data.content,
          author: data.author,
        });
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  const closeDialog = () => {
    setQuote(null);
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, zIndex: 1000 }}>
      {/* Bubbles */}
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className={bubble.popped ? 'bubble popped' : 'bubble'}
          style={{
            position: 'absolute',
            top: bubble.top,
            left: bubble.left,
            pointerEvents: 'auto',
            cursor: 'pointer',
          }}
          onClick={() => handleBubbleClick(bubble.id)}
        >
          <FontAwesomeIcon icon={faCircle} style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '24px' }} />
        </div>
      ))}

   
      <div
        style={{
          position: 'fixed',
          top: 20,
          left: 700,
          color: 'white',
          zIndex: 1000,
          backgroundColor: 'rgba(0,0,0,0.5)',
          padding: '10px',
          borderRadius: '5px',
          fontFamily: 'Roboto, sans-serif',
          fontWeight: 'bold',
          fontSize: '18px',
        }}
      >
        Score: {score}
      </div>

      
      {quote && (
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 2000 }}>
          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              padding: '20px',
              borderRadius: '5px',
              textAlign: 'center',
            }}
          >
            <p>{quote.content}</p>
            <p>- {quote.author}</p>
            <button onClick={closeDialog}>Close</button>
          </div>
        </div>
      )}

     
      <style>
        {`
          .bubble {
            transition: transform 0.5s ease, opacity 0.5s ease;
          }

          .bubble.popped {
            animation: bubbleAnimation 0.5s ease forwards;
          }

          @keyframes bubbleAnimation {
            0% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.5);
              opacity: 0.5;
            }
            100% {
              transform: scale(2);
              opacity: 0;
            }
          }
        `}
      </style>
    </div>
  );
};

export default BubbleGame;
