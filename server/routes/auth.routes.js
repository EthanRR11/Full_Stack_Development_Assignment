const express = require('express');

module.exports = function(client) {

    const router = express.Router();

    /* ------------------------------
       Register User
    ------------------------------ */

    router.post('/register', async (req, res) => {

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
            message: 'User Registered'
        });

    });

    /* ------------------------------
       Login
    ------------------------------ */

    router.post('/login', async (req, res) => {

        const db = client.db('chatapp');
        const { username, password } = req.body;

        const user = await db
            .collection('users')
            .findOne({
                username: username,
                password: password
            });

        if (!user) {
            return res.status(401).json({
                message: 'Invalid Login'
            });
        }

        res.json(user);

    });

    /* ------------------------------
       Bootstrap Check
    ------------------------------ */

    router.get('/bootstrap-check', async (req, res) => {

        const db = client.db('chatapp');

        const superAdmin = await db
            .collection('users')
            .findOne({
                role: 'superadmin'
            });

        res.json({
            bootstrapRequired: !superAdmin
        });

    });

    /* ------------------------------
       Bootstrap Super Admin
    ------------------------------ */

    router.post('/bootstrap', async (req, res) => {

        const { username, password } = req.body;

        const db = client.db('chatapp');

        const existingAdmin = await db
            .collection('users')
            .findOne({
                role: 'superadmin'
            });

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

    return router;

};