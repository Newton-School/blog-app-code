const express = require("express");
const router = express.Router();

const {getAllBlogs,addBlog,updateBlog,deleteBlog} = require("./controller");

router.get("/allblog",getAllBlogs);

router.post("/post/blog",addBlog);

router.put("/update/blog/:id",updateBlog);

router.delete("/delete/blog/:id",deleteBlog);

module.exports = router;