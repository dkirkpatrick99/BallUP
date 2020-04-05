const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//asian kyle

const UserSchema = new Schema({
    handle: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    first: {
      type: String,
      required: true,
      unique: true
    },
    second: {
      type: String,
      required: true,
      unique: true
    },
    third: {
      type: String,
      required: true,
      unique: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  })

  module.exports = User = mongoose.model('users', UserSchema);
