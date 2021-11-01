import { Component, Input } from "@angular/core";

import { Post } from "src/interfaces";

@Component({
  selector: 'app-post-list',
  templateUrl: './posts-list.component.html',
  styleUrls: [
    './posts-list.component.css',
  ]
})
export class PostListComponent {
  @Input() posts: Array<Post> = [];
};
