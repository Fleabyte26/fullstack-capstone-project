/// giftlink-backend/models/db.js
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return cachedDb;
  }

  try {
    const client = await MongoClient.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = client.db('giftsdb');
    cachedClient = client;
    cachedDb = db;
    console.log('Connected to MongoDB');
    return db;
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
  }
}

module.exports = connectToDatabase;
