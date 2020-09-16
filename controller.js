const Blogs=require('./model');

exports.getBlogs=(req,res)=>{
    const {page,search}=req.query;
    Blogs.find({topic:{$regex:search,$option:"i"}}).skip((parseInt(page)-1)*5).limit(5).exec((err,result)=>{
        if(err){
            return res.json({
                status:'failed'
            })
        }
        return res.json({
            status:'success',
            result,
        })
    })
};

exports.addBlog=(req,res)=>{
    const {topic,description,posted_at,posted_by}=req.body;
    const blogData=new Blogs({topic,description,posted_at,posted_by});
    blogData.save((err,result)=>{
        if(err){
            return res.json({
                status:'failed'

            })
        }
        return res.json({
            status:'success',
            result,
        })
    })
};
exports.updateBlog=(req,res)=>{
    const {id}=req.params;
    const {topic,description,posted_at,posted_by}=req.body;
    Blogs.updateOne({_id:id},{topic,description,posted_at,posted_by}).exec((err,res)=>{
        if(err){
            res.json({
                status:'failed'
            })
        }
        return res.json({
            status:'success',
            result:{
                topic:topic,
                description,
                posted_at,
                posted_by
               
            }
        })
    })
};
exports.deleteBlog=(req,res)=>{
    const {id}=req.params;
    Blogs.findOneAndDelete({_id:id}).exec((err,result)=>{
        if(err){
            return res.json({
                status:"failed",
            })
        }
        return res.json({
            status:"success",
            result,
        })
    })
}