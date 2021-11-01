import { Component, EventEmitter, Output } from "@angular/core";

import { Post } from "src/interfaces";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: [
    './post-create.component.css'
  ]
})
export class PostCreateComponent {
  title = '';
  content = '';

  @Output() addPost = new EventEmitter<Post>();

  onAddPost() {
    const post: Post = {
      title: this.title,
      content: this.content,
    };

    this.addPost.emit(post);
  }
};
