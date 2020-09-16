const {model,Schema}=require('mongoose');

const BlogSchema=new Schema({
    topic:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    posted_at:{
        type:String,
        required:true,
        trim:true
    },
    posted_by:{
        type:String,
        required:true,
        trim:true
    }
});
module.exports=model('blog',BlogSchema)
