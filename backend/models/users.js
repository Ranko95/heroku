const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  about: String,
  avatar: String,
  googleId: String,
  facebookId: String,
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
});
const User = mongoose.model('User', userSchema);

module.exports = {
  User,
  userSchema,
}
