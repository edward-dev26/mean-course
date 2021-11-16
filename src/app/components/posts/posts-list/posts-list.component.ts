import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

import { LoaderService } from 'src/app/services/loader.service';
import { PostsService } from 'src/app/services/posts.service';
import { IPost } from 'src/interfaces';

@Component({
  selector: 'app-post-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Array<IPost> = [];
  isLoading: boolean = false;
  isAuth: boolean = false;
  private postSub?: Subscription;
  private authSub?: Subscription;

  page = 0;
  length = 4;
  pageSize = 5;
  pageSizeOptions = [5, 10, 20, 50];

  constructor(
    public postService: PostsService,
    public loaderService: LoaderService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.loaderService.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });

    this.authSub = this.authService.getAuthObservable().subscribe((isAuth) => {
      this.isAuth = isAuth;
    });

    this.getPosts(this.page, this.pageSize);
    this.isAuth = this.authService.isAuth;
  }

  ngOnDestroy() {
    this.postSub?.unsubscribe();
    this.authSub?.unsubscribe();
  }

  onDelete(postId: string) {
    this.postService.deletePost(postId);
  }

  getPosts(page: number, pageSize: number) {
    this.loaderService.setLoading(true);
    this.postSub = this.postService
      .getPosts(page, pageSize)
      .subscribe(({ posts, totalCount }) => {
        this.posts = posts;
        this.length = totalCount;
        this.loaderService.setLoading(false);
      });
  }

  onPageChange(pagination: PageEvent) {
    this.page = pagination.pageIndex;
    this.pageSize = pagination.pageSize;
    this.getPosts(pagination.pageIndex, pagination.pageSize);
  }
}
