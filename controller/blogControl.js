const Blog = require("../models/Blog");

exports.createPost = (req, res, next) => {
  const topic = req.body.topic;
  const description = req.body.description;

  console.log(topic + " " + description);
  const blog = new Blog({
    topic: req.body.topic,
    description: req.body.description,
    posted_by: req.body.posted_by
  });

  blog
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "post created successfully",
        blog: result
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.updatePost = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const options = { new: true };
    const result = await Blog.findByIdAndUpdate(id, updates, options);
    res.json(result);
  } catch (error) {
    return res.json({
      status: "failed"
    });
  }
};
exports.deletePost = async (req, res, next) => {
  const { id } = req.params;

  await Blog.findOneAndDelete({ _id: id }).exec((err, result) => {
    if (err) {
      return res.json({
        status: "failed"
      });
    }

    return res.json({
      status: "success",
      result
    });
  });
};
