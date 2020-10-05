const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema(
  {
    _id: { type: String, default: mongoose.Types.ObjectId },
    topic: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    posted_by: {
      type: String,
      required: true,
      trim: true,
    },
    posted_at: { type: String, required: true },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Blog", blogSchema);
