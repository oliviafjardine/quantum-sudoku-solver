import axios from "axios";
import React from "react";

type Props = {
  board: number[][];
  setBoard: (newBoard: number[][]) => void;
};

const SolveButton: React.FC<Props> = ({ board, setBoard }) => {
  const handleSolve = async () => {
    try {
      const res = await axios.post("http://localhost:8000/solve", { grid: board });
      setBoard(res.data.solution);
    } catch (err) {
      alert("Error solving Sudoku!");
      console.error(err);
    }
  };

  return (
    <button
      onClick={handleSolve}
      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Solve with Quantum Logic
    </button>
  );
};

export default SolveButton;
