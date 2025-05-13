@echo off
echo AgriMart Application Launcher
echo ===========================
echo.

echo Step 1: Checking MongoDB connection...
echo Make sure MongoDB is running on your system.
echo.
pause

echo Step 2: Seeding the database with sample data...
node mongodb-setup.js
echo.
pause

echo Step 3: Starting the backend server...
echo The backend will start on http://localhost:5000
echo.
echo Open a new terminal window and run:
echo cd agrimart/backend ^&^& npm run server
echo.
pause

echo Step 4: Starting the frontend application...
echo The frontend will start on http://localhost:3000
echo.
echo Open another terminal window and run:
echo cd agrimart/frontend ^&^& npm start
echo.
pause

echo AgriMart application should now be running!
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Sample user logins:
echo Admin: admin@example.com / 123456
echo User: john@example.com / 123456
echo.
pause
