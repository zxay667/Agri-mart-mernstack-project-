const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'agrimart';

async function main() {
  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log('Connected successfully to MongoDB server');
    
    // Get the database
    const db = client.db(dbName);
    console.log(`Connected to database: ${dbName}`);
    
    // List all collections
    const collections = await db.listCollections().toArray();
    console.log('Collections in the database:');
    collections.forEach(collection => {
      console.log(`- ${collection.name}`);
    });
    
    // Get users
    const users = await db.collection('users').find({}).toArray();
    console.log(`\nUsers (${users.length}):`);
    users.forEach(user => {
      console.log(`- ${user.name} (${user.email}), Admin: ${user.isAdmin}`);
    });
    
    // Get products
    const products = await db.collection('products').find({}).toArray();
    console.log(`\nProducts (${products.length}):`);
    products.forEach(product => {
      console.log(`- ${product.name} ($${product.price}), Category: ${product.category}, Stock: ${product.countInStock}`);
    });
    
    console.log('\nMongoDB verification complete!');
    console.log('Your MongoDB database is set up correctly and contains the necessary data.');
    
    return 'success';
  } catch (error) {
    console.error('Error connecting to MongoDB:');
    console.error(error);
    return 'error';
  } finally {
    // Close the connection
    await client.close();
    console.log('MongoDB connection closed');
  }
}

// Run the main function
main()
  .then(console.log)
  .catch(console.error);
