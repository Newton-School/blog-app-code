const Blogs = require('./models');

exports.addblog=(req,res)=>{
    const{topic,description,posted_at,posted_by}=req.body;
    const blog = new Blogs({topic,description,posted_at,posted_by});
    blog.save((err,result)=>{
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


exports.deleteBlog = (req, res) => {
	const { id } = req.params;

	Blogs.findOneAndDelete({ _id: id }).exec((err, result) => {
		if (err) {
			return res.json({
				status: "failed",
			});
		}

		return res.json({
			status: "success",
			result,
		});
	});
};


exports.updateBlog = (req, res) =>{
    const{id} = req.params;
    const{topic,description,posted_at,posted_by}=req.body;
    
    Blogs.updateOne({_id:id},{topic,description,posted_at,posted_by}).exec((err,rresult)=>{
        if(err){
            return res.json({
                status:"failed",
            });
        }
        return res.json({
            status:"success",
            result: {
				topic,
				description,
				posted_at,
				posted_by,
			},
        });
    });
};


exports.getBlog = (req, res)=>{
    const {page,search}=req.query;
    Blogs.find({topic:{$regex:search,$option:"i"}})
         .skip((parseInt(page)-1)*5)
         .limit(5)
         .exec((err,result)=>{
        if(err){
            return res.json({
                status:"failed"
            })
        }
        return res.json({
            status:"success",
            result,
        });
    });
};