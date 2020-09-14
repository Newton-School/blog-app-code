const Posts = require("../models/blog");

exports.updateFields = (req, res) => {
  const id = req.params.id;
  const { topic, description, posted_at, posted_by } = req.body;
  Posts.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        topic: topic,
        description: description,
        posted_at: posted_at,
        posted_by: posted_by,
      },
    }
  ).exec((err, user) => {
    if (err || !user) {
      return res.status(200).json({
        status: "failed",
      });
    }
    return res.json({
      status: "success",
      result: {
        id: user._id,
        topic: user.topic,
        description: user.description,
        posted_at: user.posted_at,
        posted_by: user.posted_by,
      },
    });
  });
};

exports.deletePost = (req, res) => {
  const id = req.params.id;

  Posts.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(200).send({
          status: "failed",
        });
      } else {
        res.send({
          status: "success",
          result: {
            id: data._id,
            topic: data.topic,
            description: data.description,
            posted_at: data.posted_at,
            posted_by: data.posted_by,
          },
        });
      }
    })
    .catch((err) => {
      res.status(200).send({
        status: "failed",
      });
    });
};

exports.addNewPost = (req, res) => {
  const { topic, description, posted_at, posted_by } = req.body;

  const newArticle = new Posts({ topic, description, posted_at, posted_by });

  newArticle.save((err, articleData) => {
    if (err)
      return res.status(200).json({
        status: "failed",
      });
    return res.json({
      status: "success",
      result: {
        id: articleData._id,
        topic: articleData.topic,
        description: articleData.description,
        posted_at: articleData.posted_at,
        posted_by: articleData.posted_by,
      },
    });
  });
};
