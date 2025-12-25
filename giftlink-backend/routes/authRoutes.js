const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { connectToDatabase } = require('../db');
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const logger = console; // replace with your logger if you have one

// REGISTER endpoint
router.post('/register', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('users');

        const { firstName, lastName, email, password } = req.body;

        const existingUser = await collection.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        const newUser = {
            firstName,
            lastName,
            email,
            password: hashedPassword,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const result = await collection.insertOne(newUser);

        const payload = { user: { id: result.insertedId.toString() } };
        const authtoken = jwt.sign(payload, JWT_SECRET);

        res.json({ authtoken, userName: firstName, userEmail: email });
    } catch (e) {
        logger.error(e);
        res.status(500).send('Internal server error');
    }
});

// LOGIN endpoint
router.post('/login', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('users');

        const theUser = await collection.findOne({ email: req.body.email });

        if (!theUser) {
            logger.error('User not found');
            return res.status(404).json({ error: 'User not found' });
        }

        const passwordMatch = await bcryptjs.compare(req.body.password, theUser.password);
        if (!passwordMatch) {
            logger.error('Passwords do not match');
            return res.status(404).json({ error: 'Wrong password' });
        }

        const payload = { user: { id: theUser._id.toString() } };
        const authtoken = jwt.sign(payload, JWT_SECRET);

        res.json({ authtoken, userName: theUser.firstName, userEmail: theUser.email });
    } catch (e) {
        logger.error(e);
        res.status(500).send('Internal server error');
    }
});

// UPDATE endpoint
router.put('/update', [
    body('firstName').optional().isString(),
    body('lastName').optional().isString(),
    body('password').optional().isLength({ min: 6 }),
], async (req, res) => {
    // Task 2: Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.error('Validation errors in update request', errors.array());
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Task 3: Check if email is present in header
        const email = req.headers.email;
        if (!email) {
            logger.error('Email not found in the request headers');
            return res.status(400).json({ error: 'Email not found in the request headers' });
        }

        // Task 4: Connect to MongoDB
        const db = await connectToDatabase();
        const collection = db.collection('users');

        // Task 5: Find user in database
        const existingUser = await collection.findOne({ email });
        if (!existingUser) {
            logger.error('User not found');
            return res.status(404).json({ error: 'User not found' });
        }

        // Update fields if provided
        if (req.body.firstName) existingUser.firstName = req.body.firstName;
        if (req.body.lastName) existingUser.lastName = req.body.lastName;
        if (req.body.password) {
            existingUser.password = await bcryptjs.hash(req.body.password, 10);
        }
        existingUser.updatedAt = new Date();

        // Task 6: Update user in DB
        const updatedUser = await collection.findOneAndUpdate(
            { email },
            { $set: existingUser },
            { returnDocument: 'after' }
        );

        // Task 7: Create JWT
        const payload = { user: { id: updatedUser.value._id.toString() } };
        const authtoken = jwt.sign(payload, JWT_SECRET);

        res.json({ authtoken, userName: updatedUser.value.firstName, userEmail: updatedUser.value.email });
    } catch (e) {
        logger.error(e);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;
