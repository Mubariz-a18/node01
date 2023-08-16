const Post = require('../models/postModel');

// Create a new post
module.exports.createPost = async (req, res, next) => {
    try {
      const { title, caption, imageUrl } = req.body;
      const userId = req.userId; // Assuming you have user authentication middleware
      const newPost = await Post.create({ title, caption, imageUrl, userId });
      res.status(201).json({ message: 'Post created successfully', post: newPost,status:true });
    } catch (error) {
      next(error);
    }
  };

// Get all posts with pagination
module.exports.getAllPosts = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const posts = await Post.find()
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .exec();
    res.status(200).json({ posts,status:true });
  } catch (error) {
    next(error);
  }
};

// Get details of a specific post
module.exports.getPostDetail = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found',status:false });
    }
    res.status(200).json({ post,status:true });
  } catch (error) {
    next(error);
  }
};

// Update a post
module.exports.updatePost = async (req, res, next) => {
    try {
      const postId = req.params.id;
      const userId = req.userId; 
      const { title, caption, imageUrl } = req.body;
  
      // Find the post and check if the requesting user is the author
      const post = await Post.findOne({ _id: postId, userId });
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found or unauthorized' ,status:false });
      }
  
      // Update the post fields
      post.title = title;
      post.caption = caption;
      post.imageUrl = imageUrl;
  
      // Save the updated post
      const updatedPost = await post.save();
  
      res.status(200).json({ message: 'Post updated successfully', post: updatedPost,status:true });
    } catch (error) {
      next(error);
    }
  };
  
  
  
  // Delete a post
  module.exports.deletePost = async (req, res, next) => {
    try {
      const postId = req.params.id;
      const userId = req.userId; // Assuming you have user authentication middleware
  
      // Find the post and check if the requesting user is the author
      const post = await Post.findOne({ _id: postId, userId });
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found or unauthorized' ,status:false});
      }
  
      // Delete the post
      await Post.deleteOne({ _id: postId, userId })
  
      res.status(200).json({ message: 'Post deleted successfully', status:false });
    } catch (error) {
      next(error);
    }
  };
  