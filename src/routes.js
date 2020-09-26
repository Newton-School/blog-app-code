const express = require("express");
const { getBlogs, addBlog, updateBlog, deleteBlog } = require("./controller");

const router = express.Router();

router.get("/allblog", getBlogs);
router.post("/post/blog", addBlog);
router.put("/update/blog/:id", updateBlog);
router.delete("/delete/blog/:id", deleteBlog);

module.exports = router;
