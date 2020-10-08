
const express = require('express');
const router = express.Router();
const{addBlog,deleteBlog,updateBlog, getBlog} = require('./controller');
router.post('/post/blog',addBlog);
router.delete('/delete/blog/:id',deleteBlog);
router.put('/update/blog/:id',updateBlog);
router.get('/allblog',getBlog);



module.exports=router;