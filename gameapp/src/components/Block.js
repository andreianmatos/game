import React from 'react';
import './Block.css'; // Create Block.css for styles

const Block = ({ left, top }) => {
  return <div className="block" style={{ left, top }} />;
};

export default Block;
