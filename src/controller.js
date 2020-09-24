const Blog = require("./model");

exports.getAllBlogs = async(req,res) => {
    const {page, search} = req.query;

    await Blog.find({topic:{$regex:search,$options:"i"}})
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



exports.addBlog = async(req,res) => {
    const {topic,
        description,
        posted_at,
        posted_by
    } = req.body;

  const newBlog = new Blog({topic,description,posted_at,posted_by});

  await newBlog.save((err,result) => {
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


exports.updateBlog = async (req,res) => {
    const { id } = req.params;
    const { 
        topic,
        description,
         posted_at,
        posted_by
    } = req.body;

    await Blog.updateOne(
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


exports.deleteBlog = async(req,res) => {
    const { id } = req.params;

   await Blog.findOneAndDelete({_id:id})
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

