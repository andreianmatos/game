import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [dotPosition, setDotPosition] = useState({ x: 100, y: 100 });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [blockPositions, setBlockPositions] = useState(() => generateRandomPositions());
  const [scrollY, setScrollY] = useState(0);

  const images = [
    './assets/dotButterfly.png',
    './assets/dotButterfly2.png',
    './assets/dotButterfly3.png',
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
          dotPosition.x < blockPos.left + 100 &&
          dotPosition.x + 100 > blockPos.left &&
          dotPosition.y < blockPos.top + 100 + scrollY &&
          dotPosition.y + 100 > blockPos.top + scrollY
        ) {
          setScrollY(dotPosition.y + 100 - window.innerHeight / 2);
          window.scrollTo(0, scrollY);
        }
      }
    };

    checkCollisions();
  }, [dotPosition, blockPositions, scrollY]);

  useEffect(() => {
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      console.log(images[currentImageIndex])
    }, 1000); 

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="App">
      {/* Dot */}
      <div className="dot" style={{ 
        left: `${dotPosition.x}px`, 
        top: `${dotPosition.y}px`,
        //backgroundImage: `url(${require(images[currentImageIndex])})` #not working ???
        backgroundImage: `url(${require('./assets/dotButterfly.png')})`
      }} />

      {/* Static Blocks */}
      {blockPositions.map((position, index) => (
        <div key={index} className="block" style={{ ...position, top: position.top + scrollY }} />
      ))}
    </div>
  );
}

// Generate random positions for blocks while avoiding collisions
function generateRandomPositions() {
  const numBlocks = 2; 
  const blockSize = 100;
  const positions = [];

  for (let i = 0; i < numBlocks; i++) {
    let left, top;
    let isValidPosition = false;

    while (!isValidPosition) {
      left = Math.random() * (window.innerWidth - blockSize);
      top = Math.random() * (window.innerHeight - blockSize);

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
