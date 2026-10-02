# 3813ICT Full Stack Development Assignment

## Student Information

Name: Ethan Richmond

Student Number: s5414783

Workshop: 3813ICT 

---

# 1. Requirements

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

# 2. API Documentation 

## Authentication Endpoints

### Register User

**Endpoint**

```http
POST /api/register
```

**Description**

Registers a new user account.

**Request Body**

```json
{
  "email": "user@email.com",
  "username": "ethan",
  "password": "password123",
  "dateOfBirth": "2005-01-01",
  "role": "user"
}
```

**Response**

```json
{
  "message": "User Registered"
}
```

---

### Login

**Endpoint**

```http
POST /api/login
```

**Description**

Authenticates a user using BCrypt password validation.

**Request Body**

```json
{
  "username": "ethan",
  "password": "password123"
}
```

**Response**

Returns the authenticated user object.

---

### Bootstrap Check

**Endpoint**

```http
GET /api/bootstrap-check
```

**Description**

Checks whether a Super Administrator account exists.

---

### Bootstrap Super Administrator

**Endpoint**

```http
POST /api/bootstrap
```

**Description**

Creates a Super Administrator account if one does not already exist.

---

# Group Endpoints

### Create Group

**Endpoint**

```http
POST /api/groups
```

**Description**

Creates a new group.

---

### Get Groups

**Endpoint**

```http
GET /api/groups
```

**Description**

Returns all groups stored within the system.

---

### Create Group Request

**Endpoint**

```http
POST /api/group-requests
```

**Description**

Creates a request for a new group.

---

### Get Group Requests

**Endpoint**

```http
GET /api/group-requests
```

**Description**

Returns all pending group requests.

---

### Approve Group Request

**Endpoint**

```http
POST /api/group-requests/:id/approve
```

**Description**

Approves a group request and creates the corresponding group.

**Side Effects**

- Creates group
- Adds requester to group members
- Adds requester to group administrators
- Promotes requester to Group Administrator
- Creates audit log entry

---

### Reject Group Request

**Endpoint**

```http
POST /api/group-requests/:id/reject
```

**Description**

Rejects a group request.

---

# Group Membership Endpoints

### Create Membership Request

**Endpoint**

```http
POST /api/group-membership-requests
```

**Description**

Allows a user to request access to a group.

**Validation Rules**

- User age is calculated from date of birth.
- User must satisfy the group minimum age requirement.
---

### Get Membership Requests

**Endpoint**

```http
GET /api/group-membership-requests/:groupID
```

**Description**

Returns all pending membership requests for a specified group.

---

### Approve Membership Request

**Endpoint**

```http
POST /api/group-membership-requests/:id/approve
```

**Description**

Approves a membership request and adds the user to the group's member list.

**Side Effects**

- Creates audit log entry

---

### Reject Membership Request

**Endpoint**

```http
POST /api/group-membership-requests/:id/reject
```

**Description**

Rejects a membership request.

**Side Effects**

- Creates audit log entry

---

### Get Group Members

**Endpoint**

```http
GET /api/group-members/:groupID
```

**Description**

Returns all members belonging to a specified group.

---

### Remove Group Member

**Endpoint**

```http
POST /api/group-members/remove
```

**Description**

Removes a member from a group.

**Side Effects**

- Creates audit log entry

---

# Channel Endpoints

### Create Channel

**Endpoint**

```http
POST /api/channels
```

**Description**

Creates a channel.

---

### Get Channels

**Endpoint**

```http
GET /api/channels/:groupId
```

**Description**

Returns all channels belonging to the specified group.

---

### Create Channel Request

**Endpoint**

```http
POST /api/channel-creation-requests
```

**Description**

Creates a request for a new channel.

---

### Get Channel Requests

**Endpoint**

```http
GET /api/channel-creation-requests/:groupID
```

**Description**

Returns all pending channel creation requests for a group.

---

### Approve Channel Request

**Endpoint**

```http
POST /api/channel-creation-requests/:id/approve
```

**Description**

Approves a channel request and creates the channel.

**Side Effects**

- Creates audit log entry

---

### Reject Channel Request

**Endpoint**

```http
POST /api/channel-creation-requests/:id/reject
```

**Description**

Rejects a channel request.

---

# Message Endpoints

### Send Message

**Endpoint**

```http
POST /api/messages
```

**Description**

Stores a message within a channel.

**Request Body**

```json
{
  "senderID": "123",
  "senderName": "ethan",
  "channelID": "456",
  "content": "Hello World"
}
```

---

### Get Messages

**Endpoint**

```http
GET /api/messages/:channelID
```

**Description**

Returns the five most recent messages from a channel.

Messages are sorted by timestamp and returned from oldest to newest.

---

### Delete Message

**Endpoint**

```http
DELETE /api/messages/:id
```

**Description**

Deletes a message from the database.

---

# User Administration Endpoints

### Get Users

**Endpoint**

```http
GET /api/users
```

**Description**

Returns all registered users.

---

### Get Specific User

**Endpoint**

```http
GET /api/users/:userid
```

**Description**

Returns information for a specific user.

---

### Delete User

**Endpoint**

