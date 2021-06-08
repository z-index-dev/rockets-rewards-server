const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;

// Schema variables
const User = require('./models/User');
const Submission = require('./models/Submission');

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

  try {
    const query = { uuid: submission.uuid };
    const options = { upsert: true };
    const replacement = { submission };
  
    const result = await requests.replaceOne(query, replacement, options);

    if (result.modifiedCount === 0 && result.upsertedCount === 0) {
      console.log("No changes made to the collection.");
    } else {
      if (result.matchedCount === 1) {
        console.log("Matched " + result.matchedCount + " documents.");
      }
      if (result.modifiedCount === 1) {
        console.log("Updated one document.");
      }
      if (result.upsertedCount === 1) {
        console.log(
          "Inserted one new document with an _id of " + result.upsertedId._id
        );
      }
    }

    console.log(res.body);

    return res.json({"status":"ok"});
  } catch (err) {
    console.log(err);
  }

  // requests.insertOne(submission, (err, collection) => {
  //   if(err) {
  //     throw err;
  //   }
  //   console.log('Record inserted');
  // });
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

app.get('/api/:id', async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  res.send({ user });
});

app.listen(port);