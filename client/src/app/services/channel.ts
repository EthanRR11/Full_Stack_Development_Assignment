import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  constructor(
    private http: HttpClient,
  ){}

  createChannelRequests(channel: any){
    return this.http.post(
      'http://localhost:3000/api/channel-creation-requests',
      channel

    )

  }

  getChannelRequests(){
    return this.http.get(
      'http://localhost:3000/api/channel-creation-requests',
    )

  }

  getChannels( groupId: string){
    return this.http.get(
      `http://localhost:3000/api/channels/${groupId}`,
    )

  }

  approveChannelRequests(id: string){
    return this.http.post(
      `http://localhost:3000/api/channel-creation-requests/${id}/approve`,
      {}
    );

  }

  rejectChannelRequests(id: string){
    return this.http.post(
      `http://localhost:3000/api/channel-creation-requests/${id}/reject`,
      {}
    )

  }
}
