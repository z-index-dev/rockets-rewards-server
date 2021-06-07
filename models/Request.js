const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create user schema and model
const requestSchema = new Schema({
  accountNumber: {
    type: String
  },
  uuid: {
    type: String
  },
  companyName: {
    type: String
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  }, 
  rep: {
    type: String
  },
  totalPoints: {
    type: Number
  },
  'product-01': {
    type: Number
  },
  'product-02': {
    type: Number
  },
  'product-03': {
    type: Number
  },
  'product-04': {
    type: Number
  },
  'product-05': {
    type: Number
  },
  'product-06': {
    type: Number
  },
  'product-07': {
    type: Number
  },
  'product-08': {
    type: Number
  },
  'product-09': {
    type: Number
  },
  'product-10': {
    type: Number
  },
  'product-11': {
    type: Number
  },
  'product-12': {
    type: Number
  },
  'product-13': {
    type: Number
  },
  'product-14': {
    type: Number
  },
  'product-15': {
    type: Number
  },
  'product-16': {
    type: Number
  }
});

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;