const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// MongoDB connection string - change this to your MongoDB connection string
const uri = 'mongodb://localhost:27017/agrimart';

// Sample users data
const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: '$2a$10$ij4H1fUVZ.Yx9yrwuXKOOOKQedlRiJ8zt.Mw0Yh6l.K04tVEJZUcW', // 123456
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: '$2a$10$ij4H1fUVZ.Yx9yrwuXKOOOKQedlRiJ8zt.Mw0Yh6l.K04tVEJZUcW', // 123456
    isAdmin: false,
  },
  {
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: '$2a$10$ij4H1fUVZ.Yx9yrwuXKOOOKQedlRiJ8zt.Mw0Yh6l.K04tVEJZUcW', // 123456
    isAdmin: false,
  },
];

// Sample products data
const products = [
  {
    name: 'Premium Garden Trowel',
    image: '/images/trowel.jpg',
    description:
      'High-quality stainless steel garden trowel with ergonomic handle. Perfect for planting, transplanting, and weeding.',
    brand: 'GardenPro',
    category: 'Tools',
    price: 19.99,
    countInStock: 10,
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: 'Organic Tomato Seeds',
    image: '/images/tomato-seeds.jpg',
    description:
      'Certified organic heirloom tomato seeds. Produces large, juicy tomatoes perfect for salads and cooking.',
    brand: 'SeedMaster',
    category: 'Seeds',
    price: 4.99,
    countInStock: 25,
    rating: 4.0,
    numReviews: 8,
  },
  {
    name: 'All-Purpose Organic Fertilizer',
    image: '/images/fertilizer.jpg',
    description:
      'Balanced NPK formula suitable for all plants. Made from organic materials for sustainable gardening.',
    brand: 'GrowWell',
    category: 'Fertilizers',
    price: 24.99,
    countInStock: 15,
    rating: 4.8,
    numReviews: 15,
  },
  {
    name: 'Heavy-Duty Garden Hoe',
    image: '/images/hoe.jpg',
    description:
      'Durable garden hoe with carbon steel blade and hardwood handle. Ideal for breaking up soil and removing weeds.',
    brand: 'GardenPro',
    category: 'Tools',
    price: 34.99,
    countInStock: 8,
    rating: 4.2,
    numReviews: 10,
  },
  {
    name: 'Organic Carrot Seeds',
    image: '/images/carrot-seeds.jpg',
    description:
      'Organic non-GMO carrot seeds. Produces sweet, crunchy carrots rich in vitamins and minerals.',
    brand: 'SeedMaster',
    category: 'Seeds',
    price: 3.99,
    countInStock: 30,
    rating: 4.3,
    numReviews: 7,
  },
  {
    name: 'Soil pH Testing Kit',
    image: '/images/ph-kit.jpg',
    description:
      'Accurate soil pH testing kit to ensure optimal growing conditions for your plants. Easy to use with quick results.',
    brand: 'SoilSense',
    category: 'Tools',
    price: 15.99,
    countInStock: 20,
    rating: 4.1,
    numReviews: 9,
  },
];

// Function to check if MongoDB service is running
function checkMongoDBService() {
  return new Promise((resolve, reject) => {
    exec('sc query MongoDB', (error, stdout, stderr) => {
      if (error) {
        console.log('MongoDB service not found or not accessible.');
        console.log('Please make sure MongoDB is installed and the service is running.');
        resolve(false);
        return;
      }

      if (stdout.includes('RUNNING')) {
        console.log('MongoDB service is running.');
        resolve(true);
      } else {
        console.log('MongoDB service is installed but not running.');
        console.log('Please start the MongoDB service:');
        console.log('1. Press Win + R, type services.msc, and press Enter');
        console.log('2. Find "MongoDB Server" in the list');
        console.log('3. Right-click on it and select "Start"');
        resolve(false);
      }
    });
  });
}

// Function to seed the database
async function seedDatabase() {
  console.log('Checking MongoDB service...');
  const isMongoDBRunning = await checkMongoDBService();

  if (!isMongoDBRunning) {
    console.log('Please start MongoDB service before continuing.');
    console.log('After starting the service, run this script again.');
    return;
  }

  console.log('Connecting to MongoDB...');
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db();

    // Clear existing collections
    console.log('Clearing existing collections...');
    await db.collection('users').deleteMany({});
    await db.collection('products').deleteMany({});
    await db.collection('orders').deleteMany({});

    // Insert users
    console.log('Inserting users...');
    const insertedUsers = await db.collection('users').insertMany(users);
    console.log(`${insertedUsers.insertedCount} users inserted`);

    // Get admin user ID
    const adminUser = insertedUsers.insertedIds[0];

    // Add user reference to products
    const productsWithUser = products.map(product => ({
      ...product,
      user: adminUser,
      reviews: [],
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    // Insert products
    console.log('Inserting products...');
    const insertedProducts = await db.collection('products').insertMany(productsWithUser);
    console.log(`${insertedProducts.insertedCount} products inserted`);

    console.log('\n===================================================');
    console.log('Database seeded successfully!');
    console.log('===================================================\n');
    console.log('You can now run the application with:');
    console.log('1. Start the backend: cd agrimart/backend && npm run server');
    console.log('2. Start the frontend: cd agrimart/frontend && npm start');
    console.log('\nSample user logins:');
    console.log('Admin: admin@example.com / 123456');
    console.log('User: john@example.com / 123456');
    console.log('\nTo access MongoDB data:');
    console.log('1. Install MongoDB Compass from https://www.mongodb.com/products/compass');
    console.log('2. Connect to: mongodb://localhost:27017');
    console.log('3. Browse the "agrimart" database');

  } catch (error) {
    console.error('Error seeding database:', error);
    console.log('\nTroubleshooting tips:');
    console.log('1. Make sure MongoDB service is running');
    console.log('2. Check if MongoDB is accessible at localhost:27017');
    console.log('3. Ensure you have proper permissions to access MongoDB');
  } finally {
    if (client) {
      await client.close();
      console.log('MongoDB connection closed');
    }
  }
}

// Run the seeding function
seedDatabase().catch(console.error);
