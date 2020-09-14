const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 3000
const serialiser = require('node-serialize')
const mongodb = require('mongodb').MongoClient;
const mongoose=require('mongoose')

app.use(express.urlencoded());


// Parse JSON bodies (as sent by API clients)
const mongoURI = "mongodb://localhost:27017"+"/blog"
console.log(mongoURI);

app.use(express.json());
const connection = mongoose.connect(mongoURI,(err, dbClient) =>{
    if(err){
        console.log('connection failed')
        return
    }
})

// app.get('/', (req, res) => res.send('Hello World!'))
app.use('/',require('./route/api'))
// your code goes here

// here

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = app;