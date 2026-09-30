import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GroupService } from '../../services/group';

@Component({
  selector: 'app-groups',
  imports: [FormsModule],
  templateUrl: './groups.html',
  styleUrl: './groups.css',
})
export class Groups {

  constructor(
    private groupService: GroupService
  ) {}

  group = {
    title: '',
    description: '',
    ageLimit: 0,
    colourTheme: ''
  };

  submitGroupRequest() {

    const currentUser = JSON.parse(
      localStorage.getItem('currentUser') || '{}'
    );

    const groupRequest = {
      ...this.group,
      requestedBy: currentUser.id
    };

    console.log('Button clicked');
    console.log(groupRequest);

    this.groupService
      .createGroupRequest(groupRequest)
      .subscribe({

        next: (response: any) => {

          console.log('Success:', response);

          alert('Group Request Received');

          this.group = {
            title: '',
            description: '',
            ageLimit: 0,
            colourTheme: ''
          };

        },

        error: (error: any) => {

          console.error(error);

          alert('Failed to Submit Group Request');

        }

      });

  }

}