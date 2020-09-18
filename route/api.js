const express=require('express');
const blogSchema = require('../model/blogSchema');
const router=express.Router();

router.get('/',(req,res)=>{
    res.send('Hello World!')
})

router.get('/allblog',async (req,res)=>{
    const page=req.query.page;
    const start=(page-1)*5;
    const s=req.query.search;
    const end=page*5;
    const results={};
    const size= await blogSchema.countDocuments({})
   
    results.current=page;
    if(start>0){
        results.prev=page-1;
    }
    const total=Math.ceil(parseFloat(size)/5)
    if(total>page){
        results.next=total;
    }
    console.log(size);
    console.log("reaching all blog");
    if(s){
        console.log("come in if");
        var regex=new RegExp(s,'i');
        res.json("from if");
        blogSchema.findOne({description:regex})
        .then(data=>res.json({status:"success",size:results,result:data}))
        .catch(err=>res.json({status:"failed"})) 
    }else{
        
        blogSchema.find({})
        .limit(5).skip(start)
        .then(data=>res.json({status:"success",size:results,result:data}))
        .catch(err=>res.json({status:"failed"}))
    }
    })

router.get('/allblog/:id',(req,res)=>{
    blogSchema.findById({_id:req.params.id}).then(blog=>res.json({status:"success",result:blog})).catch(err=>res.json({status:"failed"}))
})

router.post('/post/blog',(req,res)=>{
    console.log(req.body);
        const newPost=new blogSchema({
            topic:req.body.topic,
            description:req.body.description,
            posted_at:req.body.posted_at,
            posted_by:req.body.posted_by
        })

        newPost.save().then(post=>res.json({status:"success",result:post})).catch(err=>res.json({status:"failed"}))
    })


router.put('/update/blog/:id',(req,res)=>{
    console.log("reaching update");
    console.log(req.params.id);
    // var update=new blogSchema(req.body);
    // console.log(update);
    if(req.body.description=="" || req.body.topic=="" || req.body.posted_at=="" || req.body.posted_by==""){
        return res.json({status:"failed"})
    }
    
    blogSchema.findByIdAndUpdate(req.params.id, req.body,{new:true},(err,post)=>{
            if(err){
                return res.json({status:"failed"})
            }return res.json({status:"success",result:post})
        })
    })



router.delete('/delete/blog/:id',(req,res)=>{
    console.log(req.params.id);

    blogSchema.findOne({_id:req.params.id},function(err,data){
        if(err){
            return res.json({status:"failed"})
        }
        data.remove().then(d=>res.json({status:"success",result:d}))
    })
    // router.get('/allblog/:id',(req,res)=>{
    //     blogSchema.findById({_id:req.params.id}).then(blog=>res.json({status:"success",result:blog})).catch(err=>res.json({status:"failed"}))
    // })
    // blogSchema.remove({_id:req.params.id}).then(sucess=>res.json({status:"success",result:sucess})).catch(err=>res.json({status:"failed"}))
    // blogSchema.findByIdAndDelete(req.params.id).then(sucess=>res.json({status:"success",result:sucess})).catch(err=>res.json({status:"failed"}))
})
module.exports=router