const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Post = require('../models/Post');
const PostPair = require('../models/PostPair');
const Vote = require('../models/Vote');

dotenv.config();

// All users including demo user
const testUsers = [
  {
    username: 'testuser',
    email: 'test@test.com',
    password: 'password123',
    bio: 'Fashion enthusiast | Style explorer',
  },
  {
    username: 'ethan',
    email: 'ethan@test.com',
    password: 'password123',
    bio: 'Keeping it casual and comfortable',
  },
  {
    username: 'noah',
    email: 'noah@test.com',
    password: 'password123',
    bio: 'Streetwear and classic styles',
  },
  {
    username: 'lucas',
    email: 'lucas@test.com',
    password: 'password123',
    bio: 'Modern minimalist style',
  },
  {
    username: 'mason',
    email: 'mason@test.com',
    password: 'password123',
    bio: 'Vintage meets modern',
  },
  {
    username: 'james',
    email: 'james@test.com',
    password: 'password123',
    bio: 'Simple and clean fits',
  },
  {
    username: 'emma',
    email: 'emma@test.com',
    password: 'password123',
    bio: 'Cozy and chic everyday',
  },
  {
    username: 'sophia',
    email: 'sophia@test.com',
    password: 'password123',
    bio: 'Minimalist fashion lover',
  },
  {
    username: 'olivia',
    email: 'olivia@test.com',
    password: 'password123',
    bio: 'Casual comfort first',
  },
  {
    username: 'ava',
    email: 'ava@test.com',
    password: 'password123',
    bio: 'Classic with a twist',
  },
  {
    username: 'isabella',
    email: 'isabella@test.com',
    password: 'password123',
    bio: 'Effortless everyday style',
  },
];

