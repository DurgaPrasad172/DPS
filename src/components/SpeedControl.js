// src/components/SpeedControl.js
import React from 'react';

const SpeedControl = ({ value, onChange }) => {
  return (
    <input type="range" min="50" max="250" value={value} onChange={onChange} />
  );
};

export default SpeedControl;
