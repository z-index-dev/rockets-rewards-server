const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create user schema and model
const submissionSchema = new Schema({
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
  product_01: {
    type: Number
  },
  product_02: {
    type: Number
  },
  product_03: {
    type: Number
  },
  product_04: {
    type: Number
  },
  product_05: {
    type: Number
  },
  product_06: {
    type: Number
  },
  product_07: {
    type: Number
  },
  product_08: {
    type: Number
  },
  product_09: {
    type: Number
  },
  product_10: {
    type: Number
  },
  product_11: {
    type: Number
  },
  product_12: {
    type: Number
  },
  product_13: {
    type: Number
  },
  product_14: {
    type: Number
  },
  product_15: {
    type: Number
  },
  product_16: {
    type: Number
  },
  product_17: {
    type: Number
  }
});

const Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;