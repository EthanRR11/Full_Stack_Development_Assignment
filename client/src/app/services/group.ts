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


    getGroupMembers(groupID: string) {

    return this.http.get(
    `http://localhost:3000/api/group-members/${groupID}`
  );

}

    getMembershipRequests(groupID: string) {

  return this.http.get(
    `http://localhost:3000/api/group-membership-requests/${groupID}`
  );

}


    createMembershipRequest(request: any) {

  return this.http.post(
    'http://localhost:3000/api/group-membership-requests',
    request
  );

}
    approveMembership(id: string) {

  return this.http.post(
    `http://localhost:3000/api/group-membership-requests/${id}/approve`,
    {}
  );

}

    rejectMembership(id: string) {

  return this.http.post(
    `http://localhost:3000/api/group-membership-requests/${id}/reject`,
    {}
  );

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
    removeMember(groupID: string,userID: string) {
        
    return this.http.post(
    'http://localhost:3000/api/group-members/remove',
    {
      groupID,
      userID
    }
  );

}

    rejectGroupRequest(id: string) {

    return this.http.post(
        `http://localhost:3000/api/group-requests/${id}/reject`,
        {}
    );
}};
