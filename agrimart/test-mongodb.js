const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'agrimart';

async function main() {
  console.log('Attempting to connect to MongoDB...');
  
  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log('Connected successfully to MongoDB server');
    
    // Get the database
    const db = client.db(dbName);
    console.log(`Connected to database: ${dbName}`);
    
    // Create a test collection
    const testCollection = db.collection('test');
    
    // Insert a test document
    const result = await testCollection.insertOne({ test: 'MongoDB is working!' });
    console.log(`Inserted test document with ID: ${result.insertedId}`);
    
    // Find the test document
    const findResult = await testCollection.findOne({ test: 'MongoDB is working!' });
    console.log('Found test document:');
    console.log(findResult);
    
    // Delete the test document
    await testCollection.deleteOne({ test: 'MongoDB is working!' });
    console.log('Test document deleted');
    
    console.log('MongoDB connection test completed successfully!');
    
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

main()
  .then(console.log)
  .catch(console.error);
