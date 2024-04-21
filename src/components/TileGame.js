// // TileGame.js

// import React, { useState, useEffect } from 'react';
// import Tile from './Tile'; // Assuming you have a Tile component
// import StartStopButton from './StartStopButton'; // Assuming you have a StartStopButton component
// import SpeedControl from './SpeedControl'; // Assuming you have a SpeedControl component
// import ScoreDisplay from './ScoreDisplay'; // Assuming you have a ScoreDisplay component

// const TileGame = () => {
//   // State variables
//   const [score, setScore] = useState(0);
//   const [isRunning, setIsRunning] = useState(false);
//   const [animationSpeed, setAnimationSpeed] = useState(250);
//   const [gridColors, setGridColors] = useState([]);

//   // Fetch initial grid colors from the backend
//   useEffect(() => {
//     fetchGridPatterns()
//       .then(colors => setGridColors(colors))
//       .catch(error => console.error('Error fetching grid colors:', error));
//   }, []);

 

// // Animation interval for blinking tiles
// useEffect(() => {
//     const interval = setInterval(() => {
//       if (isRunning) {
//         // Implement your logic here (e.g., changing tile colors, updating score)
//         // For simplicity, let's assume the tiles blink randomly
//         // You can replace this with your actual game logic
  
//         // Example: Randomly change the color of a tile
//         const randomTileIndex = Math.floor(Math.random() * gridColors.length);
//         const newGridColors = [...gridColors];
//         newGridColors[randomTileIndex] = getRandomColor(); // Implement getRandomColor() function
//         setGridColors(newGridColors);
//       }
//     }, animationSpeed);
  
//     return () => clearInterval(interval);
//   }, [isRunning, animationSpeed]);


//   // Fetch grid patterns from the backend
//   const fetchGridPatterns = async () => {
//     try {
//       const response = await fetch('http://localhost:5123/api/grid-patterns');
//       if (!response.ok) {
//         throw new Error('Failed to fetch grid patterns');
//       }
//       const data = await response.json();
//       return data.gridColors;
//     } catch (error) {
//       throw new Error('Error fetching grid colors: ' + error.message);
//     }
//   };

  
//   // Handle tile click
//   const handleTileClick = (color) => {
//     // Update score and blink tile
//     // Implement your tile click logic here
//     // For example, check if the clicked tile is blue or red and update the score accordingly
  
//     // Example: If the clicked tile is blue, add 10 to the score
//     if (color === 'blue') {
//       setScore(score + 10);
//     } else if (color === 'red') {
//       setScore(score - 10);
//     }
  
//     // Example: Blink the tile by changing its color temporarily
//     const clickedTileIndex = gridColors.indexOf(color);
//     const newGridColors = [...gridColors];
//     newGridColors[clickedTileIndex] = 'white'; // Change to a neutral color
//     setGridColors(newGridColors);
  
//     setTimeout(() => {
//       // Restore the original color after blinking
//       newGridColors[clickedTileIndex] = color;
//       setGridColors(newGridColors);
//     }, 300); // Blink duration (adjust as needed)
//   };
  
//   // Example: Generate a random color (you can replace this with your own logic)
//   const getRandomColor = () => {
//     const colors = ['blue', 'red', 'green']; // Your available tile colors
//     return colors[Math.floor(Math.random() * colors.length)];
//   };




//   // Handle start/stop button click
//   const handleStartStop = () => {
//     setIsRunning(!isRunning);
//     if (!isRunning) {
//       setScore(0); // Reset score when starting the game
//     }
//   };

//   // Handle speed control change
//   const handleSpeedChange = (event) => {
//     setAnimationSpeed(parseInt(event.target.value));
//   };

  
//   return (
//     <div>
//       {/* Render the grid of tiles */}
//       <div className="grid-container">
//         {gridColors.map((color, index) => (
//           <Tile key={index} color={color} onClick={() => handleTileClick(color)} />
//         ))}
//       </div>
//       {/* Start/stop button */}
//       <StartStopButton onClick={handleStartStop} isRunning={isRunning} />
//       {/* Speed control */}
//       <SpeedControl value={animationSpeed} onChange={handleSpeedChange} />
//       {/* Display the current score */}
//       <ScoreDisplay score={score} />
//     </div>
//   );
// };

