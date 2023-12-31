import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Layout from '../components/layout';
import Confetti from 'react-confetti';

function Square({ value, onSquareClick }) {
  const squareStyle = {
    // Your square style goes here (if you have any specific style)
  };
  
  return (
    <Button
  variant="contained"
  onClick={onSquareClick}
  sx={{
    m: 2,
    width: {xs:80, md:125}, // Fixed width for both mobile and desktop
    height: {xs:80, md:125}, // Fixed height for both mobile and desktop
    fontSize: '100px', // Fixed font size for both mobile and desktop
    textAlign: 'center',
    lineHeight: '125px',
    border: 'none', // Remove the border
    cursor: 'pointer',
    background: '#ffffff', // Set a custom background color
    color: 'black', // Text color
    borderRadius: '15px', // Rounded corners
    textTransform: 'uppercase', // Uppercase text
    fontWeight: 'bold', // Bold font weight
    boxShadow: '0 4px 8px rgba(33, 150, 243, 0.2)', // Add a subtle shadow
    outline: '2px solid black', // Add a black outline
    transition: 'transform 0.3s, box-shadow 0.3s, background 0.3s', // Smooth transitions on hover for scale, shadow, and background
    '&:hover': {
      background: '#21cbf3', // Custom background color on hover
      transform: 'scale(1.05)', // Scale up on hover
      boxShadow: '0 6px 12px rgba(33, 150, 243, 0.3)', // Increase shadow on hover
    },
  }}
>
  {value}
</Button>
  );
}

function Board({ xIsNext, squares, onPlay, setCurrentMove, setHistory }) {
  const [isCoAf, setIsCoAf] = useState(false);
  const winner = calculateWinner(squares);

  useEffect(() => {
    if (winner) {
      setIsCoAf(true);
    }
  }, [winner]);

  const handleReset = () => {
    setCurrentMove(0);
    setHistory([Array(9).fill(null)]);
    setIsCoAf(false);
  };
  
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <Layout>
      {isCoAf && <Confetti style={{ width: '100%' }} />}
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
      {winner && (
        <Button variant="contained" onClick={handleReset} style={{ marginTop: '10px' }}>
          Reset Game
        </Button>
      )}
    </Layout>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  const jumpTo = (nextMove) => {
    setCurrentMove(nextMove);
  };

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <Button onClick={() => jumpTo(move)}>{description}</Button>
      </li>
    );
  });

  return (
    <div className="game" style={{ maxHeight: '1000px', overflowY: 'auto' }}>
      <div className="game-board" sx={{ width: '400px', height: '400px', margin: 'auto' }}>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} setCurrentMove={setCurrentMove} setHistory={setHistory} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

