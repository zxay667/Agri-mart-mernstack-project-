const { MongoClient } = require('mongodb');

// Connection URL - change this if your MongoDB is running on a different host/port
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'agrimart';

async function connectToMongoDB() {
  try {
    console.log('Attempting to connect to MongoDB...');
    await client.connect();
    console.log('Connected successfully to MongoDB server');
    
    const db = client.db(dbName);
    console.log(`Connected to database: ${dbName}`);
    
    // List all collections in the database
    const collections = await db.listCollections().toArray();
    console.log('Collections in the database:');
    collections.forEach(collection => {
      console.log(`- ${collection.name}`);
    });
    
    // Create a sample collection and insert data if the database is empty
    if (collections.length === 0) {
      console.log('Database is empty. Creating sample data...');
      
      // Create users collection with a sample admin user
      const usersCollection = db.collection('users');
      const adminUser = {
        name: 'Admin User',
        email: 'admin@example.com',
        password: '$2a$10$ij4H1fUVZ.Yx9yrwuXKOOOKQedlRiJ8zt.Mw0Yh6l.K04tVEJZUcW', // 123456
        isAdmin: true,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      const userResult = await usersCollection.insertOne(adminUser);
      console.log(`Created admin user with ID: ${userResult.insertedId}`);
      
      // Create products collection with a sample product
      const productsCollection = db.collection('products');
      const sampleProduct = {
        name: 'Premium Garden Trowel',
        image: '/images/trowel.jpg',
        description: 'High-quality stainless steel garden trowel with ergonomic handle.',
        brand: 'GardenPro',
        category: 'Tools',
        price: 19.99,
        countInStock: 10,
        rating: 4.5,
        numReviews: 12,
        user: userResult.insertedId,
        reviews: [],
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      const productResult = await productsCollection.insertOne(sampleProduct);
      console.log(`Created sample product with ID: ${productResult.insertedId}`);
    }
    
    console.log('\nMongoDB connection test completed successfully!');
    console.log('\nYou can now run the AgriMart application with:');
    console.log('1. Start the backend: cd agrimart/backend && npm run server');
    console.log('2. Start the frontend: cd agrimart/frontend && npm start');
    console.log('\nSample user login:');
    console.log('Email: admin@example.com');
    console.log('Password: 123456');
    
  } catch (error) {
    console.error('Error connecting to MongoDB:');
    console.error(error);
    
    console.log('\nTroubleshooting tips:');
    console.log('1. Make sure MongoDB is installed and running');
    console.log('2. Check if MongoDB is running on localhost:27017');
    console.log('3. If using a different host/port, update the connection URL in this script');
    console.log('4. Make sure you have the necessary permissions to access MongoDB');
    
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

connectToMongoDB().catch(console.error);
