const blogApi = require('./schema');

exports.fetchBlogs = (req,res) => {
    const {page, search} = req.query;

    blogApi.find({topic:{$regex: search, $options: "i"}})
            .skip((parseInt(page)-1)*5)
            .limit(5)
            .exec((err,result) => {
                if(err) {
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

exports.addBlog = (req,res) => {
    const {topic, description, posted_at, posted_by} = req.body;

    const newBlog = new blogApi({topic, description, posted_by, posted_at});

    newBlog.save((err, result) => {
        if(err) {
            return res.json({
                status:"failed",
            });
        }

        return res.json({
            status: "success",
            result,
        });
    });
};

exports.updateBlog = (req,res) => {
    const {id} = req.params;
    const {topic, description, posted_by, posted_at} = req.body;

    blogApi.updateOne(
        {_id: id},
        {topic, description, posted_by, posted_at}
    ).exec ((err,result) => {
        if(err) {
            return res.json({
                status: "failed",
            });
        }

        return res.json({
            status: "success",
            result:{
                topic, 
                description,
                posted_by, 
                posted_at,
            },

        });
        
    });
};

exports.deleteBlog = (req,res) => {
    const {id} = req.params;

    blogApi.findOneAndDelete({_id:id}).exec((err, result) => {
        if(err || !result) {
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