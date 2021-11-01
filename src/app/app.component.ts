import { Component } from '@angular/core';
import { Post } from 'src/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  posts: Array<Post> = [];

  onAddPost(post: Post) {
    this.posts.push(post);
  }
}
