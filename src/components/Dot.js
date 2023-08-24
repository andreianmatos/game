import React from 'react';
import './Dot.css'; // Create Dot.css for styles

const Dot = ({ x, y }) => {
  return <div className="dot" style={{ left: `${x}px`, top: `${y}px` }} />;
};

export default Dot;