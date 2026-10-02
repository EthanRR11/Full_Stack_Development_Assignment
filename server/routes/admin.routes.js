const express = require('express');

module.exports = function (client) {

    const router = express.Router();

    /* ------------------------------
      helper function to create audit logs
   ------------------------------ */
    async function createAuditLog(db, action, performedBy) {

        await db
            .collection('auditLogs')
            .insertOne({

                id: Date.now().toString(),

                action,

                performedBy,

                timestamp: new Date()

            });

    }

    /* ------------------------------
       Approves group request
    ------------------------------ */

    router.post('/group-requests/:id/approve', async (req, res) => {

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

        await createAuditLog(
            db,
            'Group Approved',
            'superadmin'
        );

        await db
            .collection('users')
            .updateOne(
                {
                    id: request.requestedBy
                },
                {
                    $set: {
                        role: 'groupadmin'
                    }
                }
            );
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

    router.post('/group-requests/:id/reject', async (req, res) => {

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

    /* ------------------------------
       Approve channel request
    ------------------------------ */

    router.post('/channel-creation-requests/:id/approve', async (req, res) => {

        const db = client.db('chatapp');

        const request = await db
            .collection('ChannelCreationRequests')
            .findOne({
                id: req.params.id
            });

        if (!request) {
            return res.status(404).json({
                message: 'Channel Request Not Found'
            });
        }

        const newChannel = {
            id: Date.now().toString(),
            name: request.name,
            description: request.description,
            groupID: request.groupID
        };

        await db
            .collection('channels')
            .insertOne(newChannel);

        await createAuditLog(
            db,
            'Channel Approved',
            'groupadmin'
        );

        await db
            .collection('ChannelCreationRequests')
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
            message: 'Channel Request Approved',
            channel: newChannel
        });

    });

    /* ------------------------------
       Reject channel request
    ------------------------------ */

    router.post('/channel-creation-requests/:id/reject', async (req, res) => {

        const db = client.db('chatapp');

        await db
            .collection('ChannelCreationRequests')
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
            message: 'Channel Creation Rejected'
        });

    });

    /* ------------------------------
      Gets all users
   ------------------------------ */

    router.get('/users', async (req, res) => {


        const db = client.db('chatapp')

        user = await db
            .collection('users')
            .find({})
            .toArray()


        res.json(user)

    })

    /* ------------------------------
      Gets a specific user
   ------------------------------ */
    router.get('/users/:userid', async (req, res) => {

        const db = client.db('chatapp')

        const user = await db
            .collection('users')
            .findOne({
                id: req.params.userid
            })

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        res.json(user)


    })

    /* ------------------------------
      Deletes a user
   ------------------------------ */
    router.delete('/users/:userid', async (req, res) => {

        const db = client.db('chatapp')

        const user = await db
            .collection('users')
            .deleteOne({
                id: req.params.userid
            })

        await createAuditLog(
            db,
            'User Deleted',
            'superadmin'
        );

        res.json({
            message: 'User deleted'
        })

    })

    /* ------------------------------
      Get Audit Logs
   ------------------------------ */
    router.get('/audit-logs', async (req, res) => {

        const db = client.db('chatapp');

        const logs = await db
            .collection('auditLogs')
            .find({})
            .sort({
                timestamp: -1
            })
            .toArray();

        res.json(logs);

    });



    return router;

};
