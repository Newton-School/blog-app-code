const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const blogSchema = new mongoose.Schema(
  {
    _id: { type: String, default: mongoose.Types.ObjectId },
    topic: { type: String, required: true },
    description: { type: String, required: true },
    posted_at: { type: String, required: true },
    posted_by: { type: String, required: true },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Blog", blogSchema);
