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

  newBlog.save((err, __) => {
    // if (err) {
    //   return res.status(400).json({
    //     error: "Something went wrong.",
    //   });
    // }

    res.json({
      status: "success",
      result: {
        id: ObjectID,
        topic: topic,
        description: description,
        posted_at: posted_at,
        posted_by: posted_by,
      },
    });
  });
};

exports.deleteBlog = (req, res) => {
  const ObjectID = req.params.id;

  Blog.findOneAndDelete({ ObjectID }).exec((err, blog) => {
    // if (err) {
    //   return res.status(400).json({
    //     error: "Error in deleting the Blog",
    //     err,
    //   });
    // }

    return res.json({
      status: "success",
      result: {
        id: ObjectID,
        topic: blog.topic,
        description: blog.description,
        posted_at: blog.posted_at,
        posted_by: blog.posted_by,
      },
    });
  });
};

exports.updateBlog = (req, res) => {
  const { topic, description, posted_at, posted_by } = req.body;
  const ObjectID = req.params.id;

  Blog.findOne({ ObjectID }).exec((err, blog) => {
    if (err) {
      return res.status(401).json({
        error: "Something went wrong!!",
      });
    }

    if (!blog) {
      return res.status(401).json({
        error: "Blog with the given id does not exist!!",
      });
    }

    const updateFields = {
      topic: topic,
      description: description,
      posted_at: posted_at,
      posted_by: posted_by,
    };

    blog = _.extend(blog, updateFields);

    blog.save((err) => {
      if (err) {
        return res.status(400).json({
          error: "Something went wrong in saving the data",
        });
      }

      return res.json({
        status: "success",
        result: {
          id: ObjectID,
          topic: blog.topic,
          description: blog.description,
          posted_at: blog.posted_at,
          posted_by: blog.posted_by,
        },
      });
    });
  });
};
