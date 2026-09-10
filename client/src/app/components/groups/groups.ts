import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-groups',
  imports: [FormsModule],
  templateUrl: './groups.html',
  styleUrl: './groups.css',
})
export class Groups {

  constructor(private http: HttpClient) {}

  group = {
    title: '',
    description: '',
    ageLimit: 0,
    colourTheme: ''
  };

 submitGroupRequest() {

  console.log('Button clicked');
  console.log(this.group);

  this.http.post(
    'http://localhost:3000/api/groups',
    this.group
  ).subscribe({
    next: (response) => {
      console.log('Success:', response);
      alert('Group Created');
    },
   error: (error) => {
  console.log(error);
  alert(JSON.stringify(error));
}
  });

}
}