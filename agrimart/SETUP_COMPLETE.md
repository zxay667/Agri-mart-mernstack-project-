# AgriMart Setup Complete

Congratulations! Your MongoDB database has been set up successfully for the AgriMart application.

## What's Been Done

1. **MongoDB Connection**: 
   - MongoDB is now running on your system
   - The database `agrimart` has been created
   - Collections have been created: `users`, `products`, `orders`

2. **Sample Data**:
   - Admin user has been created
   - Sample products have been added to the database

## How to Run the Application

1. **Start MongoDB** (if it's not already running):
   - Run the MongoDB server:
   ```
   "C:\Program Files\MongoDB\Server\8.0\bin\mongod.exe" --dbpath="C:\data\db"
   ```

2. **Start the Backend**:
   - Navigate to the backend directory:
   ```
   cd agrimart/backend
   ```
   - Install dependencies (if not already installed):
   ```
   npm install
   ```
   - Start the server:
   ```
   npm run server
   ```
   - The backend will run on http://localhost:5000

3. **Start the Frontend**:
   - Navigate to the frontend directory:
   ```
   cd agrimart/frontend
   ```
   - Install dependencies (if not already installed):
   ```
   npm install
   ```
   - Start the application:
   ```
   npm start
   ```
   - The frontend will run on http://localhost:3000

4. **Quick Start**:
   - Alternatively, you can use the provided batch file to start everything:
   ```
   start-app.bat
   ```

## Accessing the Application

- Open your browser and go to: http://localhost:3000
- Log in with the following credentials:
  - Email: admin@example.com
  - Password: 123456

## Exploring the Database

You can explore your MongoDB database using the MongoDB shell:

1. Open a new terminal
2. Run the MongoDB shell:
   ```
   "C:\Program Files\MongoDB\Server\8.0\bin\mongosh.exe"
   ```
3. Switch to the agrimart database:
   ```
   use agrimart
   ```
4. View collections:
   ```
   show collections
   ```
5. View users:
   ```
   db.users.find().pretty()
   ```
6. View products:
   ```
   db.products.find().pretty()
   ```

## Troubleshooting

If you encounter any issues:

1. **MongoDB Connection Issues**:
   - Make sure MongoDB is running
   - Check if the data directory exists: `C:\data\db`

2. **Application Startup Issues**:
   - Make sure all dependencies are installed
   - Check for any error messages in the console

3. **Database Access Issues**:
   - Verify the connection string in `backend/.env`: `MONGO_URI=mongodb://localhost:27017/agrimart`

## Next Steps

Now that your AgriMart application is set up, you can:

1. Add more products to the database
2. Create additional user accounts
3. Explore the application features
4. Customize the application to your needs

Enjoy using AgriMart!
