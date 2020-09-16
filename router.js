const express=require('express');
const router=express.Router();
const {getBlogs,addBlog,updateBlog,deleteBlog}=require('./controller')
router.get('/allblog',getBlogs);
router.post('/post/blog',addBlog);
router.put('/update/blog/:id',updateBlog);
router.delete('/delete/blog/:id',deleteBlog);

module.exports=router;