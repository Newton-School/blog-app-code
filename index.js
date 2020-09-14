/** @format */

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const serialiser = require('node-serialize');
const mongodb = require('mongodb');
let ObjectId = require('mongodb').ObjectId;
const morgan = require('morgan');
const blogRoutes = require('./src/blogRoutes');
const mongoose = require('mongoose');

app.use(express.urlencoded());
app.use(morgan('dev'));

// Parse JSON bodies (as sent by API clients)
const mongoURI = 'mongodb://localhost:27017' + '/blog';
console.log(mongoURI);

app.use(express.json());

mongoose
	.connect(mongoURI, {
		useCreateIndex: true,
		useFindAndModify: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log(`connected.`);
	})
	.catch((err) => {
		console.log('connection failed');
	});

// let col;
// const connection = mongodb.MongoClient.connect(mongoURI, (err, dbClient) => {
// 	if (err) {
// 		console.log('connection failed');
// 		return;
// 	}
// 	// const db = dbClient.db('blog');
// 	// col = db.collection('blog');
// 	// col.createIndex({ topic: 'text' });
// 	console.log('connection established');
// });

app.get('/', (req, res) => res.send('Hello World!'));

app.use('/', blogRoutes);
// your code goes here

// here

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;
