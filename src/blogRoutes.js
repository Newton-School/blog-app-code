/** @format */

const express = require('express');
const blogController = require('./blogController');

const router = express.Router();

router.get('/allblog', blogController.getAll);
router.post('/post/blog', blogController.create);
router.put('/update/blog/:id', blogController.update);
router.delete('/delete/blog/:id', blogController.delete);

module.exports = router;
