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

  async getPostById(id, host) {
    if (!id) {
      throw new Error("Post id wasn't provided!");
    }

    return await Post.findById(id).lean().transform(this.#transformPost(host));
  }

  async getPosts(page, pageSize, host) {
    const postsQuery = Post.find()
      .lean()
      .transform((posts) => posts.map(this.#transformPost(host)));

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

  #transformPost(host) {
    return (post) => ({
      ...post,
      imageUrl: `${host}${post.imageUrl}`,
    });
  }
}

module.exports = new PostsService();
