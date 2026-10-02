import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { Router, RouterLink } from '@angular/router';

import { SocketService } from '../../services/socket'
import { AuthService } from '../../services/auth';
import { GroupService } from '../../services/group';
import { ChannelService } from '../../services/channel';
import { MessageService } from '../../services/message';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [
    RouterLink,
    CommonModule,
    FormsModule
  ],
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  onlineUsers: string[] = [];

  currentGroup: any = null;

  currentChannel: any = null;

  messages: any[] = [];

  messageText = '';

  groups: any[] = [];

  channels: any[] = [];

  membershipRequests: any[] = [];

  channelRequests: any[] = [];

  groupMembers: any[] = [];

  constructor(
    private router: Router,
    public authService: AuthService,
    private groupService: GroupService,
    private channelService: ChannelService,
    private messageService: MessageService,
    private socketService: SocketService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {

    if (!this.authService.isloggedIn()) {

      this.router.navigate(['/']);

      return;

    }

    this.groupService
      .getGroups()
      .subscribe({
        next: (groups: any) => {

          this.groups = groups;

          this.cdr.detectChanges();

        }
      });

    this.socketService.socket.on('receive-message',
        (message: any) => {

          if (
            this.currentChannel &&
            message.channelID ===
            this.currentChannel.id
          ) {

            this.messages.push(
              message
            );

            this.cdr.detectChanges();

          }

        }
      );

    this.socketService.socket.on('user-joined',(data: any) => {

        console.log('USER JOINED', data);

        this.messages.push({

          senderName: 'System',

          content: `${data.username} joined the channel`

        });

        this.cdr.detectChanges();

      }
    );

    this.socketService.socket.on('user-left',(data: any) => {

        this.messages.push({

          senderName: 'System',

          content:
            `${data.username} left the channel`

        });

        this.cdr.detectChanges();

      }
    );

    this.socketService.socket.on('membership-request-created',(request: any) => {

        if (
          this.currentGroup &&
          request.groupID ===
          this.currentGroup.id
        ) {

          this.membershipRequests.push(
            request
          );

          this.cdr.detectChanges();

        }

      }
    );

    this.socketService.socket.on('online-users',(users: string[]) => {

        this.onlineUsers = users;

        this.cdr.detectChanges();

      }
    );

  }

  selectGroup(group: any) {

    this.currentGroup = group;

    this.currentChannel = null;

    this.messages = [];

    localStorage.setItem(
      'currentGroup',
      JSON.stringify(group)
    );

    this.channelService
      .getChannels(group.id)
      .subscribe((channels: any) => {

        this.channels = channels;

        if (this.isAdmin(group)) {

          this.loadAdminData();

        }

        this.cdr.detectChanges();

      });

  }

  selectChannel(channel: any) {

    if (
      this.currentChannel &&
      this.currentChannel.id !== channel.id
    ) {

      this.socketService.leaveChannel(
        this.currentChannel.id,
        this.authService
          .getCurrentUser()
          .username
      );

    }

    this.currentChannel = channel;

    this.socketService.joinChannel(
      channel.id,
      this.authService
        .getCurrentUser()
        .username
    );

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

    const currentUser =
      this.authService.getCurrentUser();

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

        this.socketService.sendMessage(newMessage);

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

  isMember(group: any): boolean {

    const currentUser =
      this.authService.getCurrentUser();

    return (
      group.members &&
      group.members.includes(currentUser.id)
    );

  }

  requestMembership(group: any) {

    const currentUser =
      this.authService.getCurrentUser();

    const request = {

      groupID: group.id,

      userID: currentUser.id

    };

    this.groupService
      .createMembershipRequest(request)
      .subscribe(() => {

        alert(
          'Membership request submitted'
        );

      });

  }

  isAdmin(group: any): boolean {

    const currentUser =
      this.authService.getCurrentUser();

    return (
      group.admins &&
      group.admins.includes(currentUser.id)
    );

  }

  loadAdminData() {

    if (!this.currentGroup) {

      return;

    }

    this.groupService
      .getMembershipRequests(
        this.currentGroup.id
      )
      .subscribe((requests: any) => {

        this.membershipRequests =
          requests;

        this.cdr.detectChanges();

      });

    this.channelService
      .getChannelRequests(
        this.currentGroup.id
      )
      .subscribe((requests: any) => {

        this.channelRequests =
          requests;

        this.cdr.detectChanges();

      });

    this.groupService
      .getGroupMembers(
        this.currentGroup.id
      )
      .subscribe((members: any) => {

        this.groupMembers = members;

        this.cdr.detectChanges();

      });

  }

  approveMembership(id: string) {

    this.groupService
      .approveMembership(id)
      .subscribe(() => {

        this.loadAdminData();

      });

  }

  rejectMembership(id: string) {

    this.groupService
      .rejectMembership(id)
      .subscribe(() => {

        this.loadAdminData();

      });

  }

  approveChannel(id: string) {

    this.channelService
      .approveChannelRequests(id)
      .subscribe(() => {

        this.loadAdminData();

      });

  }

  rejectChannel(id: string) {

    this.channelService
      .rejectChannelRequests(id)
      .subscribe(() => {

        this.loadAdminData();

      });

  }


  removeMember(userID: string) {

    if (!confirm('Remove this member?')) {

      return;

    }

    this.groupService
      .removeMember(
        this.currentGroup.id,
        userID
      )
      .subscribe(() => {

        this.loadAdminData();

      });

  }

  logout() {

    this.authService.logout();

  }
}