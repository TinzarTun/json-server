const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');
const auth = require('../middleware/auth');

router.get('/', postsController.getAllPosts); // /api/posts
router.get('/:id', postsController.getPostById); // /api/posts/:id
router.post('/', auth, postsController.createPost); // /api/posts
// to edit (PUT || PATCH)
router.put('/:id', auth, postsController.updatePost); // /api/posts/:id
router.delete('/:id', auth, postsController.deletePost); // /api/posts/:id

module.exports = router;