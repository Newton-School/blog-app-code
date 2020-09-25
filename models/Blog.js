const mongoose  = require('mongoose')

const BlogSchema = mongoose.Schema({
    topic:{
      type:String,
      required:true
    },
    description:{
      type:String,
      require:true
    },
    posted_at:{
      type : Date,
      default:Date.now
    },
    posted_by : {
      type:String,
      required:true
    }
    
});

module.exports = mongoose.model("Blogs",BlogSchema)