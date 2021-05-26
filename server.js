const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000; 

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
  return console.log(res.body);
});

app.get('/', (req, res) => {
  res.set({
    'Allow-access-Allow-origin': '*',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json'
  });

  return console.log('Ready to process...');
}).listen(port);