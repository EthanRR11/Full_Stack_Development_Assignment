import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-channels',
  imports: [FormsModule],
  templateUrl: './channels.html',
  styleUrl: './channels.css'
})
export class Channels {

  constructor(private http: HttpClient) {}

  channel = {
    name: '',
    description: '',
  };

  submitChannelRequest() {

  this.http.post(
    'http://localhost:3000/api/channels',
    this.channel
  ).subscribe({
    next: (response) => {
      console.log(response);
      alert('Channel Created');
    },

      error: (error) => {
        console.error(error);
        alert('Error Creating Channel');
      }
    });

  }
}