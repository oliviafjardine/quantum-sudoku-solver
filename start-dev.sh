# Start backend
echo "Starting backend (FastAPI)..."
cd backend
# Run backend in background with reload
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000 &

# Start frontend
echo "Starting frontend (Vite)..."
cd ../frontend
npm run dev
