const { model, Schema } = require("mongoose");

const BlogSchema = new Schema(
  {
    _id: { type: String, default: mongoose.Types.ObjectId },
    topic: { type: String, required: true },
    description: { type: String, required: true },
    posted_at: { type: String, required: true },
    posted_by: { type: String, required: true }
  },
  { versionKey: false }
);

module.exports = model("blog", BlogSchema);
