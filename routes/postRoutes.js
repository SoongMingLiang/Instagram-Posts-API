//Import modules
const express = require('express');
const postController = require('../controllers/postController');

//Initialize express router
const router = express.Router();

//Routes
router.post('/new', postController.createNewPost);

//Export express router
module.exports = router;