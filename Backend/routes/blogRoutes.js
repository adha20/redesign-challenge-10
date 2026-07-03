const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

// GET /api/blogs
router.get('/', blogController.getBlogs);

module.exports = router;
