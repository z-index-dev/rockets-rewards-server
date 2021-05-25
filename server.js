const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());

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

app.post('/', (req, res) => {
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
  return res.send({message:"thank you for signing up"});
});

app.get('/', (req, res) => {
  res.set({
    'Allow-access-Allow-origin': '*'
  });

  return console.log('Ready to process...');
});