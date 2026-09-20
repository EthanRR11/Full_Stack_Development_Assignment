import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
    constructor(
        private http: HttpClient,
    ){}

    createGrouprequests(group: any){
        return this.http.post(
            'http://localhost:3000/api/group-requests',
            group
        )

    }

    getGroups(){

        return this.http.get(
            'http://localhost:3000/api/group'
        )

    }

    getGroupRequests(){

        return this.http.get(
            'http://localhost:3000/api/group-requests',

        )

    }


    approveGroupRequest(id: number) {

    return this.http.post(
        `http://localhost:3000/api/group-requests/${id}/approve`,
        {}
    );

}

    rejectGroupRequest(id: number) {

    return this.http.post(
        `http://localhost:3000/api/group-requests/${id}/reject`,
        {}
    );

}};
