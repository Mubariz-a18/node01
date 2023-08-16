const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { verifyJwtToken } = require('../Utils/jwtAuth');

// Create a new post
router.post('/create', verifyJwtToken ,postController.createPost);

// Get all posts with pagination
router.get('/all', verifyJwtToken , postController.getAllPosts);

// Get details of a specific post
router.get('/:id', verifyJwtToken , postController.getPostDetail);

// Update a post
router.put('/:id', verifyJwtToken , postController.updatePost);

// delete
router.delete('/:id', verifyJwtToken , postController.deletePost);

module.exports = router;