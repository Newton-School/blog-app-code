const Blog = require("./model");

exports.getAllBlogs = (req,res) => {
    const {page, search} = req.query;

    Blog.find({topic:{$regex:search,$options:"i"}})
       .skip((parseInt(page)-1)*5)
       .limit(5)
       .exec((err,result)=>{
           if(err){
               return res.json({
                   status:"failed"
               });
           }

           return res.json({
               status:"success",
               result
           })
       })
};



exports.addBlog = (req,res) => {
    const {topic,
        description,
        posted_at,
        posted_by
    } = req.body;

  const newBlog = new Blog({topic,description,posted_at,posted_by});

  newBlog.save((err,result) => {
      if(err){
          return res.json({
              status:"failed"
          });
      }

     return res.json({
         status:"success",
         result
     });
  })

};


exports.updateBlog = (req,res) => {
    const { id } = req.params;
    const { 
        topic,
        description,
         posted_at,
        posted_by
    } = req.body;

    Blog.updateOne(
        {_id:id},
        {topic,description,posted_at,posted_by})
          .exec((err,result)=>{
              if(err){
                  return res.json({
                      status:"failed"
                  });
              }

              return res.json({
                  status:"success",
                  result:{
                      topic,
                      description,
                      posted_at,
                      posted_by
                  }
              })
          })
};


exports.deleteBlog = (req,res) => {
    const { id } = req.params;

    Blog.findOneAndDelete({_id:id})
           .exec((err,result)=>{
               if(err){
                   return res.json({
                       status:"failed"
                   });
               }

               return res.json({
                   status:"success",
                   result
               })
           })
};

