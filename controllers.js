const Blog = require("./Model");

exports.getBlog = async (req, res) => {
  const { page, search } = req.query;

  try {
    const result = await Blog.fing({ topic: { $regex: search, $option: "i" } })
      .skip(parseInt(page - 1) * 5)
      .limit(5);

    if (result === err) {
      return res.json({
        status: "failed",
      });
    }
    return res.json({
      status: "success",
      result,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

exports.addBlog = async (req, res) => {
  const { topic, description, posted_at, posted_by } = req.body;
  try {
    const blog = Blog({
      topic,
      description,
      posted_at,
      posted_by,
    });
    if (!blog) {
      return res.json({
        status: "failed",
      });
    }
    blog.save();
    return res.json({
      status: "success",
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

exports.updateBlog = async (req, res) => {
  const { id } = req.params;
  const { topic, description, posted_at, posted_by } = req.body;
  try {
    const blog = await Blog.updateOne(
      { _id: id },
      { topic, description, posted_at, posted_by }
    );

    if (blog === err) {
      return res.json({
        status: "failed",
      });
    }
    return res.json({
      status: "success",
      blog,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

exports.deleteBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findByIdAndDelete({ _id: id });
    if (!blog) {
      return res.json({
        status: "failed",
      });
    }
    return res.json({
      status: "success",
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};
