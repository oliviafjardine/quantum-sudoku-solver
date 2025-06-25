from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.models import SudokuBoardRequest, SudokuSolutionResponse
from app.sudoku_solver import solve_with_quantum

app = FastAPI()

# Allow CORS from frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/solve", response_model=SudokuSolutionResponse)
async def solve_sudoku(board_req: SudokuBoardRequest):
    try:
        solution = solve_with_quantum(board_req.grid)
        return {"solution": solution}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
