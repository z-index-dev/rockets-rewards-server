const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create user schema and model
const UserSchema = new Schema({
  company: {
    type: String
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  address: {
    type: String
  },
  city: {
    type: String
  }, 
  state: {
    type: String
  },
  zip: {
    type: String
  },
  accountNumer: {
    type: String
  },
  priorityNumber: {
    type: Number
  },
  tenure: {
    type: Number
  },
  seatQt: {
    type: Number
  },
  priceLevel: {
    type: Number
  },
  ticketUsage: {
    type: Number
  },
  bonusPoints: {
    type: Number
  },
  totalPoints: {
    type: Number
  },
  rep: {
    type: String
  },
  planType: {
    type: String
  },
  phone: {
    type: Number
  },
  email: {
    type: String
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;