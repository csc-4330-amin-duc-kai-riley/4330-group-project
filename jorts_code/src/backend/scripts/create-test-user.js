const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const createTestUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    const testUser = await User.create({
      username: 'testuser',
      email: 'test@test.com',
      password: 'test123'
    });

    console.log('Test user created:', testUser);
    process.exit(0);
  } catch (error) {
    console.error('Error creating test user:', error);
    process.exit(1);
  }
};

createTestUser();