```http
DELETE /api/users/:userid
```

**Description**

Deletes a user account.

**Side Effects**

- Creates audit log entry

---

# Audit Log Endpoints

### Get Audit Logs

**Endpoint**

```http
GET /api/audit-logs
```

**Description**

Returns all audit logs sorted by timestamp in descending order.

Audit logs are automatically created when:

- Group requests are approved
- Membership requests are approved
- Membership requests are rejected
- Channel requests are approved
- Group members are removed
- Users are deleted

---

# Socket.IO Events

## join-channel

Allows users to join a channel room.


---

## leave-channel

Allows users to leave a channel room.


---

## send-message

Broadcasts a chat message to all users connected to a channel.

---

## receive-message

Receives a real-time message from the server.

---

## user-joined

Notifies channel members when a user joins.

---

## user-left

Notifies channel members when a user leaves.

---

## online-users

Returns the list of users currently connected to a channel.



# 3. Angular Components, Services, and Models

## Angular Components

### Login Component

**Purpose**

Allows users to authenticate and access the system.

**Responsibilities**

- User login
- Input validation
- Authentication requests
- Navigation after successful login

---

### Register Component

**Purpose**

Allows new users to create an account.

**Responsibilities**

- User registration
- Date of birth collection
- Input validation
- Account creation

---

### Dashboard Component

**Purpose**

Serves as the primary user interface after login.

**Responsibilities**

- Display available groups
- Display channels within selected groups
- Real-time messaging
- Real-time online users display
- Join and leave channel management
- Membership request management
- Channel request management
- Group administration functionality (if a group admin)

---

### Groups Component

**Purpose**

Allows users to create group requests.

**Responsibilities**

- Submit group creation requests
- Collect group information
- Send requests to the server

---

### Channels Component

**Purpose**

Allows users to submit channel requests.

**Responsibilities**

- Submit channel requests
- Associate channels with groups
- Send requests to server

---

### Admin Dashboard Component

**Purpose**

Provides administrative functionality for Super Administrators.

**Responsibilities**

- Manage users
- Approve and reject group requests
- View audit logs
- User removal

---

---

## Angular Services

### AuthService

**Purpose**

Handles authentication and user session management.

**Functions**

- Register users
- Login users
- Logout users
- Store current user
- Retrieve current user
- Check authentication status

---

### GroupService

**Purpose**

Handles all group-related operations.

**Functions**

- Retrieve groups
- Create membership requests
- Approve membership requests
- Reject membership requests
- Retrieve group members
- Remove group members

---

### ChannelService

**Purpose**

Handles all channel-related operations.

**Functions**

- Retrieve channels
- Create channel requests
- Retrieve pending channel requests
- Approve channel requests
- Reject channel requests

---

### MessageService

**Purpose**

Handles chat messaging functionality.

**Functions**

- Send messages
- Retrieve messages
- Delete messages

---

### SocketService

**Purpose**

Provides real-time communication functionality using Socket.IO.

**Functions**

- Join channels
- Leave channels
- Send real-time messages
- Receive real-time messages
- Receive join notifications
- Receive leave notifications
- Update online user list

---

## Data Models

### User Model

```typescript
{
    id: string,
    email: string,
    username: string,
    password: string,
    dateOfBirth: string,
    role: string
}
```

**Description**

Represents a user account within the system.

---

### Group Model

```typescript
{
    id: string,
    title: string,
    description: string,
    ageLimit: number,
    colourTheme: string,
    members: string[],
    admins: string[]
}
```

**Description**

Represents a discussion group.

---

### Group Request Model

```typescript
{
    id: string,
    title: string,
    description: string,
    ageLimit: number,
    colourTheme: string,
    requestedBy: string,
    status: string
}
```

**Description**

Represents a pending request to create a group.

---

### Membership Request Model

```typescript
{
    id: string,
    groupID: string,
    userID: string,
    status: string,
    createdAt: Date
}
```

**Description**

Represents a request for a user to join a group.

---

### Channel Model

```typescript
{
    id: string,
    name: string,
    description: string,
    groupID: string
}
```

**Description**

Represents a communication channel within a group.

---

### Channel Request Model

```typescript
{
    id: string,
    name: string,
    description: string,
    groupID: string,
    requestedBy: string,
    status: string
}
```

**Description**

Represents a pending channel creation request.

---

### Message Model

```typescript
{
    id: string,
    senderID: string,
    senderName: string,
    channelID: string,
    content: string,
    timestamp: Date
}
```

**Description**

Represents a chat message sent within a channel.

---

### Audit Log Model

```typescript
{
    id: string,
    action: string,
    performedBy: string,
    timestamp: Date
}
```

**Description**

Represents an administrative action performed within the system.

---


# 4. Design Documents

## Login Screen 
client/designs/Desktop_login_screen.png

## User Dashboard
client/designs/desktop_dashboard_screen.drawio.png

## Super Admin Dashboard
client/designs/Super_admin_dashboard.drawio.png

## Group Admin Dashboard
client/designs/group_admin_dashboard.drawio.png

# 5. Description of testing tools/methodology used and a table listing the automated tests performed



