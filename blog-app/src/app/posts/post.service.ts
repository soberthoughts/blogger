import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Post } from '../shared/models/post.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  
  private apiUrl = 'http://localhost:5088/api/posts'; // URL del backend

  private posts: Post[] = []; // Array di post fittizio

  constructor(private authService: AuthService, private http: HttpClient) { }

  //prendi tutti i posts
  getPosts() {
    return this.http.get<Post[]>(this.apiUrl);
    //return this.posts;
  }

  //aggiungi un post
  addPost(title: string, body: string, imageUrl: string, userId: number): Observable<Post> {
    const post = { title, body, userId, imageUrl }; // Fake userId for now
    console.log('Post aggiunto:', post);
    return this.http.post<Post>(this.apiUrl, post);
    
  }
  
  //trova l'utente corrente
  getCurrentUser() {
    return this.authService.getCurrentUser();
  }

  //prendi un post in base all'id
  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${id}`);
  }

  //prendi i commenti
  getCommentsByPostId(postId: number) {
    return this.http.get<any[]>(`${this.apiUrl}/${postId}/comments`);
  }

  //aggiungi un commento
  addComment(postId: number, body: string): Observable<any> {
    const comment = { body, userId: this.authService.getCurrentUser().id };
    return this.http.post<any>(`${this.apiUrl}/${postId}/comments`, comment);
  }

  //pagine
  getPostsPaged(page: number = 1, pageSize: number = 5): Observable<Post[]> {
    const params = `?page=${page}&pageSize=${pageSize}`;
    return this.http.get<Post[]>(`${this.apiUrl}${params}`);
  }
  
  
}
