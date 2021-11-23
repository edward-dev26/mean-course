const express = require('express');

const multer = require('../middlewares/multer');
const auth = require('../middlewares/auth');
const postsController = require('../controllers/posts');

const router = express.Router();

router.post(
  '',
  auth,
  multer.single('image'),
  postsController.createPost.bind(postsController)
);
router.put(
  '/:id',
  auth,
  multer.single('image'),
  postsController.updatePost.bind(postsController)
);
router.get('', postsController.getPosts.bind(postsController));
router.get('/:id', postsController.getPost.bind(postsController));
router.get('/images/:key', postsController.getImage.bind(postsController));
router.delete('/:id', auth, postsController.deletePost.bind(postsController));

module.exports = router;
