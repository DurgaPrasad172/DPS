import React from 'react';
import './ScoreDisplay.css'; // Import the CSS file

const ScoreDisplay = ({ score }) => {
  return (
    <div className="score-card">Score: {score}</div>
  );
};

export default ScoreDisplay;
