const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create user schema and model
const userSchema = new Schema({
  companyName: {
    type: String
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  companyFirstName: {
    type: String
  },
  companyLastName: {
    type: String
  },
  accountNumber: {
    type: String
  },
  priorityNumber: {
    type: String
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
  csr: {
    type: String
  },
  planType: {
    type: String
  }
});

// ! - Add ability to create links here
const User = mongoose.model('User', userSchema);

module.exports = User;