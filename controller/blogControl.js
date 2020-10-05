const Blog = require("../models/Blog");

exports.createPost = async (req, res, next) => {
  let { _id, topic, description, posted_at, posted_by } = req.body;
  const blog = new Blog({
    _id: _id,
    topic: topic,
    description,
    posted_at,
    posted_by,
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
exports.deletePost = async (req, res, next) => {
  try {
    const id = req.params.id;

    const result = await Blog.findByIdAndDelete(id);
    res.status(201).json({
      message: "success"
    });
  } catch (error) {
    return res.json({
      status: "failed"
    });
  }
};
