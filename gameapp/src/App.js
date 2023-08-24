import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [dotPosition, setDotPosition] = useState({ x: 100, y: 0 });
  const gravity = 1;

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        setDotPosition((prevPos) => ({ ...prevPos, x: prevPos.x - 10 }));
      } else if (event.key === 'ArrowRight') {
        setDotPosition((prevPos) => ({ ...prevPos, x: prevPos.x + 10 }));
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDotPosition((prevPos) => {
        const newY = prevPos.y + gravity;

        // Scroll down the window
        window.scrollBy(0, gravity);

        return { ...prevPos, y: newY };
      });
    }, 10);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <div className="block" style={{ left: '200px', top: '200px' }} />
      <div className="block" style={{ left: '500px', top: '400px' }} />
     
      <div className="dot" style={{ left: `${dotPosition.x}px`, top: `${dotPosition.y}px` }} />
    </div>
  );
}

export default App;
