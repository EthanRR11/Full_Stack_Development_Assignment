import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // Added ChangeDetectorRef
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth';
import { GroupService } from '../../services/group';
import { ChannelService } from '../../services/channel';
import { MessageService } from '../../services/message';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, CommonModule, FormsModule],
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  currentGroup: any = null;
  currentChannel: any = null;
  messages: any[] = [];
  messageText = '';
  groups: any[] = [];
  channels: any[] = [];

  constructor(
    private router: Router,
    public authService: AuthService,
    private groupService: GroupService,
    private channelService: ChannelService,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit() {
    if (!this.authService.isloggedIn()) {
      this.router.navigate(['/']);
      return;
    }

    this.groupService
      .getGroups()
      .subscribe({
        next: (groups: any) => {
          console.log('API Returned:', groups);
          this.groups = groups;
          console.log('After Assign:', this.groups);
          this.cdr.detectChanges(); 
        }
      });
  }



  selectGroup(group: any) { 
    this.currentGroup = group;
    this.currentChannel = null;

    localStorage.setItem(
      'currentGroup',
      JSON.stringify(group)
    );

    this.channelService
      .getChannels(group.id)
      .subscribe((channels: any) => {
        this.channels = channels;
        this.cdr.detectChanges(); 
      });
  }

  selectChannel(channel: any) {
    this.currentChannel = channel;

    localStorage.setItem(
      'currentChannel',
      JSON.stringify(channel)
    );

    this.messageService
      .getMessages(channel.id)
      .subscribe((messages: any) => {
        this.messages = messages;
        this.cdr.detectChanges(); 
      });
  }

  sendMessage() {
    if (!this.currentChannel) {
      alert('Please select a channel');
      return;
    }

    const currentUser = this.authService.getCurrentUser();

    const newMessage = {
      senderID: currentUser.id,
      senderName: currentUser.username,
      channelID: this.currentChannel.id,
      content: this.messageText
    };

    this.messageService
      .sendMessage(newMessage)
      .subscribe(() => {
        this.messageText = '';
        this.messageService
          .getMessages(this.currentChannel.id)
          .subscribe((messages: any) => {
            this.messages = messages;
            this.cdr.detectChanges(); 
          });
      });
  }


  deleteMessage(id: string) {

  if (!confirm('Delete this message?')) {
    return;
  }

  this.messageService
    .deleteMessage(id)
    .subscribe(() => {

      this.messageService
        .getMessages(this.currentChannel.id)
        .subscribe((messages: any) => {

          this.messages = messages;

          this.cdr.detectChanges();

        });

    });

}
  logout() {
    this.authService.logout();
  }
}
