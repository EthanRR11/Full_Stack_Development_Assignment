import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth';
import { GroupService } from '../../services/group';
import { ChannelService } from '../../services/channel';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  currentGroup: any = null;

  groups: any[] = [];
  channels: any[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private groupService: GroupService,
    private channelService: ChannelService
  ) {}

  ngOnInit() {

    if (!this.authService.isloggedIn()) {

      this.router.navigate(['/']);

      return;

    }

    this.groupService
      .getGroups()
      .subscribe((groups: any) => {

        this.groups = groups;

      });

  }

  selectGroup(group: any) {

    this.currentGroup = group;

    localStorage.setItem(
      'currentGroup',
      JSON.stringify(group)
    );

    this.channelService
      .getChannels(group.id)
      .subscribe((channels: any) => {

        this.channels = channels;

      });

  }

  logout() {

    this.authService.logout();

  }

}
