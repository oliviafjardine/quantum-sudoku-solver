from typing import List
from .quantum_utils import quantum_digit_order


def is_valid(board: List[List[int]], row: int, col: int, num: int) -> bool:
    # Check row and column
    for i in range(9):
        if board[row][i] == num or board[i][col] == num:
            return False
    # Check 3x3 box
    start_row = 3 * (row // 3)
    start_col = 3 * (col // 3)
    for r in range(start_row, start_row + 3):
        for c in range(start_col, start_col + 3):
            if board[r][c] == num:
                return False
    return True


def find_empty_cell(board: List[List[int]]):
    for r in range(9):
        for c in range(9):
            if board[r][c] == 0:
                return r, c
    return None


def solve_with_quantum(board: List[List[int]]) -> List[List[int]]:
    board_copy = [row[:] for row in board]

    def backtrack():
        empty = find_empty_cell(board_copy)
        if not empty:
            return True
        row, col = empty
        digits = quantum_digit_order()

        for num in digits:
            if is_valid(board_copy, row, col, num):
                board_copy[row][col] = num
                if backtrack():
                    return True
                board_copy[row][col] = 0
        return False

    if backtrack():
        return board_copy
    else:
        raise ValueError("No solution found")
