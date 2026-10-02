const express = require('express');

module.exports = function (client) {

    const router = express.Router();

    function calculateAge(dateOfBirth) {

        const today = new Date();

        const birthDate =
            new Date(dateOfBirth);

        let age =
            today.getFullYear() -
            birthDate.getFullYear();

        const monthDifference =
            today.getMonth() -
            birthDate.getMonth();

        if (

            monthDifference < 0 ||

            (
                monthDifference === 0 &&
                today.getDate() <
                birthDate.getDate()
            )

        ) {

            age--;

        }

        return age;

    }

    /* ------------------------------
       Create Group
    ------------------------------ */

    router.post('/groups', async (req, res) => {

        const db = client.db('chatapp');

        const newGroup = {
            id: Date.now().toString(),
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

        const user = await db
            .collection('users')
            .findOne({
                id: req.body.userID
            });

        const group = await db
            .collection('groups')
            .findOne({
                id: req.body.groupID
            });

        const age = calculateAge(
            user.dateOfBirth
        );

        if (age < group.ageLimit) {

            return res.status(400).json({
                message:
                    'You do not meet the age requirements for this group.'
            });

        }
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

    const requestsWithUsers =
        await Promise.all(

            requests.map(
                async (request) => {

                    const user =
                        await db
                            .collection('users')
                            .findOne({
                                id: request.userID
                            });

                    return {

                        ...request,

                        username:
                            user
                                ? user.username
                                : 'Unknown User'

                    };

                }
            )

        );

    res.json(
        requestsWithUsers
    );

});

    return router

};