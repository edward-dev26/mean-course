const postsService = require('../services/posts');
const { getFileUrl } = require('../helpers');

class PostsController {
  async createPost(req, res) {
    try {
      const post = await postsService.createPost({
        title: req.body.title,
        content: req.body.content,
        imageUrl: getFileUrl(req),
        creator: req.user._id,
      });

      res.status(201).send(post);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }

  async updatePost(req, res) {
    try {
      const { title, content } = req.body;
      const imageUrl = req.file ? getFileUrl(req) : req.body.image;

      const isUpdated = await postsService.updatePost(
        req.params.id,
        req.user._id,
        {
          title,
          content,
          imageUrl,
        }
      );

      if (!isUpdated) {
        return res.status(403).send({
          message: 'Permissions denied!',
        });
      }

      const post = await postsService.getPostById(req.params.id);

      res.status(200).send(post);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }

  async getPosts(req, res) {
    try {
      const pageSize = parseInt(req.query.pageSize);
      const page = parseInt(req.query.page);

      const result = await postsService.getPosts(page, pageSize);

      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).send();
    }
  }

  async getPost(req, res) {
    try {
      const post = await postsService.getPostById(req.params.id);

      if (!post) {
        return res.status(404).send({
          message: 'Post not found',
        });
      }

      res.status(200).send(post);
    } catch (error) {
      console.log(error);
      res.status(500).send();
    }
  }

  async deletePost(req, res) {
    try {
      const isDeleted = await postsService.deletePost(
        req.params.id,
        req.user._id
      );

      if (!isDeleted) {
        return res.status(403).send({
          message: 'Permissions denied!',
        });
      }

      res.status(200).send({
        message: 'Post deleted successfully!',
        postId: req.params.id,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send();
    }
  }
}

module.exports = new PostsController();
