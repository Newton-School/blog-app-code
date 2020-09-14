var uniqid = require("uniqid");
const _ = require("lodash");

const Blog = require("../models/blog");

exports.addBlog = (req, res) => {
  const { topic, description, posted_by, posted_at } = req.body;
  const ObjectID = uniqid();
  console.log(topic);

  const newBlog = new Blog({
    topic,
    description,
    posted_at,
    posted_by,
    ObjectID,
  });

  newBlog.save((err, blog) => {
    if (err) {
      return res.json({
        status: "failed",
      });
    }

    res.json({
      status: "success",
      result: blog,
    });
  });
};

exports.deleteBlog = (req, res) => {
  const ObjectID = req.params.id;

  Blog.findOneAndDelete({ ObjectID }).exec((err, blog) => {
    if (err || !blog) {
      return res.json({
        status: "failed",
      });
    }

    return res.json({
      status: "success",
      result: blog,
    });
  });
};

exports.updateBlog = (req, res) => {
  const { topic, description, posted_at, posted_by } = req.body;
  const ObjectID = req.params.id;

  Blog.findOne({ ObjectID }).exec((err, blog) => {
    const updateFields = {
      topic: topic,
      description: description,
      posted_at: posted_at,
      posted_by: posted_by,
    };

    blog = _.extend(blog, updateFields);

    blog.save((err, blog) => {
      if (err) {
        return res.json({
          status: "failed",
        });
      }

      return res.json({
        status: "success",
        result: blog,
      });
    });
  });
};

exports.allBlogs = (req, res) => {
  const { page, search } = req.query;

  Blog.find({ topic: { $regex: search, $options: "i" } })
    .skip((parseInt(page) - 1) * 5)
    .limit(5)
    .exec((err, blogs) => {
      if (err) {
        return res.json({
          status: "failed",
        });
      }

      return res.json({
        status: "success",
        result: blogs,
      });
    });
};
