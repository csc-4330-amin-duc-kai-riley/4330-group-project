const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const users = []; // In-memory storage for users (for demo purposes)
const upload = multer({ dest: 'uploads/' }); // Folder for uploads

// Root route to handle GET /
app.get('/', (req, res) => {
  res.send('Backend API is running!');
});

// User Authentication Routes (Signup & Login)
const generateToken = (user) => jwt.sign({ id: user.id }, 'secretKey', { expiresIn: '1h' });

app.post('/signup', async (req, res) => {
  const { email, password, publicProfile } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: users.length + 1, email, password: hashedPassword, publicProfile };
  users.push(newUser);
  const token = generateToken(newUser);
  res.json({ token, user: newUser });
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);
  if (!user) return res.status(400).json({ message: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

  const token = generateToken(user);
  res.json({ token, user });
});

// Image Upload Route
app.post('/upload', upload.single('fitPic'), (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded.');
  res.send({ filePath: req.file.path });
});

// Voting Route
app.post('/vote', (req, res) => {
  const { fit1, fit2, selectedFit } = req.body;
  res.send({ message: `You voted for ${selectedFit}` });
});

// Leaderboard Route
app.get('/leaderboard', (req, res) => {
  res.json({ leaderboard: [{ outfitName: 'Outfit A' }, { outfitName: 'Outfit B' }] });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



// node index.js 
//to start backend, have to run this command in backend folder, so split the terminal

// in jorts-app folder, 
//npm start

