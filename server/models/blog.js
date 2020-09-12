const { Schema, model } = require("mongoose");

const blogSchema = new Schema(
  {
    ObjectID: {
      type: String,
      trim: true,
    },
    posted_by: {
      type: String,
      trim: true,
    },
    topic: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    posted_at: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = model("Blog", blogSchema);
