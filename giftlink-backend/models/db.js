// db.js
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

// MongoDB connection URL with authentication options
let url = `${process.env.MONGO_URL}`;

let dbInstance = null;
const dbName = "giftdb";  // Note: the lab mentions "giftDB" in the task description, but the code uses "giftdb" – keep as-is to match the template

async function connectToDatabase() {
    if (dbInstance) {
        return dbInstance;
    }

    const client = new MongoClient(url);

    try {
        // Task 1: Connect to MongoDB
        await client.connect();

        // Task 2: Connect to database giftDB and store in variable dbInstance
        dbInstance = client.db(dbName);

        // Task 3: Return database instance
        return dbInstance;
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        throw error;  // Re-throw so the app can handle failure gracefully
    }
}

module.exports = connectToDatabase;