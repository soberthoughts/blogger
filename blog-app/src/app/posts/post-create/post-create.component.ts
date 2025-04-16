import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html'
})
export class PostCreateComponent {
  title = '';
  body = '';
  error = '';

  constructor(private postService: PostService, private router: Router) {}

  onSubmit(): void {
    if (!this.title || !this.body) {
      this.error = 'Title and body are required.';
      return;
    }

    this.postService.addPost(this.title, this.body);
    this.router.navigate(['/posts']);
  }
}
