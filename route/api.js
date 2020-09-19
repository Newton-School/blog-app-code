const express = require("express");
const BlogSchema = require("../model/BlogSchema");
const blogSchema = require("../model/BlogSchema");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.get("/allblog", (req, res) => {
  const { page, search } = req.query;

  BlogSchema.find({ topic: { $regex: search, $options: "i" } })
    .skip((parseInt(page) - 1) * 5)
    .limit(5)
    .exec((err, result) => {
      if (err) {
        return res.json({
          status: "failed",
        });
      }

      return res.json({
        status: "success",
        result,
      });
    });
});

router.post("/post/blog", (req, res) => {
  const { topic, description, posted_at, posted_by } = req.body;
  const newBlog = new blogSchema({ topic, description, posted_at, posted_by });
  newBlog.save((err, result) => {
    if (err) {
      return res.json({
        status: "failed",
      });
    }

    return res.json({
      status: "success",
      result,
    });
  });
});

router.put("/update/blog/:id", (req, res) => {
  const { id } = req.params;
  const { topic, description, posted_at, posted_by } = req.body;

  BlogSchema.updateOne(
    { _id: id },
    { topic, description, posted_at, posted_by }
  ).exec((err, result) => {
    if (err) {
      return res.json({
        status: "failed",
      });
    }

    return res.json({
      status: "success",
      result: {
        topic,
        description,
        posted_at,
        posted_by,
      },
    });
  });
});

router.delete("/delete/blog/:id", (req, res) => {
  const { id } = req.params;
  BlogSchema.findOneAndDelete({ _id: id }).exec((err, result) => {
    if (err || !result) {
      return res.json({
        status: "failed",
      });
    }

    return res.json({
      status: "success",
      result,
    });
  });
});

module.exports = router;
