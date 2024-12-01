const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
require('dotenv').config();

const createTestUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Delete existing test user if exists
    await User.deleteOne({ email: 'test@test.com' });

    // Create new test user with pre-hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);
    
    const testUser = await User.create({
      username: 'testuser',
      email: 'test@test.com',
      password: hashedPassword
    });

    console.log('Test user created:', testUser);
    process.exit(0);
  } catch (error) {
    console.error('Error creating test user:', error);
    process.exit(1);
  }
};

createTestUser();