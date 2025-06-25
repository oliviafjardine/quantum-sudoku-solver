import React, { useState } from "react";
import SudokuBoard from "../components/SudokuBoard";
import SolveButton from "../components/SolveButton";

// Helper to shuffle an array
function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Generate a full valid Sudoku board using backtracking
function generateFullBoard(): number[][] {
  const board = Array.from({ length: 9 }, () => Array(9).fill(0));

  function isValid(row: number, col: number, num: number): boolean {
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === num || board[i][col] === num) return false;
    }
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if (board[boxRow + r][boxCol + c] === num) return false;
      }
    }
    return true;
  }

  function fill(row = 0, col = 0): boolean {
    if (row === 9) return true;
    if (col === 9) return fill(row + 1, 0);
    const nums = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    for (const num of nums) {
      if (isValid(row, col, num)) {
        board[row][col] = num;
        if (fill(row, col + 1)) return true;
        board[row][col] = 0;
      }
    }
    return false;
  }

  fill();
  return board;
}

// Remove cells to create a puzzle
function generateRandomSudoku(clues = 30): number[][] {
  const board = generateFullBoard();
  // Create a list of all cell positions
  const positions = shuffle(
    Array.from({ length: 81 }, (_, i) => [Math.floor(i / 9), i % 9])
  );
  let removed = 0;
  for (const [row, col] of positions) {
    if (removed >= 81 - clues) break;
    const backup = board[row][col];
    board[row][col] = 0;
    removed++;
  }
  return board.map((row) => [...row]);
}

const Home: React.FC = () => {
  const [board, setBoard] = useState<number[][]>(
    Array.from({ length: 9 }, () => Array(9).fill(0))
  );

  const handleRandom = () => {
    setBoard(generateRandomSudoku(30)); // 30 clues (difficult but solvable)
  };

  return (
    <div className="text-center mt-8">
      <h1 className="text-2xl font-bold">Quantum Sudoku Solver</h1>
      <button
        onClick={handleRandom}
        className="mt-4 mb-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Random Sudoku
      </button>
      <SudokuBoard board={board} setBoard={setBoard} />
      <SolveButton board={board} setBoard={setBoard} />
    </div>
  );
};

export default Home;
