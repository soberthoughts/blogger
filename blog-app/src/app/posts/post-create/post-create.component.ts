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

  // metodo per la creazione di un post
  // controlla se il titolo e il corpo sono stati inseriti
  onSubmit(): void {
    if (!this.title || !this.body) {
      this.error = 'Title and body are required.';
      return;
    }

    // crea un nuovo post e reindirizza alla pagina dei post
    this.postService.addPost(this.title, this.body);
    this.router.navigate(['/posts']);
  }
}
