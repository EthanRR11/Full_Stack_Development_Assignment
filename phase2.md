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

# 3. Angular Components, Services, and Models

# 4. Design Documents

# 5. Description of testing tools/methodology used and a table listing the automated