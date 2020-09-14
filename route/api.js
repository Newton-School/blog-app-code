const express=require('express');
const blogSchema = require('../model/blogSchema');
const router=express.Router();

router.get('/',(req,res)=>{
    res.send('Hello World!')
})

router.get('/allblog',(req,res)=>{
    const page=req.query.page;
    const start=(page-1)*5;
    console.log(req.query.search);
    const s=req.query.search;
    const end=page*5;
    const results={};
    console.log(start+" "+end+" "+page);
    console.log("reaching all blog");
    if(s!=undefined){
        console.log("come in if");
        var regex=new RegExp(s,'i');
        blogSchema.findOne({description:regex})
        .then(data=>res.json({status:"sucess",result:data}))
        .catch(err=>res.json({status:"failed"})) 
    }else{
    blogSchema.find({})
        .limit(5).skip(start)
        .then(data=>res.json(data))
        .catch(err=>res.json({status:"failed"}))
    }
    })


router.post('/post/blog',(req,res)=>{
    console.log("reaching post");
        const newPost=new blogSchema({
            topic:req.body.topic,
            description:req.body.description,
            posted_at:req.body.posted_at,
            posted_by:req.body.posted_by
        })

        newPost.save().then(post=>res.json({status:"sucess",result:post})).catch(err=>res.json({status:"failed"}))
    })


router.put('/update/blog/:id',(req,res)=>{
    console.log("reaching update");
    console.log(req.params.id);
    // var update=new blogSchema(req.body);
    // console.log(update);
    if(req.body.topic=="" || req.body.description==""){
        return res.json({status:"failed"})
    }
    
    blogSchema.findByIdAndUpdate(req.params.id, req.body,{new:true},(err,post)=>{
            if(err){
                return res.json({status:"failed"})
            }return res.json({status:"sucess",result:post})
        })
    })



router.delete('/delete/blog/:id',(req,res)=>{
    console.log(req.params.id);
    blogSchema.findByIdAndDelete(req.params.id).then(sucess=>res.json({status:"sucess",result:sucess})).catch(err=>res.json({status:"failed"}))
})
module.exports=router