// export default TileGame;

// TileGame.js

// TileGame.js

import React, { useState, useEffect } from 'react';
import Tile from './Tile'; // Assuming you have a Tile component
import StartStopButton from './StartStopButton'; // Assuming you have a StartStopButton component
import SpeedControl from './SpeedControl'; // Assuming you have a SpeedControl component
import ScoreDisplay from './ScoreDisplay'; // Assuming you have a ScoreDisplay component

const TileGame = () => {
  // State variables
  const [score, setScore] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(250);
  const [gridColors, setGridColors] = useState([]);

  // Fetch initial grid colors from the backend
  useEffect(() => {
    initializeGrid();
    fetchGridPatterns()
      .then(colors => {
        setGridColors(colors);
      })
      .catch(error => console.error('Error fetching grid colors:', error));
  }, []);

// Animation interval for blinking tiles
useEffect(() => {
  const interval = setInterval(() => {
    if (isRunning) {
      let randomTileIndex;
      do {
        randomTileIndex = Math.floor(Math.random() * 80 + 20); // Skip the first 20 tiles
      } while (randomTileIndex % 10 < 2); // Ensure the random index is not within the first 2 columns
      const newGridColors = [...gridColors];
      newGridColors[randomTileIndex] = getRandomColor(); // Implement getRandomColor() function
      setGridColors(newGridColors);
    }
  }, animationSpeed);

  return () => clearInterval(interval);
}, [isRunning, animationSpeed, gridColors]);



  // Fetch grid patterns from the backend
  const fetchGridPatterns = async () => {
    try {
      const response = await fetch('http://localhost:5123/api/grid-patterns');
      if (!response.ok) {
        throw new Error('Failed to fetch grid patterns');
      }
      const data = await response.json();
      return data.gridColors;
    } catch (error) {
      throw new Error('Error fetching grid colors: ' + error.message);
    }
  };

 // Initialize the grid with green tiles in the first 2 columns and random colors in the rest
 const initializeGrid = () => {
  const initialGrid = new Array(100).fill().map((_, index) => {
    return index < 20 ? 'green' : getRandomColor();
  });
  setGridColors(initialGrid);
};

  // Handle tile click
  const handleTileClick = (color, index) => {
    if (color === 'blue') {
      setScore(score + 10);
    } else if (color === 'red') {
      setScore(score - 10);
    }

    // Blink the tile by changing its color temporarily
    const newGridColors = [...gridColors];
    newGridColors[index] = 'white'; // Change to a neutral color
    setGridColors(newGridColors);

    setTimeout(() => {
      // Restore the original color after blinking
      newGridColors[index] = color;
      setGridColors(newGridColors);
    }, 300); // Blink duration (adjust as needed)
  };

  // Example: Generate a random color (you can replace this with your own logic)
  const getRandomColor = () => {
    const colors = ['blue', 'red']; // Your available tile colors
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Handle start/stop button click
  const handleStartStop = () => {
    setIsRunning(!isRunning);
    if (!isRunning) {
      setScore(0); // Reset score when starting the game
    }
  };

  // Handle speed control change
  const handleSpeedChange = (event) => {
    setAnimationSpeed(parseInt(event.target.value));
  };

  return (
    <div>
      {/* Render the grid of tiles */}
      <div className="grid-container">
        {gridColors.map((color, index) => (
          <Tile key={index} color={color} onClick={() => handleTileClick(color, index)} />
        ))}
      </div>
      {/* Start/stop button */}
      <StartStopButton onClick={handleStartStop} isRunning={isRunning} />
      {/* Speed control */}
      <SpeedControl value={animationSpeed} onChange={handleSpeedChange} />
      {/* Display the current score */}
      <ScoreDisplay score={score} />
    </div>
  );
};

export default TileGame;
