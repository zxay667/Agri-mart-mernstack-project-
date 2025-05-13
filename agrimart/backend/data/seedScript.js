import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './users.js';
import products from './products.js';
import User from '../models/userModel.js';
import Product from '../models/productModel.js';
import Order from '../models/orderModel.js';
import connectDB from '../config/db.js';

dotenv.config();

// Connect to MongoDB Atlas
const connectToMongoDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
    return true;
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold);
    return false;
  }
};

// Import sample data
const importData = async () => {
  try {
    // Clear existing data
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // Insert users
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    // Insert products with admin user as creator
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });
    await Product.insertMany(sampleProducts);

    console.log('Data Imported!'.green.inverse);
    return true;
  } catch (error) {
    console.error(`${error}`.red.inverse);
    return false;
  }
};

// Main function to seed the database
const seedDatabase = async () => {
  // Connect to MongoDB
  const isConnected = await connectToMongoDB();
  if (!isConnected) {
    console.error('Failed to connect to MongoDB. Check your connection string.'.red.bold);
    return false;
  }

  // Import data
  const isImported = await importData();
  if (!isImported) {
    console.error('Failed to import data.'.red.bold);
    return false;
  }

  console.log('Database seeded successfully!'.green.bold);
  return true;
};

// Run the seeding process
seedDatabase()
  .then((success) => {
    if (success) {
      console.log('You can now run the application.'.cyan);
    } else {
      console.log('Please fix the issues before running the application.'.yellow);
    }
    process.exit();
  })
  .catch((error) => {
    console.error(`Unexpected error: ${error.message}`.red.bold);
    process.exit(1);
  });
