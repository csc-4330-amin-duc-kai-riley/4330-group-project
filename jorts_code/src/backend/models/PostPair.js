const mongoose = require('mongoose');

const postPairSchema = new mongoose.Schema({
  post1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  post2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  post1Votes: {
    type: Number,
    default: 0
  },
  post2Votes: {
    type: Number,
    default: 0
  },
  active: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const PostPair = mongoose.model('PostPair', postPairSchema);

module.exports = PostPair;