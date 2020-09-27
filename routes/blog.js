const { json } = require("body-parser");
const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");
const feed = require("../controller/blogControl");

router.post("/post/blog", feed.createPost);
router.put("/update/blog/:id", feed.updatePost);
router.delete("/delete/blog/:id", feed.deletePost);
router.get("/home", control.getPost);
/*router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find;
    res.json(blogs);
  } catch (err) {
    res.json({ message: err });
  }
});
*/
router.get("/:blogId", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.blogId);
    res.json(blog);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/post/blog", (req, res) => {
  const blog = new Blog({
    topic: req.body.topic,
    description: req.body.description,
    posted_at: req.body.posted_at,
    posted_by: req.body.posted_by
  });
  console.log(blog.topic);
  blog
    .save()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json({ message: err });
    });
});

router.delete("/delete/blog/:id", async (req, res) => {
  try {
    const deleteBlog = await Blog.remove({ _id: req.params.blogId });
    res.json({
      status: success,
      result: deleteBlog
    });
  } catch (err) {
    res.json({ message: err });
  }
});

router.put("/update/blog/:id", async (req, res) => {
  try {
    const updatedBlog = await Blog.updateMany(
      { _id: req.params.blogId },
      {
        $set: {
          topic: req.body.topic,
          description: req.body.description,
          posted_at: req.body.posted_at,
          posted_by: req.body.posted_by
        }
      }
    );
    res.json(updatedBlog);
  } catch (err) {
    res.json({ message: err });
  }
});
module.exports = router;
