// // src/components/Tile.js
// import React from 'react';

// const Tile = ({ color, onClick }) => {
//   return (
//     <div className="tile" style={{ backgroundColor: color }} onClick={onClick}></div>
//   );
// };

// export default Tile;
// src/components/Tile.js
// src/components/Tile.js

import React from 'react';

const Tile = ({ color, onClick }) => {
  const tileStyle = {
    backgroundColor: color,
    width: '50px',
    height: '50px',
    border: '1px solid black',
  };

  return (
    <button style={tileStyle} onClick={onClick}></button>
  );
};

export default Tile;

