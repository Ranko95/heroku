const mongoose = require('mongoose');
const { userSchema } = require('../models/users')

const commentSchema = new mongoose.Schema({
  user: userSchema,
  text: String,
  date: String,
  likes: Number,
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = {
  Comment,
  commentSchema
}
