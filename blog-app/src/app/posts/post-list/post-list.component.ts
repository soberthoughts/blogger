import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/shared/models/post.model';
import { PostService } from '../post.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  isLoading = false;


  constructor(private postService: PostService, private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoading = true;

    setTimeout(() => {
      this.posts = this.postService.getPosts();
      console.log(this.posts);
      this.isLoading = false;
    }, 1000);
    
  }

  getAuthorName(userId: number): string {
    const user = this.authService.getUserById(userId);
    return user ? user.username : 'Unknown';
  }

}
