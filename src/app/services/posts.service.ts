import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { IPost, IPostSubject } from 'src/interfaces';
import {
  IPostDeleteResponse,
  IPostResponse,
  IPostsResponse,
} from 'src/interfaces/responses';
import {
  transformPostResponse,
  transformPostsResponse,
} from '../helpers/transformers';

const API_URL = `${environment.backendUrl}/api/posts/`;

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private posts: Array<IPost> = [];
  private totalCount: number = 0;
  private postsSubject = new Subject<IPostSubject>();

  constructor(private http: HttpClient) {
    this.postsSubject.subscribe(({ posts, totalCount }) => {
      this.posts = posts;
      this.totalCount = totalCount;
    });
  }

  getPosts(page: number, pageSize: number) {
    const params = new HttpParams({
      fromObject: {
        page,
        pageSize,
      },
    });

    this.http
      .get<IPostsResponse>(API_URL, {
        params,
      })
      .pipe(map(transformPostsResponse))
      .subscribe((postsData) => {
        this.postsSubject.next(postsData);
      });

    return this.postsSubject.asObservable();
  }

  getPost(postId: string) {
    return this.http
      .get<IPostResponse>(`${API_URL}${postId}`)
      .pipe(map(transformPostResponse));
  }

  getPostsObservable() {
    return this.postsSubject.asObservable();
  }

  addPost(postData: FormData) {
    return this.http.post<IPostResponse>(API_URL, postData).pipe(
      map(transformPostResponse),
      tap((post) => {
        this.postsSubject.next({
          posts: [...this.posts, post],
          totalCount: this.totalCount + 1,
        });
      })
    );
  }

  updatePost(postId: string, postData: FormData) {
    return this.http.put<IPostResponse>(`${API_URL}${postId}`, postData).pipe(
      map(transformPostResponse),
      tap((updatedPost) => {
        const postIndex = this.posts.findIndex((post) => post.id === postId);

        if (postIndex !== -1) {
          this.posts[postIndex] = updatedPost;
          this.postsSubject.next({
            posts: [...this.posts],
            totalCount: this.totalCount,
          });
        }
      })
    );
  }

  deletePost(postId: string) {
    this.http
      .delete<IPostDeleteResponse>(`${API_URL}${postId}`)
      .subscribe((response) => {
        if (response?.postId) {
          const updatedPosts = this.posts.filter((post) => post.id !== postId);

          this.postsSubject.next({
            posts: updatedPosts,
            totalCount: this.totalCount - 1,
          });
        }
      });
  }
}
