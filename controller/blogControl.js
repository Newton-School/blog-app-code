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

exports.updatePost = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const options = { new: true };
    const result = await Blog.findByIdAndUpdate(id, updates, options);
    res.json({
      status: "success",
      result: result
    });
  } catch (error) {
    return res.json({
      status: "failed"
    });
  }
};
exports.deletePost = (req, res, next) => {
  Blog.findByIdAndDelete(req.params.id, function(err, result) {
    if (err || !result) {
      return res.json({ status: "failed" });
    }
    res.json({ result: result, status: "success" });
  });
};
