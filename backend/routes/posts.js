const express = require('express');

const multer = require('../middlewares/multer');
const auth = require('../middlewares/auth');
const postsController = require('../controllers/posts');

const router = express.Router();

router.post('', auth, multer.single('image'), postsController.createPost);
router.put('/:id', auth, multer.single('image'), postsController.updatePost);
router.get('', postsController.getPosts);
router.get('/:id', postsController.getPost);
router.delete('/:id', auth, postsController.deletePost);

module.exports = router;
