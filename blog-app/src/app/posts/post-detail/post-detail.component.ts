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
  comments: { postId:number, userId: number, body:string }[] = [];
  newComment: string = '';

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    const postId = Number(this.route.snapshot.paramMap.get('id'));
    this.post = this.postService.getPostById(postId);
    this.comments = this.postService.getCommentsByPostId(postId);
  }

  // metodo per ottenere il nome dell'autore
  getAuthorName(userId: number): string {
    const user = this.authService.getUserById(userId);
    return user ? user.name : 'Unknown';
  }

  // aggiungere un commento
  addComment(): void {
    if (this.newComment.trim()) {
      this.postService.addComment(this.post!.id, this.newComment);
      this.comments = this.postService.getCommentsByPostId(this.post!.id); // reload
      this.newComment = '';
    }
  }

}
