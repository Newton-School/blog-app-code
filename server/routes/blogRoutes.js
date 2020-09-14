const express = require("express");
const router = express.Router();

const {
  addBlog,
  deleteBlog,
  updateBlog,
  allBlogs,
} = require("../controllers/blog");

router.post("/post/blog", addBlog);

router.delete("/delete/blog/:id", deleteBlog);

router.put("/update/blog/:id", updateBlog);

router.get("/allblog", allBlogs);

module.exports = router;
