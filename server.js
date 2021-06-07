const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;

// Schema variables
const User = require('./models/User');
const Request = require('./models/Submission');
const Submission = require('./models/Submission');

app.use(bodyParser.json());
app.use(cors());

app.use(bodyParser.urlencoded({
  encoded: true,
  extended: true
}));

mongoose.connect('mongodb+srv://zachshelton:rewards@cluster0.evwdm.mongodb.net/rockets-rewards?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on('error', () => console.log('Error in connecting to db'));
db.once('open', () => console.log('Connected to db'));

app.post('/submit', (req, res) => {
  const submission = new Submission(req.body);
  console.log(submission);

  db.collection('requests').insertOne(submission, (err, collection) => {
    if(err) {
      throw err;
    }
    console.log('Record inserted');
  });

  console.log(res.body);

  return res.json({"status":"ok"});
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