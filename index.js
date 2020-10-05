const express = require("express");
const app = express();
const bodyParser = require("body-parser");
//const port = 3000;
const port = 6000;
const serialiser = require("node-serialize");
const mongodb = require("mongodb");
const mongoose = require("mongoose");
const Blog = require("./Models/Blog");
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
//const mongoURI = "mongodb://localhost:27017"+ "/blog"

const mongoURI =
  "mongodb+srv://garima:garima@cluster0.dblne.gcp.mongodb.net/blog";
console.log(mongoURI);

app.use(express.json());
// const connection = mongodb.MongoClient.connect(mongoURI, (err, dbClient) => {
//   if (err) {
//     console.log("connection failed");
//     return;
//   }
// });

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Database connected");
  });

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/allblog", async (req, res) => {
  const { page = 1, search } = req.query;
  const limit = 5;
  let searchtext = new RegExp(search);
  try {
    // execute query with page and limit values
    const blogs = await Blog.find({ topic: { $regex: searchtext } })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    // get total documents in the Blog collection
    const count = await Blog.countDocuments();

    // return response with Blog, total pages, and current page
    res.json({ result: blogs });
  } catch (err) {
    return res.json({ status: "failed" });
  }
});

app.get("/allblogs", (req, res) => {
  Blog.find().then((blogs) => res.status(200).json({ result: blogs }));
});

app.get("/blog/:id", (req, res) => {
  Blog.findById(req.params.id)
    .then((blog) => res.status(200).json({ blog }))
    .catch((err) => res.status(400).json({ err }));
});

app.post("/post/blog", (req, res) => {
  const { topic, description, posted_at, posted_by } = req.body;
  const blog = new Blog({ topic, description, posted_at, posted_by });

  blog
    .save()
    .then((result) =>
      res.status(200).json({ result: result, status: "success" })
    )
    .catch((e) => {
      return res.json({ status: "failed" });
    });
});

app.put("/update/blog/:id", (req, res) => {
  const id = req.params.id;
  const { topic, description, posted_at, posted_by } = req.body;
  Blog.findByIdAndUpdate(
    id,
    { topic, description, posted_at, posted_by },
    { new: true }
  ).exec((err, blog) => {
    if (err || !blog) {
      return res.json({ status: "failed" });
    } else {
      res.status(200).json({ result: blog });
    }
  });
});

app.delete("/delete/blog/:id", (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id, function (err, docs) {
    if (err || !docs) {
      return res.json({ status: "failed" });
    } else {
      res.status(200).json({ result: docs });
      console.log("deleted");
    }
  });
});
// your code goes here

// here

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;
