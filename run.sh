#!/usr/bin/env bash

# Start backend server
cd ./backend
python3 main.py &

# Start frontend server
cd ../frontend
npm start
