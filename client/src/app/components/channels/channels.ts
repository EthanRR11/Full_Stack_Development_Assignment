import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChannelService } from '../../services/channel';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-channels',
  imports: [FormsModule],
  templateUrl: './channels.html',
  styleUrl: './channels.css'
})
export class Channels {

  constructor(
    private channelService: ChannelService,
    private authService: AuthService,
    private router: Router
  ) {}

  channel = {
    name: '',
    description: ''
  };

  submitChannelRequest() {

    const currentUser =
      this.authService.getCurrentUser();

    const currentGroup = JSON.parse(
      localStorage.getItem('currentGroup') || '{}'
    );

    const channelRequest = {
      ...this.channel,
      groupID: currentGroup.id,
      requestedBy: currentUser.id
    };

    this.channelService
      .createChannelRequests(channelRequest)
      .subscribe({

        next: (response: any) => {

          console.log(response);

          alert('Channel Request Submitted');
          this.router.navigate(['/dashboard'])

          this.channel = {
            name: '',
            description: ''
          };

        },

        error: (error: any) => {

          console.error(error);

          alert('Failed to Submit Channel Request');

        }

      });

  }

}