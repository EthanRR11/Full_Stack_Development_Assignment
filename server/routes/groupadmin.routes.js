const express = require('express');

module.exports = function(client) {

    const router = express.Router();



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
       Gets group members
    ------------------------------ */

    router.get('/group-members/:groupID', async (req,res) => {
        const db = client.db('chatapp')

        const group = await db 
        .collection('groups')
        .findOne({
            id: req.params.groupID
        })
        

        res.json(group.members)
    })

     /* ------------------------------
       Remove Group Member
    ------------------------------ */
    router.post(
    '/group-members/remove',
    async (req, res) => {

        const db = client.db('chatapp');

        await db
            .collection('groups')
            .updateOne(
                {
                    id: req.body.groupID
                },
                {
                    $pull: {
                        members: req.body.userID
                    }
                }
            );

        res.json({
            message: 'Member Removed'
        });

});

    return router

    
}  