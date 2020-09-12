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
let col;
const connection = mongodb.MongoClient.connect(mongoURI, (err, dbClient) => {
	if (err) {
		console.log('connection failed');
		return;
	}
	const db = dbClient.db('blog');
	col = db.collection('blog');
	col.createIndex({ topic: 'text' });
});

app.get('/', (req, res) => res.send('Hello World!'));

// your code goes here

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
			res.json({
				status: 'success',
				result: results,
			});
		})
		.catch((error) => console.error(error));
});

app.post('/post/blog', (req, res) => {
	// console.log(req.body);
	const { topic, description, posted_at, posted_by } = req.body;
	if (!topic || !description || !posted_at || !posted_by)
		return res.json({
			error: 'error',
		});
	col.insertOne(res.body, (err, result) => {
		if (err) {
			return res.json({
				status: 'failed',
			});
		}
		const data = result.ops[0];
		res.json({
			status: 'success',
			result: data,
		});
	});
});

app.patch('/update/blog/:id', (req, res) => {
	// console.log(req.params.id, req.body);
	const id = new ObjectId(req.params.id);
	col.findOneAndUpdate(
		{ _id: id },
		{
			$set: req.body,
		},
		{
			returnNewDocument: true,
		},
		(err, result) => {
			if (err) {
				return res.json({
					status: 'failed',
				});
			}
			const data = result.value;
			res.json({
				status: 'success',
				result: data,
			});
		}
	);
});

app.delete('/delete/blog/:id', (req, res) => {
	const id = new ObjectId(req.params.id);
	col.findOneAndDelete({ _id: id }, (err, result) => {
		console.log(err, result);
		if (err) {
			return res.json({
				status: 'failed',
			});
		}
		const data = result.value;
		res.json({
			status: 'success',
			result: data,
		});
	});
});

// here

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;
