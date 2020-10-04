const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const blogSchema = new mongoose.Schema(
  {
    id: ObjectId,
    topic: String,
    description: String,
    posted_at: String,
    posted_by: String,
  },
  { versionKey: false }
);

module.exports = mongoose.model("Blog", blogSchema);
