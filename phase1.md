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

## Authentication Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| FR1 | Users must be able to register an account. | High |
| FR2 | Users must be able to log in using a username and password. | High |
| FR3 | The system must ensure exactly one Super Administrator account exists. | High |
| FR4 | The system must automatically create a default Super Administrator account during first-time startup if none exists. | High |

---

## Messaging Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| FR5 | Users can send and receive text messages. | High |
| FR6 | Users can send and receive image messages. | High |
| FR7 | Users must be able to send PNG, GIF and JPEG image files in chat channels. | Medium |
| FR8 | Users must be able to delete messages they have sent. | Medium |
| FR9 | When a user joins a channel, the previous five messages must be displayed. | Medium |
| FR10 | The system must notify users when members join or leave a channel. | Medium |
| FR11 | Users currently in a channel must be able to see other users present in that channel. | Medium |

---

## Group Management Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| FR12 | Users can be members of multiple groups and access channels within those groups. | High |
| FR13 | Users must be able to request membership to groups. | High |
| FR14 | Users must be able to submit requests for the creation of groups. | High |
| FR15 | Users must be able to view all available groups. | Medium |
| FR16 | Users below a group's age limit must not be allowed to join the group. | High |
| FR17 | If a group's age limit is increased, members below the new age limit must be automatically removed. | High |
| FR18 | Group creation requests must specify a minimum age limit. | Medium |
| FR19 | Groups must always have at least one Group Administrator. | Medium |

---

## Channel Management Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| FR20 | Users must only be able to join channels belonging to groups they are members of. | High |
| FR21 | Users must be able to request creation of new channels. | High |
| FR22 | Group Administrators must be able to approve or reject channel requests. | High |
| FR23 | Rejected channel requests must include a reason. | High |

---

## Group Administrator Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| FR24 | Group Administrators must be able to remove users from groups. | High |
| FR25 | Group Administrators must be able to ban users from groups. | High |
| FR26 | Group Administrators must be able to promote group members to Group Administrator status. | High |
| FR27 | Group Administrators must be able to demote other Group Administrators provided the group retains at least one administrator. | High |

---

## Super Administrator Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| FR28 | Super Administrators must be able to approve or reject group creation requests. | High |
| FR29 | Super Administrators must be able to permanently delete user accounts. | High |
| FR30 | Super Administrators must be able to view and filter audit logs. | High |
| FR31 | Super Administrators must be able to send system notifications to users. | Medium |
| FR32 | Super Administrators cannot participate in chat channels. | Medium |

---

## System Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| FR33 | Logs of all administrative actions must be recorded. | High |
| FR34 | Users, groups and channels must be persistently stored within the system. | High |

# 4. Data Structures

The application will use the following data strcture to store and manage information.

## User

A user represents a registered member of the system

```typescript
{
    id: string,
    email: string,
    username: string ,
    password: string ,
    age: number,
    role: string

}
```
## Group 

A group contains users and channels

```typescript
{
    id: string,
    name: string,
    description: string,
    ageLimit: number,
    colourTheme: string,
    members: string[],
    administrators: string[]
}
```
## Channel

```typescript
{
    id: string,
    name: string,
    group_id: string
}
```

## Message

```typescript
{
    id: string,
    senderID: string,
    channeID: string,
    content: string,
    imageURL: string,
    timestamp: Date
}
```
```typescript

## Request
{
    id: string,
    requestType: string,
    userId: string,
    status: string,
    reason: string
}
```
---

# 5. Angular Architecture

The application will follow Angular's component-based architecture. Components will manage the user interface, services will handle business logic and communication with the backend, and routing will provide navigation between pages.

## Components

### Login Component
Responsoble for user authentication and validation users credentials before giving them access to the system.

### Register Component 
Allows users the create an account and enter their required information.

### Dashboard Component 
Serves as the primary user interface after logging in and allows access to chatting, groups, and channels.

### Chat Component 
Handles user input such as texting, sending png images, or sending gifs. these are then displayed in the chat box.

### Groups Component 
Displays available groups to join and the ability to request membership or create group request.

### Channels Component 
Displays channels within the selected group and allows users to request to join new channels.

### Profile Component 
Allows users to view and edit their personal information.

### Group Management Component 
Provides the functionality for the Group admin to manage group members, approve request, and ban users.

### Channel Management Component
Allows group admins to approve or deny channel request and manage existing channels.

### Super Admin Component 
Provides system wide managemtn for the super administrator allowing them to ban users off the system.

### Audit Log Component 
Displays administrative activity logs and provides a search and filter functionality.

## Services

### AuthService
Handles user authentication, login, logout and session management 

### UserService
Manages user data including registration, profile updates and account retrieval

### GroupService
Handles group creation request, group retrieval and group management

### ChannelService
handles channel creation request, channel retrieval and channel administraion

### ChatService
handles message creation, retrieval and real time communication functionality.

### AuditService
Provides access to audit records and administrative activity logs.



---

# 6. server-based Endpoints

The following endpoints are proposed for server-side functionality , these endpoints support, user management, group management, channel management and messsaging functionality

## Authentication
POST /api/auth/login
Authenticate a user using a username and password

POST /api/auth/logout
Log out the current user

POST /api/auth/register
Register a new user account

## Users
GET /api/users
retrieve all users 

GET /api/users/:id
retrieve a specefic user

POST /api/users
create a new user

PUT /api/users/:id
update user details

DELETE /api/users/:id
delete a useers account

## Groups

GET /api/groups
Retrieve all groups.

GET /api/groups/:id
Retrieve a specific group.

POST /api/groups
Create a group request.

PUT /api/groups/:id
Update group details.

DELETE /api/groups/:id
Delete a group.

POST /api/groups/:id/join
Request membership to a group.

## Channels

GET /api/channels
Retrieve all channels.

GET /api/channels/:id
Retrieve a specific channel.

POST /api/channels
Create a channel request.

PUT /api/channels/:id
Update channel details.

DELETE /api/channels/:id
Delete a channel.

## Messages

GET /api/messages/:channelId
Retrieve messages for a channel.

POST /api/messages
Send a message.

DELETE /api/messages/:id
Delete a message.

## Administration

GET /api/admin/audit-logs
Retrieve audit log records.

GET /api/admin/requests
Retrieve pending requests.

POST /api/admin/requests/:id/approve
Approve a request.

POST /api/admin/requests/:id/reject
Reject a request.

DELETE /api/admin/users/:id
Permanently delete a user account.
---

# 7. Storyboards

The application will utilise a responsive design approach.

## Login Screen 
client/designs/Desktop_login_screen.png

## User Dashboard
client/designs/desktop_dashboard_screen.drawio.png

## Super Admin Dashboard
client/designs/Super_admin_dashboard.drawio.png

## Group Admin Dashboard
client/designs/group_admin_dashboard.drawio.png
