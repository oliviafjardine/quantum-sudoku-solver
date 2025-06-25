import React, { useState } from "react";
import SudokuBoard from "../components/SudokuBoard";
import SolveButton from "../components/SolveButton";

const Home: React.FC = () => {
  const [board, setBoard] = useState<number[][]>(
    Array.from({ length: 9 }, () => Array(9).fill(0))
  );

  return (
    <div className="text-center mt-8">
      <h1 className="text-2xl font-bold">Quantum Sudoku Solver</h1>
      <SudokuBoard board={board} setBoard={setBoard} />
      <SolveButton board={board} setBoard={setBoard} />
    </div>
  );
};

export default Home;
