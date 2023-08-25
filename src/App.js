import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [dotPosition, setDotPosition] = useState({ x: 100, y: 100 }); // Starting at the top
  const [blockPositions, setBlockPositions] = useState(() => generateRandomPositions()); // Generate random positions for blocks

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        setDotPosition((prevPos) => ({ ...prevPos, x: Math.max(prevPos.x - 10, 0) }));
      } else if (event.key === 'ArrowRight') {
        setDotPosition((prevPos) => ({ ...prevPos, x: Math.min(prevPos.x + 10, window.innerWidth - 100) }));
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    // Check for collisions between the dot and blocks
    const checkCollisions = () => {
      for (const blockPos of blockPositions) {
        if (
          dotPosition.x < blockPos.left + 100 && // Dot's right edge is to the left of the block's right edge
          dotPosition.x + 100 > blockPos.left && // Dot's left edge is to the right of the block's left edge
          dotPosition.y < blockPos.top + 100 && // Dot's bottom edge is above the block's top edge
          dotPosition.y + 100 > blockPos.top    // Dot's top edge is below the block's bottom edge
        ) {
          // Collision detected, handle it here
          console.log('Collision with block detected');
          // For example, you could stop the dot from moving further left or right
        }
      }
    };

    checkCollisions();
  }, [dotPosition]);

  return (
    <div className="App">
      {/* Butterfly (Dot) */}
      <div className="dot" style={{ left: `${dotPosition.x}px`, top: `${dotPosition.y}px` }} />

      {/* Static Blocks */}
      {blockPositions.map((position, index) => (
        <div key={index} className="block" style={position} />
      ))}
    </div>
  );
}

// Generate random positions for blocks while avoiding collisions
function generateRandomPositions() {
  const numBlocks = 2; // Adjust the number of blocks as needed
  const blockSize = 100; // Adjust the size of the blocks as needed
  const positions = [];
  const scrollY = window.scrollY; // Current scroll position

  for (let i = 0; i < numBlocks; i++) {
    let left, top;
    let isValidPosition = false;

    // Generate positions until a valid position is found
    while (!isValidPosition) {
      left = Math.random() * (window.innerWidth - blockSize);
      top = Math.random() * (window.innerHeight - blockSize) + scrollY; // Adjust for scroll

      // Check for collision with existing blocks
      isValidPosition = positions.every(
        (pos) =>
          left + blockSize < pos.left ||
          left > pos.left + blockSize ||
          top + blockSize < pos.top ||
          top > pos.top + blockSize
      );
    }

    positions.push({ left, top });
  }

  return positions;
}

export default App;
