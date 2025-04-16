import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/shared/models/post.model';
import { PostService } from '../post.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  post: Post | null = null;
  comments: any[] = [];
  newComment: string = '';

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    const postId = Number(this.route.snapshot.paramMap.get('id'));
    this.postService.getPostById(postId).subscribe(post => {
      this.post = post;
    });
    this.postService.getCommentsByPostId(postId).subscribe(comments => {
      console.log('COMMENTS LOADED:', comments);
      this.comments = comments;
    });
  }

  // metodo per ottenere il nome dell'autore
  getAuthorName(userId: number): string {
    const user = this.authService.getUserById(userId);
    return user ? user.name : 'Unknown';
  }

  // aggiungere un commento
  addComment(): void {
    const body = this.newComment.trim();
  
    if (!body || !this.post) return;
  
    this.postService.addComment(this.post.id, body).subscribe({
      next: () => {
        this.postService.getCommentsByPostId(this.post.id).subscribe(comments => {
          this.comments = comments;
        });
        this.newComment = '';
      },
      error: err => {
        console.error('Failed to add comment', err);
      }
    });
  }
  

}
