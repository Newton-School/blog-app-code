const { json } = require("body-parser");
const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");
const feed = require("../controller/blogControl");

router.post("/post/blog", feed.createPost);
router.put("/update/blog/:id", feed.updatePost);
router.delete("/delete/blog/:id", feed.deletePost);
//router.get("/home", control.getPost);

module.exports = router;
