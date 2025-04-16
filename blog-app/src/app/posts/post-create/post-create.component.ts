import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
  title = '';
  body = '';
  imageUrl = '';
  currentUserId = 0;
  error = '';

  constructor(private postService: PostService, private router: Router) {}

  // metodo per la creazione di un post
  // controlla se il titolo e il corpo sono stati inseriti
  onSubmit(): void {
    if (this.isFormInvalid()) {
      // mostra un messaggio di errore se il titolo o il corpo non sono stati inseriti
      this.error = 'Title and body are required.';
      return;
    }

    this.currentUserId = this.postService.getCurrentUser().id;
    console.log('Current User ID:', this.currentUserId);

    // crea un nuovo post e reindirizza alla pagina dei post
    this.postService.addPost(this.title, this.body, this.imageUrl, this.currentUserId).subscribe(() => {
      this.router.navigate(['/posts']);
    });
  }

  private isFormInvalid(): boolean {
    return !this.title || !this.body || !this.imageUrl;
  }
}
