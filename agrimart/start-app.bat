@echo off
echo AgriMart Application Starter
echo ==========================
echo.

echo Step 1: Checking if MongoDB is running...
tasklist /FI "IMAGENAME eq mongod.exe" | find "mongod.exe" > nul
if %ERRORLEVEL% EQU 0 (
    echo MongoDB is running.
) else (
    echo MongoDB is not running. Starting MongoDB...
    start "MongoDB Server" "C:\Program Files\MongoDB\Server\8.0\bin\mongod.exe" --dbpath="C:\data\db"
    echo MongoDB server started in a new window.
    echo Please wait a moment for MongoDB to initialize...
    timeout /t 5 > nul
)

echo.
echo Step 2: Starting the backend server...
echo The backend will run on http://localhost:5000
echo.
start "AgriMart Backend" cmd /k "cd backend && npm run server"
echo Backend server started in a new window.
echo Please wait a moment for the backend to initialize...
timeout /t 5 > nul

echo.
echo Step 3: Starting the frontend application...
echo The frontend will run on http://localhost:3000
echo.
start "AgriMart Frontend" cmd /k "cd frontend && npm start"
echo Frontend application started in a new window.

echo.
echo AgriMart application is now running!
echo.
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Sample user login:
echo Email: admin@example.com
echo Password: 123456
echo.
echo Press any key to exit this window. The application will continue running.
pause > nul
