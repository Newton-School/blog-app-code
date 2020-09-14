const express = require("express");
const router = express.Router();

const {
  updateFields,
  deletePost,
  addNewPost,
} = require("../controllers/controllers");

router.post("/post/blog", addNewPost);

router.put("/update/blog/:id", updateFields);

router.delete("/delete/blog/:id", deletePost);
module.exports = router;
