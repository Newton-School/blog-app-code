const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  ObjectID: {
    type: mongoose.Schema.Types.ObjectId,
  },
  topic: {
    type: String,
  },
  description: {
    type: String,
  },
  posted_at: {
    type: String,
  },
  posted_by: {
    type: String,
  },
});

module.exports = mongoose.model("blog", articleSchema);
