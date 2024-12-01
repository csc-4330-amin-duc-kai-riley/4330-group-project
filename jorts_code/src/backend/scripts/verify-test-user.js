const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
require('dotenv').config();

const verifyTestUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Find the test user
    const user = await User.findOne({ email: 'test@test.com' });
    console.log('Found user:', user);

    if (user) {
      // Test password comparison
      const testPassword = 'password123';
      const isMatch = await bcrypt.compare(testPassword, user.password);
      console.log('Password match result:', isMatch);
      
      // Create a new hashed password for verification
      const salt = await bcrypt.genSalt(10);
      const newHashedPassword = await bcrypt.hash(testPassword, salt);
      
      // Update user with new password
      user.password = newHashedPassword;
      await user.save();
      
      console.log('Updated user password');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

verifyTestUser();