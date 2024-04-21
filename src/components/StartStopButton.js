// src/components/StartStopButton.js
import React from 'react';

const StartStopButton = ({ onClick, isRunning }) => {
  return (
    <button onClick={onClick}>{isRunning ? 'Stop' : 'Start'}</button>
  );
};

export default StartStopButton;
