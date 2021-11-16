import {
  IPostResponse,
  IPostsResponse,
  IUserResponse,
} from 'src/interfaces/responses';

export const transformPostResponse = ({ _id, ...post }: IPostResponse) => ({
  id: _id,
  ...post,
});

export const transformPostsResponse = ({
  posts,
  totalCount,
}: IPostsResponse) => ({
  posts: posts.map(transformPostResponse),
  totalCount,
});

export const transformUserResponse = ({ _id, ...user }: IUserResponse) => ({
  id: _id,
  ...user,
});
