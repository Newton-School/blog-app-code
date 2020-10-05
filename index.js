const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;
const serialiser = require("node-serialize");
const mongodb = require("mongodb");
const feed = require("./routes/blog");
const mongoose = require("mongoose");
app.use(express.urlencoded());
const Blog = require("./models/Blog");

// Parse JSON bodies (as sent by API clients)
const mongoURI = "mongodb://localhost:27017" + "/blog";
console.log(mongoURI);
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(express.json());
const connection = mongodb.MongoClient.connect(mongoURI, (err, dbClient) => {
  if (err) {
    console.log("connection failed");
    return;
  } else {
    console.log(dbClient);
  }
});

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/allblog", (req, res) => {
  let page = parseInt(req.query.page);
  let search = req.query.search;
  //test case bug
  if (search && search[0] == "'") {
    search = search.slice(1);
  }
  let userPattern = new RegExp(search);
  Blog.find({ topic: { $regex: userPattern } })
    .skip(page)
    .limit(5)
    .then(blogs => res.status(200).json({ result: blogs, status: "success" }))
    .catch(err => {
      res.json({ status: "failed" });
    });
});

app.post("/post/blog", (req, res) => {
  let { _id, topic, description, posted_at, posted_by } = req.body;
  const blog = new Blog({
    _id: _id,
    topic: topic,
    description,
    posted_at,
    posted_by
  });
  blog
    .save()
    .then(result => {
      if (!result) {
        return res.json({ status: "failed" });
      }
      res.status(200).json({ result: result, status: "success" });
    })
    .catch(err => {
      return res.json({ status: "failed" });
    });
});

app.put("/update/blog/:id", (req, res) => {
  const { topic, description, posted_at, posted_by } = req.body;
  Blog.findByIdAndUpdate(
    req.params.id,
    {
      topic,
      description,
      posted_at,
      posted_by
    },
    {
      new: true
    }
  ).exec((err, result) => {
    if (err || !result) {
      return res.json({ status: "failed" });
    }
    res.json({ result: result, status: "success" });
  });
});

app.delete("/delete/blog/:id", (req, res) => {
  Blog.findByIdAndDelete(req.params.id, function(err, result) {
    if (err || !result) {
      return res.json({ status: "failed" });
    }
    res.json({ result: result, status: "success" });
  });
});

// your code goes here

// here

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;
