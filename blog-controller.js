const Blog = require("./blog-model");

exports.addBlog = (req,res) =>{
  const {topic, description, posted_by} = req.body;
  const posted_at = new Date();

  const newBlog = new Blog({topic, description, posted_by,posted_at});
  newBlog.save((err, blogData) => {
    if(err) {
      console.log(err);
      return res.status(400).json({
        error:"something went wrong! Please try again.",
      });
    }
    res.status(200).json({
      blogData,
      message:"Success",
    });
  });
};

exports.updateBlog = (req,res) =>{
  var ObjectId = require('mongodb').ObjectId;
  var id = req.params.id;
  var o_id = new ObjectId(id);
  // console.log(o_id);

  const {topic,description, posted_by} = req.body;
  Blog.findOneAndUpdate({"_id":o_id},{$set:{topic,description, posted_by}}).exec((err,blog)=>{
    if(err){
      return res.status(401).json({
        error: "Something went wrong!!",
      });
    }
    return res.status(200).json({
      blog,
      message:"Success.",
    });
  });
};

exports.deleteBlog =(req,res) =>{
  var ObjectId = require('mongodb').ObjectId;
  var id = req.params.id;
  var o_id = new ObjectId(id);

  Blog.findOneAndRemove({"_id": o_id}).exec((err, blog)=>{
    if(err){
      return res.status(401).json({
        error: "Something went wrong while deleting!!",
      });
    }
    return res.status(200).json({
      blog,
      message:"Success.",
    });
  });
};

exports.getBlog =(req,res) =>{
  const search = req.query.search;
  const page = req.query.page;
  const startIndex = (page-1)*5;

  Blog.find({"topic":{$regex :".*search.*"}}).skip(startIndex).limit(5).exec((err, blogs)=>{
    if(err){
      return res.status(400).json({
        error: "Something went wrong while deleting!!",
      });
    }
    if(!blogs)
    {
      return res.status(401).json({
        error:`No blogs found with ${search}.`,
      });
    }
    return res.status(200).json({
      blog,
      message:"Success.",
    });
  });
};
