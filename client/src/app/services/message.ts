import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class MessageService {
    constructor(
        private http: HttpClient
    ){}


    sendMessage(message: any){
        return this.http.post('http://localhost:3000/api/messages',
            message
        )
    }

    getMessages(channelID: string){
        return this.http.get(`http://localhost:3000/api/messages/${channelID}`)
    }

    deleteMessage(id: string){
        return this.http.delete(`http://localhost:3000/api/messages/${id}`)
    }
}