// Outfit posts with descriptions
const outfitPosts = [
  {
    username: 'emma',
    caption: 'Casual winter outfit🧥',
    imagePath: 'demo-images/outfit3.jpg',
    items: [
      { brand: 'Nautica', item: 'Cardigan', link: 'https://carhartt.com' },
      { brand: 'H&M', item: 'Basic White Tee', link: 'https://hm.com' },
      { brand: 'Levis', item: 'Baggy Jeans', link: 'https://dickies.com' },
    ],
  },
  {
    username: 'lucas',
    caption: 'Outfit to grab food ✨',
    imagePath: 'demo-images/outfit4.jpg',
    items: [
      { brand: 'Vintage', item: 'Jersey', link: 'https://urbanoutfitters.com' },
      { brand: 'Zara', item: 'Light Blue Jeans', link: 'https://zara.com' },
      { brand: 'Nike', item: 'Air Force 1s', link: 'https://drmartens.com' },
    ],
  },
  {
    username: 'ethan',
    caption: 'Simple summer fit☀️',
    imagePath: 'demo-images/outfit5.jpg',
    items: [
      { brand: 'Carhartt', item: 'Vest', link: 'https://nike.com' },
      { brand: 'Carhartt', item: 'Cargo Pants', link: 'https://champion.com' },
      { brand: 'Birkenston', item: 'Slippers', link: 'https://adidas.com' },
    ],
  },
  {
    username: 'noah',
    caption: 'Striped Outfit 🤍',
    imagePath: 'demo-images/outfit9.jpg',
    items: [
      { brand: 'Polo', item: 'Long Sleeve Shirt', link: 'https://aritzia.com' },
      { brand: 'Carhartt', item: 'Cargo Pants', link: 'https://uniqlo.com' },
      { brand: 'Timberland', item: 'Boots', link: 'https://ugg.com' },
    ],
  },
  {
    username: 'mason',
    caption: 'Calm Outfit 🌿',
    imagePath: 'demo-images/outfit6.jpg',
    items: [
      { brand: 'Uniqlo', item: 'Red Striped Shirt', link: 'https://uniqlo.com' },
      { brand: 'Zara', item: 'Cargo Shorts', link: 'https://zara.com' },
      { brand: 'Doc Marten', item: 'Classic Slip-ons', link: 'https://vans.com' },
    ],
  },
  {
    username: 'ava',
    caption: 'Casual cozy winter outfit 🖤',
    imagePath: 'demo-images/outfit8.jpg',
    items: [
      { brand: 'Adidas', item: 'Jacket', link: 'https://aritzia.com' },
      { brand: 'Lululemon', item: 'Black Leggings', link: 'https://lululemon.com' },
      { brand: 'UGG', item: 'Mini Boots', link: 'https://ugg.com' },
    ],
  },
  {
    username: 'james',
    caption: 'College comfort with hoodie and jeans 📚',
    imagePath: 'demo-images/outfit7.jpg',
    items: [
      { brand: 'Champion', item: 'Gray Hoodie', link: 'https://champion.com' },
      { brand: 'Levi\'s', item: 'Baggy Jeans', link: 'https://levis.com' },
      { brand: 'Nike', item: 'Air Force 1s', link: 'https://converse.com' },
    ],
  },
  {
    username: 'isabella',
    caption: 'Winter lounge wear 🤍',
    imagePath: 'demo-images/outfit10.jpg',
    items: [
      { brand: 'Nike Windbreaker', item: 'Jacket', link: 'https://aloyoga.com' },
      { brand: 'UGG', item: 'Slippers', link: 'https://ugg.com' },
    ],
  },
  {
    username: 'sophia',
    caption: 'Gameday outfit 🌊',
    imagePath: 'demo-images/outfit1.jpg',
    items: [
      { brand: 'Greenbay', item: 'Jersey', link: 'https://uniqlo.com' },
      { brand: 'Levis', item: 'Jorts', link: 'https://levis.com' },
      { brand: 'Adidas', item: 'Sambas', link: 'https://nike.com' },
    ],
  },
  {
    username: 'olivia',
    caption: 'Neutral layers for fall 🍂',
    imagePath: 'demo-images/outfit2.jpg',
    items: [
      { brand: 'Nautica', item: 'Cream Cardigan', link: 'https://aritzia.com' },
      { brand: 'Zara', item: 'Baggy Jeans', link: 'https://zara.com' },
      { brand: 'Adidas', item: 'Sambas', link: 'https://stevemadden.com' },
    ],
  },
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear ALL existing data
    await User.deleteMany({});
    await Post.deleteMany({});
    await PostPair.deleteMany({});
    await Vote.deleteMany({});
    console.log('Cleared all existing data');

    // Create users
    const createdUsers = await User.create(testUsers);
    console.log('Created test users');

    // Create posts
    const posts = await Promise.all(
      outfitPosts.map(async (post, index) => {
        const user = createdUsers.find(u => u.username === post.username);
        const newPost = await Post.create({
          userId: user._id,
          image: post.imagePath,
          caption: post.caption,
          items: post.items,
          votes: 0,
        });
        return newPost;
      })
    );
    console.log('Created outfit posts');

    // Create pairs
    const pairs = [];
    for (let i = 0; i < 10; i += 2) {
      const pair = await PostPair.create({
        post1: posts[i]._id,
        post2: posts[i + 1]._id,
        post1Votes: 0,
        post2Votes: 0,
        active: true,
      });
      pairs.push(pair);
    }
    console.log('Created outfit pairs with zero votes');

    console.log('\n=== Database Seed Summary ===');
    console.log('Users created:', createdUsers.length);
    console.log('Posts created:', posts.length);
    console.log('Pairs created:', pairs.length);
    console.log('\nTest user credentials:');
    console.log('Username: testuser');
    console.log('Password: password123');

    // Verify votes are reset
    const voteCount = await Vote.countDocuments();
    const pairVotes = await PostPair.find({}, 'post1Votes post2Votes');
    console.log('\n=== Vote Verification ===');
    console.log('Total votes in system:', voteCount);
    console.log('Pair vote counts:', pairVotes.map(p => ({
      pair: p._id,
      post1Votes: p.post1Votes,
      post2Votes: p.post2Votes
    })));

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();