const express = require('express');

module.exports = function (client) {

    const router = express.Router();

    /* ------------------------------
       Create Group
    ------------------------------ */

    router.post('/groups', async (req, res) => {

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
       Get Groups
    ------------------------------ */

    router.get('/groups', async (req, res) => {

        const db = client.db('chatapp');

        const groups = await db
            .collection('groups')
            .find({})
            .toArray();

        res.json(groups);

    });

    /* ------------------------------
       Create Group Request
    ------------------------------ */

    router.post('/group-requests', async (req, res) => {

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
       Get Group Requests
    ------------------------------ */

    router.get('/group-requests', async (req, res) => {

        const db = client.db('chatapp');

        const request = await db
            .collection('groupRequests')
            .find({
                status: 'pending'
            })
            .toArray();

        res.json(request);

    });

    /* ------------------------------
       Create Group Membership Request
    ------------------------------ */

    router.post('/group-membership-requests', async (req, res) => {

        const db = client.db('chatapp');

        const groupMembershipRequest = {
            id: Date.now().toString(),
            groupID: req.body.groupID,
            userID: req.body.userID,
            status: 'pending',
            createdAt: new Date()
        };

        await db
            .collection('groupMembershipRequests')
            .insertOne(groupMembershipRequest);

        req.app.get('io').emit(
            'membership-request-created',
            groupMembershipRequest
        );

        res.json({
            message: 'Group Membership Requested',
            request: groupMembershipRequest
        });

    });

    /* ------------------------------
       Get Group Membership Requests
    ------------------------------ */

    router.get('/group-membership-requests/:groupID', async (req, res) => {

        const db = client.db('chatapp');

        const requests = await db
            .collection('groupMembershipRequests')
            .find({
                groupID: req.params.groupID,
                status: 'pending'
            })
            .toArray();

        res.json(requests);

    });

    return router

};