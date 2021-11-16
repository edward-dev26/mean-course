import { IJwtToken, IPost } from '.';

export type IPostResponse = Omit<IPost, 'id'> & { _id: string };

export interface IPostsResponse {
  totalCount: number;
  posts: Array<IPostResponse>;
}

export interface IPostDeleteResponse {
  message: string;
  postId: string;
}

export interface IUserResponse {
  _id: string;
  fullName: string;
  email: string;
}

export interface IAuthResponse {
  jwtToken: IJwtToken;
  user: IUserResponse;
}
