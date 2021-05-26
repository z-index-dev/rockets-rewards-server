const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000; 

app.use(bodyParser.json());
app.use(cors());

// This means use the files in the public directory
// app.use(express.static('/'));
app.use(bodyParser.urlencoded({
  encoded: true,
  extended: true
}));

mongoose.connect('mongodb+srv://zachshelton:mydbpassword@cluster0.ouwcc.mongodb.net/mydb?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', () => console.log('Error in connecting to db'));
db.once('open', () => console.log('Connected to db'));

app.post('/submit', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const phno = req.body.phno;
  const password = req.body.password;

  const data = {
    name,
    email,
    phno,
    password
  };

  db.collection('users').insertOne(data, (err, collection) => {
    if(err) {
      throw err;
    }
    console.log('Record inserted');
  });

  // return res.redirect('http://localhost:1234/');

  // res.setHeader('Access-Control-Allow-Origin', '*');
  // res.setHeader('Access-Control-Allow-Credentials', true);
  // res.setHeader( 'Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // res.setHeader( 'Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');

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

  return res.json({"status":"ok"});
}).listen(port);