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

  currentPage = 1;
  postsPerPage = 5;

  constructor(private postService: PostService, private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoading = true;
    
    setTimeout(() => {
      this.loadPosts(this.currentPage);
      this.isLoading = false;
    }, 1000);
  }
    
  loadPosts(page: number): void {
    this.currentPage = page;
    this.postService.getPostsPaged(page, this.postsPerPage).subscribe(posts => {
      this.posts = posts;
    });
  }

  getAuthorName(userId: number): string {
    const user = this.authService.getUserById(userId);
    return user ? user.username : 'Unknown';
  }

  getPostImageUrl(post: Post): string {
    return post.imageUrl || 'https://via.placeholder.com/150';
  }

}
