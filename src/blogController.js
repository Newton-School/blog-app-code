/** @format */

const Blog = require('./blogSchema');

exports.getAll = (req, res) => {
	const page = req.query.page * 1;
	const limit = 5;
	const skip = (page - 1) * limit;
	const str = req.query.search || '';
	Blog.aggregate([
		// { $match: { $text: { $search: str } } },
		{
			$skip: skip,
		},
		{
			$limit: limit,
		},
	])
		// .toArray()
		.then((results) => {
			// console.log(results);
			res.status(200).json({
				status: 'success',
				result: results,
			});
		})
		.catch((error) => console.error(error));
};

exports.create = (req, res) => {
	console.log(req.body);
	const { topic, description, posted_at, posted_by } = req.body;
	// if (!topic || !description || !posted_at || !posted_by)
	// 	return res.json({
	// 		status: 'failed',
	// 	});
	Blog.create({ topic, description, posted_at, posted_by }, (err, result) => {
		// console.log(result);
		if (err || !result) {
			return res.status(200).json({
				status: 'failed',
			});
		}
		const { _id, topic, description, posted_at, posted_by } = result;
		res.status(200).json({
			status: 'success',
			result: {
				_id,
				topic,
				description,
				posted_at,
				posted_by,
			},
		});
	});
};

exports.update = (req, res) => {
	const id = req.params.id;
	const { topic, description, posted_at, posted_by } = req.body;
	Blog.findOneAndUpdate(
		{ _id: id },
		{ topic, description, posted_at, posted_by },
		{ new: true },
		(err, result) => {
			if (err || !result) {
				return res.json({
					status: 'failed',
				});
			}
			// const data = result.value;
			const { _id, topic, description, posted_at, posted_by } = result;
			res.status(200).json({
				status: 'success',
				result: {
					_id,
					topic,
					description,
					posted_at,
					posted_by,
				},
			});
		}
	);
};

exports.delete = (req, res) => {
	const id = req.params.id;
	Blog.findOneAndDelete({ _id: id }).exec((err, result) => {
		console.log(err, result);
		console.log(id);
		if (err || !result) {
			return res.json({
				status: 'failed',
			});
		}
		// const data = result;
		const { _id, topic, description, posted_at, posted_by } = result;
		res.status(200).json({
			status: 'success',
			result: {
				_id,
				topic,
				description,
				posted_at,
				posted_by,
			},
		});
	});
};
