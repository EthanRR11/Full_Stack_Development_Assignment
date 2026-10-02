import { Injectable } from '@angular/core';

import { io, Socket } from 'socket.io-client';

@Injectable({
    providedIn: 'root'
})
export class SocketService {

    socket: Socket;

    constructor() {

        this.socket = io(
            'http://localhost:3000'
        );

    }

    joinChannel(channelID: string, username: string) {

        this.socket.emit(
            'join-channel',
            {
                channelID,
                username
            }
        );

    }

    leaveChannel(
        channelID: string,
        username: string
    ) {

        this.socket.emit(
            'leave-channel',
            {
                channelID,
                username
            }
        );

    }

    sendMessage(message: any) {

        this.socket.emit(
            'send-message',
            message
        );

    }

}