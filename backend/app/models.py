from pydantic import BaseModel
from typing import List


class SudokuBoardRequest(BaseModel):
    grid: List[List[int]]  # 9x9 grid


class SudokuSolutionResponse(BaseModel):
    solution: List[List[int]]
