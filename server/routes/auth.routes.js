const express = require('express');
const bcrypt = require('bcrypt');

module.exports = function (client) {

    const router = express.Router();
    /* ------------------------------
       Register User
    ------------------------------ */

    router.post('/register', async (req, res) => {

        const {
            email,
            username,
            password,
            dateOfBirth,
            role
        } = req.body;

        if (!dateOfBirth) {

            return res.status(400).json({
                message: 'Date of birth is required'
            });

        }

        const db = client.db('chatapp');

        const hashedPassword =
            await bcrypt.hash(
                password,
                10
            );

        const newUser = {
            id: Date.now().toString(),
            email: email,
            username: username,
            password: hashedPassword,
            dateOfBirth: dateOfBirth,
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
            username: username
        });

    if (!user) {

        return res.status(401).json({
            message: 'Invalid Login'
        });

    }

    const validPassword =
        await bcrypt.compare(
            password,
            user.password
        );

    if (!validPassword) {

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
            dateOfBirth: '1980-01-01',
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