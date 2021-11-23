const postsService = require('../services/posts');
const fileUploadService = require('../services/upload-files');

class PostsController {
  async createPost(req, res) {
    try {
      const filename = await fileUploadService.uploadFile(req.file);

      const post = await postsService.createPost({
        title: req.body.title,
        content: req.body.content,
        imageUrl: this.#getImageUrl(filename),
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
      let imageUrl = '';

      if (req.file) {
        const filename = await fileUploadService.uploadFile(req.file);

        imageUrl = this.#getImageUrl(filename);
      } else {
        imageUrl = req.body.image.replace(this.#getHost(req), '');
      }

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
      const host = this.#getHost(req);

      const result = await postsService.getPosts(page, pageSize, host);

      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).send();
    }
  }

  async getPost(req, res) {
    try {
      const host = this.#getHost(req);
      const post = await postsService.getPostById(req.params.id, host);

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

  async getImage(req, res) {
    try {
      const image = await fileUploadService.getFile(req.params.key);

      res.status(200).send(image);
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

  #getImageUrl(filename) {
    return `/api/posts/images/${filename}`;
  }

  #getHost(req) {
    return `${req.protocol}://${req.get('host')}`;
  }
}

module.exports = new PostsController();
