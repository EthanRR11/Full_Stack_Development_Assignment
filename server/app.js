const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();

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

app.post('/api/register', (req, res) => {

    const {
        email,
        username,
        password,
        age,
        role
    } = req.body;

    const users = JSON.parse(
        fs.readFileSync('./data/users.json', 'utf8')
    );

    const newUser = {
        id: Date.now().toString(),
        email: email,
        username: username,
        password: password,
        age: age,
        role: role || 'user'
    };

    users.push(newUser);

    fs.writeFileSync(
        './data/users.json',
        JSON.stringify(users, null, 2)
    );

    res.json({
        message: 'User Registered',
        user: newUser
    });

});

/* ------------------------------
   Create Group
------------------------------ */

app.post('/api/groups', (req, res) => {

    const groups = JSON.parse(
        fs.readFileSync('./data/groups.json', 'utf8')
    );

    const newGroup = {
        id: Date.now(),
        title: req.body.title,
        description: req.body.description,
        ageLimit: req.body.ageLimit,
        colourTheme: req.body.colourTheme
    };

    groups.push(newGroup);

    fs.writeFileSync(
        './data/groups.json',
        JSON.stringify(groups, null, 2)
    );

    res.json({
        message: 'Group Created',
        group: newGroup
    });

});

/* ------------------------------
   Create Channel
------------------------------ */

app.post('/api/channels', (req, res) => {

    console.log('CHANNEL REQUEST RECEIVED');
    console.log(req.body);

    const channels = JSON.parse(
        fs.readFileSync('./data/channels.json', 'utf8')
    );

    const newChannel = {
        id: Date.now(),
        name: req.body.name,
        description: req.body.description
    };

    channels.push(newChannel);

    fs.writeFileSync(
        './data/channels.json',
        JSON.stringify(channels, null, 2)
    );

    res.json({
        message: 'Channel Created',
        channel: newChannel
    });

});

app.post('/api/login', (req, res) => {

    const { username, password } = req.body;

    const users = JSON.parse(
        fs.readFileSync('./data/users.json', 'utf8')
    );

    const user = users.find(
        user =>
            user.username === username &&
            user.password === password
    );

    if (!user) {
        return res.status(401).json({
            message: 'Invalid Login'
        });
    }

    res.json(user);

});

app.get('/api/bootstrap-check', (req, res) => {

    const users = JSON.parse(
        fs.readFileSync('./data/users.json')
    );

    const superAdmin = users.find(
        user => user.role === 'superadmin'
    );

    res.json({
        bootstrapRequired: !superAdmin
    });

});

app.post('/api/bootstrap', (req, res) => {

    const { username, password } = req.body;

    const users = JSON.parse(
        fs.readFileSync('./data/users.json')
    );

    const superAdminExists = users.find(
        user => user.role === 'superadmin'
    );

    if (superAdminExists) {
        return res.status(400).json({
            message: 'Super Admin already exists'
        });
    }

    const superAdmin = {
        id: Date.now(),
        username,
        password,
        role: 'superadmin'
    };

    users.push(superAdmin);

    fs.writeFileSync(
        './data/users.json',
        JSON.stringify(users, null, 2)
    );

    res.json({
        message: 'Super Admin Created'
    });

});


app.listen(3000, () => {
    console.log('Server running on port 3000');
});