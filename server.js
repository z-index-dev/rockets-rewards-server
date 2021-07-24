const express = require('express');
const json2csv = require('json2csv').parse;
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;
const wakeUpApp = require('./wakeUp');
const dynoURL = 'https://rockets-rewards-server.herokuapp.com/submit';
const fs = require('file-system');
const path = require('path');
const mongoURI = process.env.CONNECTIONURI || 'mongodb+srv://zachshelton:rewards@cluster0.evwdm.mongodb.net/rockets-rewards?retryWrites=true&w=majority';

// Schema variables
const User = require('./models/User');
const Submission = require('./models/Submission');
const { request } = require('express');

app.use(express.json());
app.use(cors());

app.use(express.urlencoded({extended: true}));

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on('error', () => console.log('Error connecting to db'));
db.once('open', () => console.log('Connected to db'));

// * Validate Submit Function
const validateSubmission = async(req, res) => {
  const submission = new Submission(req.body);
  const requests = db.collection('requests-test');
  const users = db.collection('users');
  // const items = db.collection('items');
  let costArray = [];
  let totalCost = 0;
  const availableItems = [
    {
      "productID": "product_01",
      "itemValue": 500
    },
    {
      "productID": "product_02",
      "itemValue": 5000
    },
    {
      "productID": "product_03",
      "itemValue": 6000
    },
    {
      "productID": "product_04",
      "itemValue": 7000
    },
    {
      "productID": "product_05",
      "itemValue": 8000
    },
    {
      "productID": "product_06",
      "itemValue": 10000
    },
    {
      "productID": "product_07",
      "itemValue": 10000
    },
    {
      "productID": "product_08",
      "itemValue": 11000
    },
    {
      "productID": "product_09",
      "itemValue": 12000
    },
    {
      "productID": "product_10",
      "itemValue": 12000
    },
    {
      "productID": "product_11",
      "itemValue": 13000
    },
    {
      "productID": "product_12",
      "itemValue": 14000
    },
    {
      "productID": "product_13",
      "itemValue": 15000
    },
    {
      "productID": "product_14",
      "itemValue": 16000
    },
    {
      "productID": "product_15",
      "itemValue": 17000
    },
    {
      "productID": "product_17",
      "itemValue": 5000
    },
    {
      "productID": "product_16",
      "itemValue": 0
    }
  ];

  let validUser = await User.findOne({ _id: req.body.uuid });

  if (validUser) {
    // Set value for donate product (last item)
    availableItems[availableItems.length - 1].itemValue = validUser.totalPoints;

    // Check if totalPoints fields match
    if (validUser.totalPoints == req.body.totalPoints) {

      // Create object with just the products from req.body
      let submittedProducts = Object.keys(req.body)
        .filter(key => key.indexOf('product') == 0)
        .reduce((newData, key) => {
          newData[key] = req.body[key];
          // console.log(newData);
          return newData;
        }, {});

      // Convert object to array of [key, value] pairs
      let requestedProductsArray = Object.keys(submittedProducts)
        .map(key => [(key), submittedProducts[key]]);
      console.log(requestedProductsArray);
      
      // Do the work on products that have been requested
      requestedProductsArray.forEach(product => {
        // console.log(product);
        if (product[1] > 0) {
          console.log(product[1]);
          // Create index to be matched to availableItems
          let selectedProductID = product[0];

          availableItems.forEach(item => {
            if(item.productID == selectedProductID) {
              let productCost = item.itemValue * product[1];
              costArray.push(productCost);
            };
          });
        }
      });

      // {uuid: "60d39d2e7769b9c3b3932b19"}

      // Once the item values have been created, add them up
      if(costArray) {
        try {
          totalCost = costArray.reduce((a, b) => a + b);
          // console.log(totalCost);
        } catch(err) {
          res.status(406);
          res.json({"error": "You have requested an invalid Rockets Rewards item. Please refresh this page and try again."});
          return;
        }
      }

      // If balance is greater than zero after item validation, write to the database
      if (validUser.totalPoints >= totalCost) {
        try {
          const query = { uuid: submission.uuid };
          const update = { $set: { accountNumber: submission.accountNumber, uuid: submission.uuid, companyName: submission.companyName, firstName: submission.firstName, lastName: submission.lastName, totalPoints: submission.totalPoints, product_01: submission.product_01, product_02: submission.product_02, product_03: submission.product_03, product_04: submission.product_04, product_05: submission.product_05 , product_06: submission.product_06, product_07: submission.product_07, product_08: submission.product_08, product_09: submission.product_09, product_10: submission.product_10, product_11: submission.product_11, product_12: submission.product_12, product_13: submission.product_13, product_14: submission.product_14, product_15: submission.product_15, product_16: submission.product_16, product_17: submission.product_17 }};
          const options = { upsert: true };
        
          requests.updateOne(query, update, options);
      
          console.log('Record inserted');
          return res.json({"status": "ok"});
        } catch (err) {
          console.log(err);
          res.send(err);
        }
      } else {
        res.status(406);
        res.json({"error": "Your Rockets Rewards request balance exceeds your available balance. Please refresh this page and try again, or contact your Rockets representative."});
      }
    } else {
      res.status(401);
      res.json({"error": "The Rockets Rewards balance in your request does not match our records. Please refresh this page and try again, or contact your Rockets representative."});
    }
  } else {
    res.status(404);
    res.json({"error": "User ID not found. If you believe you have received this message in error, please contact your Rockets Rewards representative."});
  }
}

app.post('/submit-test', validateSubmission);
app.post('/submit', validateSubmission); 

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

app.get('/export', async (req, res) => {
  const requests = await db.collection('requests').find({}).toArray();
  const dateTime = new Date().toISOString().slice(-24).replace(/\D/g,'').slice(0, 14);
  const fileName = `${dateTime}-rewards-requests.csv`;
  const filePath = path.join(__dirname, "Downloads", fileName);
  console.log(filePath);

  let csv;

  const fields = ['accountNumber', 'uuid', 'companyName', 'firstName', 'lastName', 'totalPoints', 'product_01', 'product_02', 'product_03', 'product_04', 'product_05', 'product_06', 'product_07', 'product_08', 'product_09', 'product_10', 'product_11', 'product_12', 'product_13', 'product_14', 'product_15', 'product_16', 'product_17'];
  
  try {
    csv = json2csv(requests, {fields});
  } catch(err) {
    return res.status(500).json({err});
  };

  fs.writeFile(filePath, csv, function(err) {
    if(err) {
      return res.json(err).status(500);
    } else {
      res.download(filePath);
    };
  });
});

app.listen(port, () => {
  wakeUpApp(dynoURL);
});