const express = require('express');
const cors = require('cors');
const fs = require('fs');
const { MongoClient } = require('mongodb');

const app = express();

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const dbName = 'chatapp';

async function main() {
    await client.connect();
    console.log('Connected succesfully to server')

    const db = client.db(dbName);

    return db;
}

app.use(cors());
app.use(express.json());

/* ------------------------------
   Server Test Route
------------------------------ */

app.get('/', (req, res) => {
    res.send('Server Running');
});

/* ------------------------------
   Register User
------------------------------ */

app.post('/api/register', async (req, res) => {

    const {
        email,
        username,
        password,
        age,
        role
    } = req.body;

    const db = client.db('chatapp');

    const newUser = {
        id: Date.now().toString(),
        email: email,
        username: username,
        password: password,
        age: age,
        role: role || 'user'
    };

    await db
        .collection('users')
        .insertOne(newUser);

    res.json({
        message: 'User Registered',
    });
});

/* ------------------------------
   Create Group
------------------------------ */

app.post('/api/groups', async (req, res) => {


    const db = client.db('chatapp');

    const newGroup = {
        id: Date.now(),
        title: req.body.title,
        description: req.body.description,
        ageLimit: req.body.ageLimit,
        colourTheme: req.body.colourTheme,
        members: [],
        admins: []
    };

    await db
        .collection('groups')
        .insertOne(newGroup);

    res.json({
        message: 'Group Created',
        group: newGroup
    });

});

/* ------------------------------
   Create Channel
------------------------------ */

app.post('/api/channels', async (req, res) => {

    console.log('CHANNEL REQUEST RECEIVED');
    console.log(req.body);

    const db = client.db('chatapp');

    const newChannel = {
        id: Date.now(),
        name: req.body.name,
        description: req.body.description,
        groupID: req.body.groupID

    };

    await db
        .collection('channels')
        .insertOne(newChannel);

    res.json({
        message: 'Channel Created',
        channel: newChannel
    });

});

app.post('/api/login', async (req, res) => {

    const db = client.db('chatapp');
    const { username, password } = req.body;

    const user = 
    await db
        .collection('users')
        .findOne({
            username: username,
            password: password
        })



    if (!user) {
        return res.status(401).json({
            message: 'Invalid Login'
        });
    }

    res.json(user);

});

app.get('/api/bootstrap-check', async (req, res) => {

   const db = client.db('chatapp');

    const superAdmin = await db
        .collection('users')
        .findOne({
            role: 'superadmin'
        })

    res.json({
        bootstrapRequired: !superAdmin
    });

});

app.post('/api/bootstrap', async (req, res) => {

    const { username, password } = req.body;

    const db = client.db('chatapp');

    const existingAdmin = await db 
        .collection('users')
        .findOne({
            role : 'superadmin'
        })

    if (existingAdmin) {
        return res.status(400).json({
            message: 'Super Admin already exists'
        });
    }

    const superAdmin = {
        id: Date.now().toString(),
        username,
        password,
        role: 'superadmin'
    };

    await db
        .collection('users')
        .insertOne(superAdmin);

    res.json({
        message: 'Super Admin Created'
    });

});

/* ------------------------------
   Assign User to a group
------------------------------ */

app.post('/api/assign', async (req,res) => {

    const db = client.db('chatapp');

    const {userId, groupId} = req.body

    await db.collection('groups').updateOne(
        { id: groupId},
        {
            $addToSet:{
                members: userId
            }
        }
    )

    res.json({
        message: 'User Assigned'
    })


});

/* ------------------------------
   Creates a group request
------------------------------ */

app.post('/api/group-requests', async (req, res) => {

    const db = client.db('chatapp');

    const groupRequest = {
        id: Date.now().toString(),
        title: req.body.title,
        description: req.body.description,
        ageLimit: req.body.ageLimit,
        colourTheme: req.body.colourTheme,
        requestedBy: req.body.requestedBy,
        status: 'pending'
    };

    await db
        .collection('groupRequests')
        .insertOne(groupRequest);

    res.json({
        message: 'Group Request Submitted',
        request: groupRequest
    });

});

/* ------------------------------
   Gets group request
------------------------------ */

app.get('/api/group-requests', async (req, res) => {

    const db = client.db('chatapp');

    const request = await db
        .collection('groupRequests')
        .find({
            status: 'pending'
        })
        .toArray()

    res.json(request);
});

/* ------------------------------
   Gets groups
------------------------------ */

app.get('/api/groups', async (req, res) => {

    const db = client.db('chatapp');

    const groups = await db
        .collection('groups')
        .find({})
        .toArray()

    res.json(groups);
});


/* ------------------------------
   Approves group request
------------------------------ */

app.post('/api/group-requests/:id/approve', async (req, res) => {

    const db = client.db('chatapp');

    const request = await db
        .collection('groupRequests')
        .findOne({
            id: req.params.id
        });

    if (!request) {
        return res.status(404).json({
            message: 'Request not found'
        });
    }

    const newGroup = {
        id: Date.now().toString(),
        title: request.title,
        description: request.description,
        ageLimit: request.ageLimit,
        colourTheme: request.colourTheme,
        members: [request.requestedBy],
        admins: [request.requestedBy]
    };

    await db
        .collection('groups')
        .insertOne(newGroup);

    await db
        .collection('groupRequests')
        .updateOne(
            { id: request.id },
            {
                $set: {
                    status: 'approved'
                }
            }
        );

    res.json({
        message: 'Group Approved',
        group: newGroup
    });

});

