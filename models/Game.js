const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const GameSchema = new Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    title: {
      type: String
    },
    location: {
      type: String,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    game_date: {
        type: String,
        required: true
    },
    players: {
      type: Array
    },
    date: {
      type: Date,
      default: Date.now
    },
    game_set: {
      type: Boolean
    },
    teams: {
      type: Array
    },
    teamNames: {
      type: Array
    }
  })

  module.exports = Game = mongoose.model('Game', GameSchema);