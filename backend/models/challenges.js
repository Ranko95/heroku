const mongoose = require('mongoose');
const { userSchema } = require('./users');
const { commentSchema } = require('./comments');

const challengeSchema = new mongoose.Schema({
  title: String,
  description: String,
  hashtags: Array,
  url: String,
  likes: Array,
  date: String,
  user: userSchema,
  original: Boolean,
  comments: [commentSchema],
});

const Challenge = mongoose.model('Challenge', challengeSchema);

module.exports = {
  Challenge,
  challengeSchema
}
