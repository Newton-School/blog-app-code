const Blog = require("../models/Blog");

exports.createPost = async (req, res, next) => {
  let { _id, topic, description, posted_at, posted_by } = req.body;
  const blog = new Blog({
    _id: _id,
    topic: topic,
    description,
    posted_at,
    posted_by
  });

  await blog
    .save()
    .then(result => {
      console.log(result);
      res.status(200).json({
        blog: result,
        message: "success"
      });
    })
    .catch(err => {
      console.log(err);
      return res.json({
        status: "failed"
      });
    });
};

exports.updatePost = async (req, res, next) => {
  const { topic, description, posted_at, posted_by } = req.body;
  Blog.findByIdAndUpdate(
    req.params.id,
    {
      topic,
      description,
      posted_at,
      posted_by
    },
    {
      new: true
    }
  ).exec((err, result) => {
    if (err || !result) {
      return res.json({ status: "failed" });
    }
    res.json({ result: result, status: "success" });
  });
};
exports.deletePost = async (req, res, next) => {
  Blog.findByIdAndDelete(req.params.id, function(err, result) {
    if (err || !result) {
      return res.json({ status: "failed" });
    }
    res.json({ result: result, status: "success" });
  });
};
