type Props = {
  board: number[][];
  setBoard: (newBoard: number[][]) => void;
};

const SudokuBoard: React.FC<Props> = ({ board, setBoard }) => {
  const handleChange = (row: number, col: number, value: string) => {
    const newBoard = board.map((r) => [...r]);
    const num = parseInt(value);
    if (!isNaN(num) && num >= 1 && num <= 9) {
      newBoard[row][col] = num;
    } else if (value === "") {
      newBoard[row][col] = 0;
    }
    setBoard(newBoard);
  };

  return (
    <div className="grid grid-cols-9 gap-1 max-w-fit mx-auto mt-4">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <input
            key={`${rowIndex}-${colIndex}`}
            className="w-10 h-10 text-center border border-gray-400"
            type="text"
            maxLength={1}
            value={cell === 0 ? "" : cell}
            onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
          />
        ))
      )}
    </div>
  );
};

export default SudokuBoard;
