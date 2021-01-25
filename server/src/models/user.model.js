const mongoose = require('mongoose');
const { Schema } = mongoose

const userSchema = new Schema({
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  birthday: String,
  gender: String,
  reactions: {
    like: Number,
    dislike: Number,
    smile: Number,
    heart: Number,
  }
},
{
  collection: 'Users',
  timestamp: true,
});

module.exports = mongoose.model('User', userSchema);