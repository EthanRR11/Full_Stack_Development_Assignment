import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(
        private http: HttpClient
    ){}


    getUsers(){
        return this.http.get(
            'http://localhost:3000/api/users'
            
        )
    }

    getUser(id: string){
        return this.http.get(
            `http://localhost:3000/api/users/${id}`
        )
    }

    deleteUser(id: string){
        return this.http.delete(
            `http://localhost:3000/api/users/${id}`
        )

    }

}
