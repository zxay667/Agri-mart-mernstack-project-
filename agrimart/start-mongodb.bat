@echo off
echo AgriMart MongoDB Setup
echo ======================
echo.

echo Checking MongoDB service status...
sc query MongoDB > nul
if %ERRORLEVEL% EQU 0 (
    echo MongoDB service found.

    sc query MongoDB | findstr "RUNNING" > nul
    if %ERRORLEVEL% EQU 0 (
        echo MongoDB service is already running.
    ) else (
        echo Starting MongoDB service...
        net start MongoDB
        if %ERRORLEVEL% EQU 0 (
            echo MongoDB service started successfully.
        ) else (
            echo Failed to start MongoDB service. Please start it manually:
            echo 1. Press Win + R, type services.msc, and press Enter
            echo 2. Find "MongoDB Server" in the list
            echo 3. Right-click on it and select "Start"
            pause
            exit /b 1
        )
    )
) else (
    echo MongoDB service not found.
    echo Checking for MongoDB executable...

    if exist "C:\Program Files\MongoDB\Server\8.0\bin\mongod.exe" (
        echo MongoDB executable found. Trying to start MongoDB directly...
        echo.
        echo Starting MongoDB server...
        echo This will keep running in this window. Do not close it.
        echo.
        echo Press Ctrl+C to stop MongoDB when you're done using the application.
        echo.
        start "MongoDB Server" "C:\Program Files\MongoDB\Server\8.0\bin\mongod.exe" --dbpath="C:\data\db"
        echo MongoDB server started in a new window.
        goto mongodb_running
    ) else (
        echo MongoDB executable not found at the expected location.
        echo Please make sure MongoDB is installed correctly.
        echo.
        echo If MongoDB is installed in a non-standard location, you may need to:
        echo 1. Add MongoDB bin directory to your PATH
        echo 2. Configure MongoDB as a Windows service
        pause
        exit /b 1
    )
)

:mongodb_running
echo.
echo MongoDB is now running.
echo You can now set up the database and start the application.
echo.
echo Next steps:
echo 1. Open MongoDB Compass and connect to: mongodb://localhost:27017
echo 2. Follow the instructions in mongodb-guide.md to set up your database
echo 3. Start the backend: cd backend ^& npm run server
echo 4. Start the frontend: cd frontend ^& npm start
echo.
echo For detailed instructions, please read the mongodb-guide.md file.
echo.
pause
