const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 3000
const serialiser = require('node-serialize')
const mongodb = require('mongodb');
const mongoose=require("mongoose");

app.use(express.urlencoded());
app.use(express.json());

// Parse JSON bodies (as sent by API clients)
const mongoURI = "mongodb://localhost:27017"+ "/blog"
console.log(mongoURI);

app.use(express.json());
const connection = mongodb.MongoClient.connect(mongoURI,(err, dbClient) =>{
    if(err){
        console.log('connection failed')
        return
    }
})

app.get('/', (req, res) => res.send('Hello World!'))

// your code goes here

// here




const BlogSchema=new mongoose.Schema({

    topic:{
        type:String,
        required:true,
        unique:true,
        maxlength:32
    },
    description:{
        type:String,
        maxlength:100
    },
    posted_at:{
        type:Date,
        default:new Date()
    },
    posted_by:{
        type:String,
        required:true,
        trim:true,
        maxlength:32
    }



},{timestamps:true})


const Blog=mongoose.model("Blog",BlogSchema)

app.get("/allblogs",(req,res)=>{

    const {page,search}=req.query;


    Blog.find()
        .then(blogs=>{
            let newblogs=blogs.filter(b=> {
                const {topic}=b;
                if(search)
                { 
                    return topic.toLowerCase().indexOf(search.toLowerCase())===-1?false:true;
                }
                else
                {
                    return true;
                }
            })
            let p=page?(parseInt(page)-1)*5: 0;
            newblogs=newblogs.slice(p,p?p+5:newblogs.length);
            res.json({newblogs});
        })
        .catch(err=>{
            res.status(400).json({err:"Error while fetching blogs"});
        })


})

app.post("/post/new",(req,res)=>{

    const blog=new Blog(req.body);

    blog.save()
        .then(()=> res.json({message:"Success"}))
        .catch((err)=> res.status(400).json({err:"Error while creating blog"}));
})

app.get("/blog/:id",(req,res)=>{

    let id=req.params.id;

    Blog.findById(id)
        .then((blog)=> res.json({blog}))
        .catch((err)=> res.status(400).json({err:"Error while fetching this blog"}));
})

app.put("/update/blog/:id",(req,res)=>{

    let id=req.params.id;

    Blog.findById(id)
        .then((blog)=>{

                blog.topic=req.body.topic;
                blog.description=req.body.description ? req.body.description : blog.description ;
                blog.posted_by=req.body.posted_by ? req.body.posted_by : blog.posted_by;

                blog.save()
                    .then(()=>res.json({msg:"Updated"}))
                    .catch(()=> res.status(400).json({err:"Update Failed"}))
        })
})

app.delete("/delete/blog/:id",(req,res)=>{

    let id=req.params.id;

    Blog.findByIdAndDelete(id)
        .then(()=> res.json({msg:"Deleted successfully"}))
        .catch(()=> res.status(400).json({err:"Error while Deleting"}))
})




app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = app;