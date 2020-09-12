/** @format */

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const serialiser = require('node-serialize');
const mongodb = require('mongodb');
let ObjectId = require('mongodb').ObjectId;

app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
const mongoURI = 'mongodb://localhost:27017' + '/blog';
console.log(mongoURI);

app.use(express.json());
const connection = mongodb.MongoClient.connect(mongoURI, (err, dbClient) => {
	if (err) {
		console.log('connection failed');
		return;
	}
	const db = dbClient.db('blog');
	const col = db.collection('blog');
	col.createIndex({ topic: 'text' });
	app.get('/allblog', (req, res) => {
		const page = req.query.page * 1 || 1;
		const limit = 5;
		const skip = (page - 1) * limit;
		const str = req.query.search || '';
		col
			.aggregate([
				{ $match: { $text: { $search: str } } },
				{
					$skip: skip,
				},
				{
					$limit: limit,
				},
			])
			.toArray()
			.then((results) => {
				// console.log(results);
				res.status(200).json({
					status: 'success',
					result: results,
				});
			})
			.catch((error) => console.error(error));
	});

	app.post('/post/blog', (req, res) => {
		console.log(req.body);
		col
			.insertOne(req.body)
			.then((result) => {
				const data = result.ops[0];
				res.status(201).json({
					status: 'success',
					result: data,
				});
			})
			.catch((error) => console.error(error));
	});

	app.patch('/update/blog/:id', (req, res) => {
		// console.log(req.params.id, req.body);
		const id = new ObjectId(req.params.id);
		col
			.findOneAndUpdate(
				{ _id: id },
				{
					$set: req.body,
				},
				{
					returnNewDocument: true,
				}
			)
			.then((result) => {
				const data = result.value;
				res.status(200).json({
					status: 'success',
					result: data,
				});
			})
			.catch((error) => console.error(error));
	});

	app.delete('/delete/blog/:id', (req, res) => {
		const id = new ObjectId(req.params.id);
		col
			.findOneAndDelete({ _id: id })
			.then((result) => {
				const data = result.value;
				res.json({
					status: 'success',
					result: data,
				});
			})
			.catch((error) => console.error(error));
	});
});

app.get('/', (req, res) => res.send('Hello World!'));

// your code goes here

// here

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;
