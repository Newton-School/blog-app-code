/** @format */

const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
	{
		_id: Number,
		topic: {
			type: String,
			trim: true,
			required: true,
		},
		description: {
			type: String,
			trim: true,
			required: true,
		},
		posted_at: {
			type: String,
			trim: true,
			required: true,
		},
		posted_by: {
			type: String,
			trim: true,
			required: true,
		},
	},
	{ _id: false }
);

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
