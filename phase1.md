# 3813ICT Full Stack Development Assignment

## Student Information

Name: Ethan Richmond

Student Number: s5414783

Workshop: 3813ICT 

---

# 1. Project Overview

The purpose of this project is to develop a full stack real-time chat application using the MEAN stack. The application allows users to communicate through groups and channels while administrators manage users, groups and channels.

---

# 2. Git Strategy

Git will be used as the projects main version control system and all code will be stored in a private GitHub repository. Development will be carried out using a feature branching statergy, where all new code for different features are implemented on seperate branches rather than on the main branch itself.

Feature branches will be created for major components such as login functionality, user management, group management, channel management, and user interface development. Once a feature has been completed and tested, it will be merged into the main branch and pushed to the remote repository. 

Frequent commits will also be made throughout the development process to provide a detailed history of the projects progress. This approach reduces the risk of losing code and demenstrates the development of the app over time.

---

# 3. Functional Requirements

The following Functional requirements were extracted from the Assignment PDF and the client meeting from week 2.

| ID | Requirement | Priority | 
|----|-------------|----------|
| FR1 | Users can send and recieve text and images | High |
| FR2 | Users must be able to register an account | High |
| FR3 | Users must be able to log in with an email and password | High |
| FR4 | Users who are currently in a room/channel will have the ability to see who else is in it | Medium |
| FR5 | Users can be members of multiple groups and can access all rooms in that group | High |
| FR6 | Group administrators will be able to remove people from groups | High |
| FR7 | Group administrators will be able to invite people to groups | High |
| FR8 | Group administrators will have the ability to create groups | High |
| FR9 | Logs of all Admin actions must be recorded | High |
| FR10 | The system must notify users when members join or leave a channel/room | Medium |
| FR11 | Users are only able to join rooms if they are apart of that group | High |
| FR12 | When a user joins a chat room up to 5 previous chat messages must be shown | Medium |
| FR13 | PNG, GIFS, JPEG, must all be able to be sent | Medium |
| FR14 | Groups can not be left without an admin | Medium |
| FR15 | Group admins have the ability to ban members from groups | High |
| FR16 | The system must ensure exactly one Super Administrator account exists. | High |
| FR17 | The system must automatically create a default Super Administrator account during first-time startup if none exists. | High |
| FR18 | The super admin has the ability to delete a users account from the system | High |
| FR19 | Super admins are unable to chat in the rooms | Medium |
| FR20 | Super admins are able to notify users through a notification system | Medium |
| FR21 | When a group admin creates a group they will set an age limit | Medium |
| FR22 | Users should be able to delete their message after they have sent it | Medium |
---

# 4. Data Structures

The application will use the following data strcture to store and manage information.

## User

A user represents a registered member of the system

'''typescript

{
    id: string,
    email: string,
    username: string ,
    password: string ,
    age: number,
    role: string

};

## Group 

A group contains users and channels

{
    id: string,
    name: string,
    description: string,
    ageLimit: number,
    colourTheme: string,
    members: string[],
    administrators: string[]
}

## Channel


{
    id: string,
    name: string,
    group_id: string
}

## Message

{
    id: string,
    senderID: string,
    channeID: string,
    content: string,
    imageURL: string,
    timestamp: Date
}

## Request
{
    id: string,
    requestType: string,
    userId: string,
    status: string,
    reason: string
}
---

# 5. Angular Architecture

## Components

### Login Component

### Register Component 

### Dashboard Component 

### Chat Component 

### Groups Component 

### Channels Component 

### Profile Component 

### Group Management Component 

### Channel Management Component

### Super Admin Component 

### Audit Log Component 

## Services

### AuthService

### UserService

### GroupService

### ChannelService

### ChatService

### AuditService

## Routes 



---

# 6. API Endpoints

The following endpoints are proposed for server-side functionality 

---

# 7. Storyboards

To be completed.