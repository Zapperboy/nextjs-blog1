import React from 'react';
import Minesweeper from '../components/Minesweeper'; // Import Minesweeper component here

export default function newpage2({ allPostsData }) {
  return (
    <div>
      <h1>New Page 2</h1>
      {/* You can render your Minesweeper component here */}
      <Minesweeper />
    </div>
  );
}