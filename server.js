const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;

// Schema variables
const User = require('./models/User');
const Submission = require('./models/Submission');
const { request } = require('express');

app.use(express.json());
app.use(cors());

app.use(express.urlencoded({extended: true}));

mongoose.connect('mongodb+srv://zachshelton:rewards@cluster0.evwdm.mongodb.net/rockets-rewards?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on('error', () => console.log('Error connecting to db'));
db.once('open', () => console.log('Connected to db'));

app.post('/submit', async (req, res) => {
  const submission = new Submission(req.body);
  const requests = db.collection('requests');
  const users = db.collection('users');
  // const items = db.collection('items');
  const availableItems = [
    {
      "productID": "product_01",
      "itemValue": 500
    },
    {
      "productID": "product_02",
      "itemValue": 4000
    },
    {
      "productID": "product_03",
      "itemValue": 5000
    },
    {
      "productID": "product_04",
      "itemValue": 6000
    },
    {
      "productID": "product_05",
      "itemValue": 7000
    },
    {
      "productID": "product_06",
      "itemValue": 8000
    },
    {
      "productID": "product_07",
      "itemValue": 9000
    },
    {
      "productID": "product_08",
      "itemValue": 9000
    },
    {
      "productID": "product_09",
      "itemValue": 10000
    },
    {
      "productID": "product_10",
      "itemValue": 10000
    },
    {
      "productID": "product_11",
      "itemValue": 10000
    },
    {
      "productID": "product_12",
      "itemValue": 11000
    },
    {
      "productID": "product_13",
      "itemValue": 11000
    },
    {
      "productID": "product_14",
      "itemValue": 12000
    },
    {
      "productID": "product_15",
      "itemValue": 12000
    },
    {
      "productID": "product_16",
      "itemValue": 12000
    }
  ];

  let validUser = await User.findOne({ _id: req.body.uuid });

  if (validUser) {
    // Check if totalPoints fields match
    if (validUser.totalPoints == req.body.totalPoints) {
      console.log('totalPoints are good');
    }
  }

  // This returns whole record as array
  // items.find({}).toArray(function(err, result) {
  //   if (err) throw err;
  //   itemsArray = result;
  // });

  try {
    const query = { uuid: submission.uuid };
    const update = { $set: { accountNumber: submission.accountNumber, uuid: submission.uuid, companyName: submission.companyName , firstName: submission.firstName , lastName: submission.lastName , totalPoints: submission.totalPoints , product_01: submission.product_01 , product_02: submission.product_02 , product_03: submission.product_03 , product_04: submission.product_04 , product_05: submission.product_05 , product_06: submission.product_06 , product_07: submission.product_07 , product_08: submission.product_08 , product_09: submission.product_09 , product_10: submission.product_10 , product_11: submission.product_11 , product_12: submission.product_12 , product_13: submission.product_13 , product_14: submission.product_14 , product_15: submission.product_15 , product_16: submission.product_16 }};
    const options = { upsert: true };
  
    requests.updateOne(query, update, options);

    console.log('Record inserted');
    return res.json({"status": "ok"});
  } catch (err) {
    console.log(err);
  }
}); 

app.get('/submit', (req, res) => {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json'
  });

  console.log('Ready to process...');

  return res.json({"status":"allowing access"});
});

// NB - Mongo will export file with the id
app.get('/api/:id', async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  res.send({ user });
});

app.listen(port);