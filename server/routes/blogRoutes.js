const express = require("express");
const router = express.Router();

const { addBlog, deleteBlog, updateBlog } = require("../controllers/blog");

router.post("/post/blog", addBlog);

router.delete("/delete/blog/:id", deleteBlog);

router.put("/update/blog/:id", updateBlog);

module.exports = router;
