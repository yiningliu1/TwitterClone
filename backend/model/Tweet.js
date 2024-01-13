const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tweetSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  date: { 
    type: Date, 
    default: Date.now()
  },
  tweet: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('Tweet', tweetSchema);