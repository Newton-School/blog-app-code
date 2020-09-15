const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;
const serialiser = require("node-serialize");
const mongodb = require("mongodb");
const mongoose = require("mongoose");

app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
const mongoURI = "mongodb://localhost:27017" + "/blog";
console.log(mongoURI);

app.use(express.json());
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
// const connection = mongodb.MongoClient.connect(mongoURI,(err, dbClient) =>{
//     if(err){
//         console.log('connection failed')
//         return
//     }
// })

//model
const Blog = mongoose.model(
  "blogs",
  new mongoose.Schema({
    //_id: { type: Number, default: shortid.generate },
    topic: String,
    description: String,
    postedAt: String,
    postedBy: String,
  })
);

app.get("/", (req, res) => res.send("Hello World!"));

// your code goes here

// here
// app.get("/allblog", async (req, res) => {
//   const blogs = await Blog.find({});
//   res.send(blogs);
// });
app.get("/allblog", async (req, res) => {
  console.log("inside get");
  const page = req.query.page;
  const search = req.query.search;
  const blogs = await Blog.find({
    topic: { $regex: ".*" + search + ".*" },
  }).limit(page * 5);
  res.status(200).send(blogs);
});

app.post("/post/blogs", async (req, res) => {
  console.log("inside post");
  const newBlog = new Blog(req.body);
  const savedBlog = await newBlog.save();
  res.status(200).send(savedBlog);
});

app.put("/update/blog/:id", (req, res) => {
  console.log("inside put");
  const id = req.params.id;
  Blog.updateOne(
    { _id: id },
    {
      $set: {
        topic: req.body.topic,
        description: req.body.description,
        postedAt: req.body.postedAt,
        postedBy: req.body.postedBy,
      },
    }
  )
    .exec()
    .then(async (result) => {
      const blog = await Blog.find({ _id: id });
      res.status(200).send(blog);
    })
    .catch((err) => console.log(err));
});

app.delete("/delete/blog/:id", async (req, res) => {
  console.log("inside delete.....");
  const id = req.params.id;
  const removedBlog = await Blog.findOne({ _id: id });
  Blog.deleteOne({ _id: id }, (err, obj) => {
    if (err) throw err;
    console.log("hellooooooooooooooooooooooooooooooo", obj);
    console.log(removedBlog);
    if (obj.ok) {
      res.status(200).send(removedBlog);
    } else {
      res.status(500);
    }
  });
  console.log(removedBlog);
  //res.send(removedBlog);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;
