const express = require("express");
const router = express.Router();

const {addBlog, deleteBlog, updateBlog, getBlog} = require("./blog-controller");

router.post("/post/blog", addBlog);
router.get("/allblog", getBlog);
router.put("/update/blog/:id", updateBlog);
router.delete("/delete/blog/:id", deleteBlog);

module.exports = router;
