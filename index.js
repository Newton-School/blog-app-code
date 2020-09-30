const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const port = 3000;
const serialiser = require('node-serialize');
const mongodb = require('mongodb');
const morgan = require('morgan');
const mongoose = require('mongoose');
const mainroute = require('./src/route');

app.use(express.urlencoded());


// Parse JSON bodies (as sent by API clients)
const mongoURI = "mongodb://localhost:27017"+ "/blog"
console.log(mongoURI);

app.use(express.json());
const connection = mongodb.MongoClient.connect(mongoURI,(err, dbClient) =>{
    if(err){
        console.log('connection failed');
        return;
    }
})

app.get('/', (req, res) => res.send('Hello World!'));

// your code goes here
app.use(morgan("dev"));

app.use("/", mainroute);

app.use(bodyParser.urlencoded({extended: false}));

// here

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = app;