/** @format */

const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
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
});

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
