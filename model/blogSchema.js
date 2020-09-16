const mongoose=require('mongoose');

const blogSchema=new mongoose.Schema({
    topic:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    posted_at:{
        type:String
    },
    posted_by:{
        type:String
    },
    time : { type: Number, default: (new Date()).getTime() } 
})

module.exports=mongoose.model('blog',blogSchema);