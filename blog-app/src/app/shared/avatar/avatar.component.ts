import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent {
  @Input() name: string = '';

  constructor() { }

  getInitials(): string {
    if (!this.name) return '?';
    const names = this.name.trim().split(' ');
    return names.map(n => n[0]).join('').toUpperCase();
  }

}