/* ------------------------------
   Rejects group request
------------------------------ */

app.post('/api/group-requests/:id/reject', async (req, res) => {

    const db = client.db('chatapp');

    await db
        .collection('groupRequests')
        .updateOne(
            {
                id: req.params.id
            },
            {
                $set: {
                    status: 'rejected'
                }
            }
        );

    res.json({
        message: 'Group Request Rejected'
    });

});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

/* ------------------------------
   Creates Group Membership requests
------------------------------ */

app.post('/api/group-membership-requests', async (req,res) => {

    const db = client.db('chatapp')

    const groupMembershipRequest = {
        id:  Date.now().toString(),
        groupID: req.body.groupID,
        userID: req.body.userID,
        status: 'pending',
        createdAt: new Date()
    }

    await db 
        .collection('groupMembershipRequest')
        .insertOne(groupMembershipRequest);

    res.json({
        message: 'Group Membership Requested',
        request: groupMembershipRequest 
    })

})

/* ------------------------------
   Gets Group Membership requests
------------------------------ */

app.get('/api/group-membership-requests', async (req,res) => {

    const db = client.db('chatapp')

    const requests = await db
                        .collection('groupMembershipRequest')
                        .find({ statis: 'pending'})
                        .toArray()
    res.json(requests)

})

/* ------------------------------
   Approves group Membership requests
------------------------------ */

app.post('/api/group-membership-requests/:id/approve', async (req, res) => {

    const db = client.db('chatapp')

    const request = await db
                        .collection('groupMembershipRequests')
                        .findOne({
                            id: req.params.id
                        });
    if (!request){
        return res.status(404).json({
            message: 'Request not found'
        })
    }

    await db   
        .collection('groups')
        .updateOne({
            id: request.groupID
        },
        {
            $addToSet: {
                members: request.userID
            }
        }
        )

    await db
        .collection('groupMembershipRequests')
        .updateOne(
            {
                id: request.id
            },
            {
                $set: {
                    status: 'approved'
                }
            }
        );

    res.json({
        message: 'Membership Approved'
    }
    );

});


/* ------------------------------
   Rejects group Membership requests
------------------------------ */

app.post('/api/group-membership-requests/:id/reject', async (req, res) => {

    const db = client.db('chatapp');

    await db 
        .collection('groupMembershipRequests')
        .updateOne({
            id: req.params.id
        },
        {
            $set:{
                status: 'rejected'
            }
        }
    )

    res.json({
        message: 'Group membership request rejected'
    });
})

/* ------------------------------
   Creates Channel requests
------------------------------ */

app.post('/api/channel-creation-requests',async (req,res) => {

    const db = client.db('chatapp');

    const ChannelCreationRequest = {
        id: Date.now().toString(),
        name: req.body.name,
        description: req.body.description,
        groupID: req.body.groupID,
        requestedBy: req.body.requestedBy,
        status: 'pending'
    }

    await db 
        .collection('ChannelCreationRequests')
        .insertOne(ChannelCreationRequest);

    res.json({
        message: 'Channel Request Created',
        request: ChannelCreationRequest
    })
})

/* ------------------------------
   Gets Channel requests
------------------------------ */

app.get('/api/channel-creation-requests',async (req,res) =>{

    const db = client.db('chatapp')

    const request = await db
                        .collection('ChannelCreationRequests')
                        .find({
                            status: 'pending'
                        })
                        .toArray()
    res.json(request)

})

/* ------------------------------
   Gets Channels
------------------------------ */

app.get('api/channels/:groupId',async (req,res) =>{

    const db = client.db('chatapp');

    const channels = await db   
                        .collection('channels')
                        .find({
                            groupID: req.params.groupId
                        })
                        .toArray()
    res.json(channels);
})

/* ------------------------------
   Approve Channel requests
------------------------------ */

app.post('/api/channel-creation-requests/:id/approve', async (req,res) =>{

    const db = client.db('chatapp')

    const request = await db 
                        .collection('ChannelCreationRequests')
                        .findOne({
                            id: req.params.id
                        })
    if(!request){
        return res.status(404).json({
            message: 'Channel Request Not Found'
        })
    }

    const newChannel = {
        id: Date.now().toString(),
        name: request.name,
        description: request.description,
        groupID: request.groupID
    }

    await db 
        .collection('channels')
        .insertOne(newChannel)
    

    await db
        .collection('ChannelCreationRequests')
        .updateOne({
            id: request.id
        },
        {
            $set:{
                status: 'approved'
            } 
        }
    )
    
    res.json({
        message: 'Channel request approved',
        channel: newChannel
    })

})

/* ------------------------------
   Rejects Channel requests
------------------------------ */

app.post('/api/channel-creation-requests/:id/reject', async (req,res) =>{

    const db = client.db('chatapp');

    await db 
        .collection('ChannelCreationRequests')
        .updateOne({
            id: req.params.id
        },
        {
            $set:{
                status: 'rejected'
            }
        }
    )

    res.json({
        message: 'Channel Creation Rejected'
    })
})



main().catch(console.error);
