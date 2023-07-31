import React, { useState, useEffect } from 'react';

const Minesweeper = () => {
  const rows = 8;
  const cols = 8;
  const mines = 10;

  const [board, setBoard] = useState([]);
  const [revealed, setRevealed] = useState(new Set());
  const [gameOver, setGameOver] = useState(false);

  // Function to reveal a single cell
const revealCell = (row, col) => {
  const newRevealed = new Set(revealed);
  newRevealed.add(row * cols + col);
  setRevealed(newRevealed);
};

// Function to handle cell click and reveal

  // Function to generate the board
  const generateBoard = () => {
    const emptyBoard = Array(rows).fill(null).map(() => Array(cols).fill(0));
    let mineCount = 0;

    while (mineCount < mines) {
      const randomRow = Math.floor(Math.random() * rows);
      const randomCol = Math.floor(Math.random() * cols);

      if (emptyBoard[randomRow][randomCol] !== -1) {
        emptyBoard[randomRow][randomCol] = -1;
        mineCount++;
      }
    }

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (emptyBoard[row][col] !== -1) {
          emptyBoard[row][col] = countAdjacentMines(emptyBoard, row, col);
        }
      }
    }

    return emptyBoard;
  };

  // Function to count adjacent mines for a cell
  const countAdjacentMines = (board, row, col) => {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const newRow = row + i;
        const newCol = col + j;
        if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
          if (board[newRow][newCol] === -1) {
            count++;
          }
        }
      }
    }
    return count;
  };

  // Function to handle cell click and reveal
  const handleCellClick = (row, col) => {
    if (gameOver || revealed.has(row * cols + col)) {
      return;
    }

    if (board[row][col] === -1) {
      setGameOver(true);
      revealAllMines();
    } 
    else {
      revealCell(row, col);
      if (board[row][col] === 0) {
        revealEmptyCells(row, col);
      }
    }
  };

  // Function to reveal all mines when the game is over
  const revealAllMines = () => {
    const newRevealed = new Set(revealed);
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (board[row][col] === -1) {
          newRevealed.add(row * cols + col);
        }
      }
    }
    setRevealed(newRevealed);
  };

  // Helper function to recursively reveal empty cells
  const revealEmptyCellsRecursively = (row, col, newRevealed) => {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const newRow = row + i;
        const newCol = col + j;
        if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
          const cellIndex = newRow * cols + newCol;
          if (!newRevealed.has(cellIndex) && !revealed.has(cellIndex)) {
            newRevealed.add(cellIndex);
            if (board[newRow][newCol] === 0) {
              revealEmptyCellsRecursively(newRow, newCol, newRevealed);
            }
          }
        }
      }
    }
  };
  
  // Function to recursively reveal empty cells
  const revealEmptyCells = (row, col) => {
    const cellIndex = row * cols + col;
    if (!revealed.has(cellIndex)) {
      const newRevealed = new Set(revealed);
      newRevealed.add(cellIndex);
      revealEmptyCellsRecursively(row, col, newRevealed);
      setRevealed(newRevealed);
    }
  };

  useEffect(() => {
    // Initialize the game board once when the component mounts
    const generatedBoard = generateBoard();
    setBoard(generatedBoard);
  }, []);

  // Rendering the game board as a grid of buttons
  return (
    <div>
      <h1>Minesweeper</h1>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 30px)` }}>
        {board.map((row, rowIndex) => (
          row.map((cell, colIndex) => (
            <button
              key={rowIndex * cols + colIndex}
              style={{
                width: '30px',
                height: '30px',
                border: '1px solid #333',
                backgroundColor: revealed.has(rowIndex * cols + colIndex) ? '#ccc' : '#fff',
                color: revealed.has(rowIndex * cols + colIndex) ? '#333' : 'transparent',
              }}
              onClick={() => handleCellClick(rowIndex, colIndex)}
            >
              {revealed.has(rowIndex * cols + colIndex) && cell > 0 ? cell : ''}
            </button>
          ))
        ))}
      </div>
    </div>
  );
};
export default Minesweeper;