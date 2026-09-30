const express = require('express');

module.exports = function (client) {

    const router = express.Router();

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
       Approves group membership request
    ------------------------------ */

    router.post('/group-membership-requests/:id/approve', async (req, res) => {

        const db = client.db('chatapp');

        const request = await db
            .collection('groupMembershipRequests')
            .findOne({
                id: req.params.id
            });

        if (!request) {
            return res.status(404).json({
                message: 'Request not found'
            });
        }

        await db
            .collection('groups')
            .updateOne(
                {
                    id: request.groupID
                },
                {
                    $addToSet: {
                        members: request.userID
                    }
                }
            );

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
        });

    });

    /* ------------------------------
       Rejects group membership request
    ------------------------------ */

    router.post('/group-membership-requests/:id/reject', async (req, res) => {

        const db = client.db('chatapp');

        await db
            .collection('groupMembershipRequests')
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
            message: 'Group Membership Request Rejected'
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

    return router;

};