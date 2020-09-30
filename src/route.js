const express = require('express');
const{fetchBlogs, addBlog, updateBlog, deleteBlog} = require('./controller');

const router = express.Router();

router.get("/allblog", fetchBlogs);

router.post( "/post/blog", addBlog);

router.put("/update/blog/:id", updateBlog);

router.delete("/delete/blog/:id", deleteBlog);

module.exports = router;