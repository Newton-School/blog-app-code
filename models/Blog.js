const { model, Schema } = require("mongoose");

const BlogSchema = new Schema({
  topic: {
    type: String,
    trim: true,
    required: true
  },
  description: {
    type: String,
    trim: true,
    required: true
  },
  posted_at: {
    type: String,
    trim: true,
    required: true
  },
  posted_by: {
    type: String,
    trim: true,
    required: true
  }
});

module.exports = model("blog", BlogSchema);
