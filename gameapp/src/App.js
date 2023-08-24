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
      setDotPosition((prevPos) => ({ ...prevPos, y: prevPos.y + gravity }));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <div
        className="dot"
        style={{ left: `${dotPosition.x}px`, top: `${dotPosition.y}px` }}
      />
    </div>
  );
}

export default App;
