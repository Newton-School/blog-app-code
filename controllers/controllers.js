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
      return res.status(400).json({
        status: "failure",
        error: `unable to get posts from database ${err}`,
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

  Posts.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          status: "failure",
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
      res.status(500).send({
        status: "failure",
      });
    });
};

exports.addNewPost = (req, res) => {
  const { topic, description, posted_at, posted_by } = req.body;

  const newArticle = new Posts({ topic, description, posted_at, posted_by });

  newArticle.save((err, articleData) => {
    if (err)
      return res.status(401).json({
        error: `error in saving to database ${err}`,
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
