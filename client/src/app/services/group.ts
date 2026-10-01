import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
    constructor(
        private http: HttpClient,
    ){}


    setCurrentGroup(group: any){
        localStorage.setItem('currentGroup',JSON.stringify(group))
    }

    getCurrentGroup(){
        
    }





    createGroupRequest(group: any){
        return this.http.post(
            'http://localhost:3000/api/group-requests',
            group
        )

    }

    getGroups(){

        return this.http.get(
            'http://localhost:3000/api/groups'
        )

    }

    getGroupRequests(){

        return this.http.get(
            'http://localhost:3000/api/group-requests',

        )

    }


    approveGroupRequest(id: string) {

    return this.http.post(
        `http://localhost:3000/api/group-requests/${id}/approve`,
        {}
    );

}

    rejectGroupRequest(id: string) {

    return this.http.post(
        `http://localhost:3000/api/group-requests/${id}/reject`,
        {}
    );

}};
