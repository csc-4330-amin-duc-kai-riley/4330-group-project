const mongoose = require('mongoose');
require('dotenv').config();

const createTestUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Delete any existing test users
    await mongoose.connection.collection('users').deleteOne({ email: 'test@test.com' });
    
    // Create test user directly in the database to avoid double hashing
    const result = await mongoose.connection.collection('users').insertOne({
      username: 'testuser',
      email: 'test@test.com',
      password: '$2a$10$YourFixedHashHere',
      bio: '',
      followers: [],
      following: [],
      lastUploadDate: null,
      totalPosts: 0,
      joinDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    });

    console.log('Test user created with _id:', result.insertedId);
    
    // Now create a proper hash for 'password123'
    const bcrypt = require('bcryptjs');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);
    
    // Update the password directly
    await mongoose.connection.collection('users').updateOne(
      { _id: result.insertedId },
      { $set: { password: hashedPassword } }
    );
    
    console.log('Password updated successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error creating test user:', error);
    process.exit(1);
  }
};

createTestUser();