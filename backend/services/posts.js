const Post = require('../models/post');

class PostsService {
  async createPost(postData) {
    const post = new Post(postData);

    await post.save();

    return post;
  }

  async updatePost(id, creator, post) {
    const result = await Post.updateOne(
      {
        _id: id,
        creator,
      },
      post
    );

    return result.matchedCount !== 0;
  }

  async getPostById(id) {
    if (!id) {
      throw new Error("Post id wasn't provided!");
    }

    return await Post.findById(id);
  }

  async getPosts(page, pageSize) {
    const postsQuery = Post.find();

    if (!isNaN(page) && !isNaN(pageSize)) {
      postsQuery.skip(pageSize * page).limit(pageSize);
    }

    const posts = await postsQuery;
    const totalCount = await Post.count();

    return {
      posts,
      totalCount,
    };
  }

  async deletePost(id, creator) {
    const result = await Post.deleteOne({
      _id: id,
      creator,
    });

    return result.deletedCount !== 0;
  }
}

module.exports = new PostsService();
