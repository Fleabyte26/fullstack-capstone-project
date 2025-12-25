// giftlink-backend/db.js
const { MongoClient } = require('mongodb');

let cachedDb = null;

/**
 * Connects to MongoDB and returns the db instance.
 * Uses cached connection to improve performance.
 */
async function connectToDatabase() {
  if (cachedDb) return cachedDb;

  try {
    // Use the environment variable from your .env file
    const mongoUri = process.env.MONGO_URL;

    if (!mongoUri) {
      throw new Error('MONGO_URL is not defined in environment variables');
    }

    const client = await MongoClient.connect(mongoUri, {
      useUnifiedTopology: true,
    });

    const db = client.db('giftsdb'); // use giftsdb database
    cachedDb = db;
    console.log('Connected to MongoDB successfully');
    return db;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    throw error;
  }
}

module.exports = { connectToDatabase };
