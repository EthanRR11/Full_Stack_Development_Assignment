const express = require('express');

module.exports = function(client) {

    const router = express.Router();

    /* ------------------------------
       Create Channel
    ------------------------------ */

    router.post('/channels', async (req, res) => {

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

    /* ------------------------------
       Creates Channel requests
    ------------------------------ */

    router.post('/channel-creation-requests', async (req, res) => {

        const db = client.db('chatapp');

        const ChannelCreationRequest = {
            id: Date.now().toString(),
            name: req.body.name,
            description: req.body.description,
            groupID: req.body.groupID,
            requestedBy: req.body.requestedBy,
            status: 'pending'
        };

        await db
            .collection('ChannelCreationRequests')
            .insertOne(ChannelCreationRequest);

        res.json({
            message: 'Channel Request Created',
            request: ChannelCreationRequest
        });

    });

    /* ------------------------------
       Gets Channel requests
    ------------------------------ */

    router.get('/channel-creation-requests', async (req, res) => {

        const db = client.db('chatapp');

        const request = await db
            .collection('ChannelCreationRequests')
            .find({
                status: 'pending'
            })
            .toArray();

        res.json(request);

    });

    /* ------------------------------
       Gets Channels by groupID
    ------------------------------ */

    router.get('/channels/:groupId', async (req, res) => {

        const db = client.db('chatapp');

        const channels = await db
            .collection('channels')
            .find({
                groupID: req.params.groupId
            })
            .toArray();

        res.json(channels);

    });

    return router;

};