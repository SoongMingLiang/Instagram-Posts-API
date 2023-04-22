//Import modules
const express = require('express');
const postController = require('../controllers/postController');

//Initialize express router
const router = express.Router();

//Routes
router.get('/', postController.getAllPosts);
router.post('/new', postController.createNewPost);
router.get('/:id', postController.getOnePost);
router.delete('/:id', postController.deletePost);

//Export express router
module.exports = router;