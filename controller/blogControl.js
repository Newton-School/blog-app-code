const Blog = require("../models/Blog");

exports.createPost = async (req, res, next) => {
  const topic = req.body.topic;
  const description = req.body.description;

  console.log(topic + " " + description);
  const blog = new Blog({
    topic: req.body.topic,
    description: req.body.description,
    posted_at: req.body.posted_at,
    posted_by: req.body.posted_by
  });

  await blog
    .save()
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: "post created successfully",
        blog: result
      });
    })
    .catch(err => {
      console.log(err);
      return res.json({
        status: "failed"
      });
    });
};

exports.updatePost = (req, res, next) => {
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
exports.deletePost = (req, res, next) => {
  Blog.findByIdAndDelete(req.params.id, function(err, result) {
    if (err || !result) {
      return res.json({ status: "failed" });
    }
    res.json({ result: result, status: "success" });
  });
};
