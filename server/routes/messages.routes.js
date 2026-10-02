const express = require('express');

module.exports = function(client) {

    const router = express.Router();

        /* ------------------------------
       Sends messages
    ------------------------------ */
    router.post('/messages', async (req, res) =>{
        const db = client.db('chatapp')

        console.log(req.body)

        const newMessage = {
            id: Date.now().toString(),
            senderID: req.body.senderID,
            senderName: req.body.senderName,
            channelID: req.body.channelID,
            content: req.body.content,
            timestamp: new Date()
        }

        await db
        .collection('messages')
        .insertOne(newMessage);

        res.json({
            message: 'message sent',
            data: newMessage
        })
    })


        /* ------------------------------
       gets messages for a channel
    ------------------------------ */

    router.get('/messages/:channelID', async (req, res) =>{
        const db = client.db('chatapp')

        const messages = await db
        .collection('messages')
        .find({
            channelID: req.params.channelID
        })
        .sort({
            timestamp: -1
        })
        .limit(5)
        .toArray()


        res.json(messages.reverse());
    })
        /* ------------------------------
       deletes message
    ------------------------------ */
    router.delete('/messages/:id', async (req, res) =>{
        const db = client.db('chatapp');

        const message = await db
        .collection('messages')
        .deleteOne({
            id: req.params.id
        })

        res.json({
            message: 'message deleted'
        })
    })


    return router
};