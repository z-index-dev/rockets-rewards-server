const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create user schema and model
const itemsSchema = new Schema({
  itemID: {
    type: String
  },
  title: {
    type: String
  },
  value: {
    type: Number
  },
  isPremium: {
    type: Boolean
  },
  isRegular: {
    type: Boolean
  }
});

const Items = mongoose.model('User', itemsSchema);

module.exports = Items;