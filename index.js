const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const morgan = require("morgan");
const port = 3000
const serialiser = require('node-serialize')
const mongodb = require('mongodb');
const Blog = require("./blog-model");
const mongoose = require("mongoose");
const blogRoutes = require("./blog-routes");

app.use(express.urlencoded());


// Parse JSON bodies (as sent by API clients)
const mongoURI = "mongodb://localhost:27017"+ "/blog"
console.log(mongoURI);

app.use(express.json());
const connection = mongodb.MongoClient.connect(mongoURI,{
    useUnifiedTopology: true,
  }, (err, dbClient) =>{
    if(err){
        console.log('connection failed')
        return
    }
})

app.get('/', (req, res) => res.send('Hello World!'))

app.use(morgan("dev"));

app.use("/", blogRoutes);

app.use(bodyParser.urlencoded({ extended: false }));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = app;


// / your code goes here
// app.post('/post/blog',(req,res) =>{
//   const {topic, description, posted_by} = req.body;
//   const posted_at = new Date();
//
//   const newBlog = new Blog({topic, description, posted_by,posted_at});
//   newBlog.save((err, blogData) => {
//   if(err) {
//     console.log(err);
//     return res.status(400).json({
//       error:"something went wrong! Please try again.",
//     });
//   }
//   res.status(200).json({
//     blogData,
//     message:"Success",
//   });
// });
// });
//
// app.put('/update/blog/:id', (req,res) =>{
//   var ObjectId = require('mongodb').ObjectId;
//   var id = req.params.id;
//   var o_id = new ObjectId(id);
//   // console.log(o_id);
//
//   const {topic,description, posted_by} = req.body;
//   Blog.findOneAndUpdate({"_id":o_id},{$set:{topic,description, posted_by}}).exec((err,blog)=>{
//     if(err){
//       return res.status(401).json({
//         error: "Something went wrong!!",
//       });
//     }
//     return res.status(200).json({
//       blog,
//       message:"Success.",
//     });
//   });
// });
//
// app.delete('/delete/blog/:id', (req,res) =>{
//   var ObjectId = require('mongodb').ObjectId;
//   var id = req.params.id;
//   var o_id = new ObjectId(id);
//
//   Blog.findOneAndRemove({"_id": o_id}).exec((err, blog)=>{
//     if(err){
//       return res.status(401).json({
//         error: "Something went wrong while deleting!!",
//       });
//     }
//     return res.status(200).json({
//       blog,
//       message:"Success.",
//     });
//   });
// });
//
// app.get('/allblog',(req,res) =>{
//   const search = req.query.search;
//   const page = req.query.page;
//   const startIndex = (page-1)*5;
//
//   Blog.find({"topic":{$regex :".*search.*"}}).skip(startIndex).limit(5).exec((err, blogs)=>{
//     if(err){
//       return res.status(400).json({
//         error: "Something went wrong while deleting!!",
//       });
//     }
//     if(!blogs)
//     {
//       return res.status(401).json({
//         error:`No blogs found with ${search}.`,
//       });
//     }
//     return res.status(200).json({
//       blog,
//       message:"Success.",
//     });
//   });
// });

// here
