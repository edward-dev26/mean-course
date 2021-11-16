export interface IPost {
  title: string;
  content: string;
  imageUrl: string;
  id: string;
  creator: string;
}

export interface IPostSubject {
  totalCount: number;
  posts: Array<IPost>;
}

export interface IUser {
  id: string;
  fullName: string;
  email: string;
}

export interface INewUserData {
  fullName: string;
  email: string;
  password: string;
}

export interface ISignInData {
  email: string;
  password: string;
}

export interface IJwtToken {
  token: string;
  expiresIn: string;
}
