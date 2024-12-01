const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Post = require('../models/Post');

dotenv.config();

const testUsers = [
  {
    username: 'style_master',
    email: 'style@test.com',
    password: 'password123',
    bio: 'Fashion enthusiast | Style blogger',
  },
  {
    username: 'trend_setter',
    email: 'trend@test.com',
    password: 'password123',
    bio: 'Exploring fashion one outfit at a time',
  },
  {
    username: 'fashion_guru',
    email: 'fashion@test.com',
    password: 'password123',
    bio: 'Creating looks that inspire',
  },
];

const outfitItems = [
  [
    { brand: 'Nike', item: 'Air Force 1', link: 'https://nike.com' },
    { brand: "Levi's", item: '501 Jeans', link: 'https://levis.com' },
    { brand: 'Uniqlo', item: 'White T-Shirt', link: 'https://uniqlo.com' },
  ],
  [
    { brand: 'Adidas', item: 'Stan Smith', link: 'https://adidas.com' },
    { brand: 'Zara', item: 'Black Jeans', link: 'https://zara.com' },
    { brand: 'H&M', item: 'Denim Jacket', link: 'https://hm.com' },
  ],
  [
    { brand: 'Converse', item: 'Chuck 70', link: 'https://converse.com' },
    { brand: 'Uniqlo', item: 'Chino Pants', link: 'https://uniqlo.com' },
    { brand: 'Patagonia', item: 'Fleece Jacket', link: 'https://patagonia.com' },
  ],
];

const captions = [
  'Casual day out vibes 🌟',
  'Weekend ready fit check ✨',
  'Street style inspiration 🔥',
  'mixing comfort and style today 👌',
  'Fall layers done right 🍂',
  'keeping it simple but stylish 💫',
  'urban exploration fit 🌆',
  'coffee run outfit ☕',
  'sunday brunch look 🥂',
  'casual office vibes 💼',
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Post.deleteMany({});

    // Create users
    const createdUsers = await User.create(testUsers);
    console.log('Created test users');

    // Create posts
    const posts = [];
    for (let i = 0; i < 10; i++) {
      const post = {
        userId: createdUsers[i % createdUsers.length]._id,
        image: `/api/placeholder/400/${500 + i}`, // Different sized placeholders
        caption: captions[i],
        items: outfitItems[i % outfitItems.length],
        votes: Math.floor(Math.random() * 50), // Random initial votes
        uploadDate: new Date(Date.now() - i * 24 * 60 * 60 * 1000), // Posts from different days
      };
      posts.push(post);
    }

    await Post.create(posts);
    console.log('Created test posts');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();