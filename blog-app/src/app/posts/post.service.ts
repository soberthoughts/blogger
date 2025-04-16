import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Post } from '../shared/models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts: Post[] = [
    { 
      id: 1,
      userId: 1, 
      title: 'Nuovo G Class', 
      body: 'Avventura ed eleganza si incontrano negli interni della Classe G, dove il DNA da fuoristrada e la tecnologia più all’avanguardia si fondono per un esperienza senza eguali. Qui, ogni dettaglio, dall MBUX all OFFROAD COCKPIT, è stato progettato per superare ogni aspettativa e per riconfermare Classe G come uno dei migliori fuoristrada al mondo, anche nella versione Full Electric.' 
    },
    { 
      id: 2,
      userId: 1, 
      title: 'Mazda MX-5, perché comprarla e perché no', 
      body: 'Può essere una spider a due posti l auto macchina definitiva? Sì, potete andarci a lavoro, a fare la spesa e nel weekend a divertirvi su una strada di montagna. O semplicemente a fare una passeggiata al mare o tra le colline. ' 
    },
    { 
      id: 3, 
      userId: 2, 
      title: 'Post prova', 
      body: 'Sed do eiusmod tempor incididunt' 
    }
  ];

  constructor(private authService: AuthService) { }

  //prendi tutti i posts
  getPosts() {
    return this.posts;
  }

  //aggiungi un post
  addPost(title: string, body: string): void {
    const user = this.authService.getCurrentUser();
    if (!user) return;
  
    const newPost = {
      id: this.posts.length + 1,
      userId: user.id,
      title,
      body
    };
  
    this.posts.unshift(newPost);
  }

  //prendi un post in base all'id
  getPostById(id: number) {
    return this.posts.find(post => post.id === id);
  }
  
}
