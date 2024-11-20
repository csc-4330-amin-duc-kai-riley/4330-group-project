const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import routes
const userRoutes = require('./routes/users');
const voteRoutes = require('./routes/votes');
const commentRoutes = require('./routes/comments');
const uploadRoutes = require('./routes/uploads');
const userProfileRoutes = require('./routes/userProfiles');
const sessionRoutes = require('./routes/sessions');
const outfitComparisonRoutes = require('./routes/outfitComparisons');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Mount routes
app.use('/users', userRoutes);
app.use('/votes', voteRoutes);
app.use('/comments', commentRoutes);
app.use('/uploads', uploadRoutes);
app.use('/profiles', userProfileRoutes);
app.use('/sessions', sessionRoutes);
app.use('/outfits', outfitComparisonRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
