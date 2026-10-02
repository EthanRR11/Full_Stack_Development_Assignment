const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const http = require('http');
const { Server } = require('socket.io');

const authRoutes = require('./routes/auth.routes');
const groupRoutes = require('./routes/group.routes');
const channelRoutes = require('./routes/channel.routes');
const adminRoutes = require('./routes/admin.routes');
const messageRoutes = require('./routes/messages.routes')
const groupAdminRoutes = require('./routes/groupadmin.routes')

const app = express();

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const dbName = 'chatapp';

async function bootstrapSuperAdmin() {

    const db = client.db(dbName);

    const superAdmin = await db
        .collection('users')
        .findOne({
            role: 'superadmin'
        });

    if (!superAdmin) {

        await db
            .collection('users')
            .insertOne({

                id: Date.now().toString(),

                username: 'admin',

                password: 'admin123',

                role: 'superadmin'

            });

        console.log(
            'Super Admin account created'
        );

    }

}

async function main() {
    await client.connect();
    console.log('Connected successfully to server');

    await bootstrapSuperAdmin();

    const db = client.db(dbName);

    return db;
}

app.use(cors());
app.use(express.json());

app.use('/api', groupAdminRoutes(client))
app.use('/api', messageRoutes(client))
app.use('/api', authRoutes(client));
app.use('/api', groupRoutes(client));
app.use('/api', channelRoutes(client));
app.use('/api', adminRoutes(client));

/* ------------------------------
   Server Test Route
------------------------------ */

app.get('/', (req, res) => {
    res.send('Server Running');
});



const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:4200'
    }

});

app.set('io', io);

const channelUsers = {};

io.on('connection', (socket) => {

    console.log('User Connected');

    socket.on('join-channel', (data) => {

        socket.join(data.channelID);

        socket.channelID = data.channelID;

        socket.username = data.username;

        if (!channelUsers[data.channelID]) {

            channelUsers[data.channelID] = [];

        }

        if (
            !channelUsers[data.channelID]
                .includes(data.username)
        ) {

            channelUsers[data.channelID]
                .push(data.username);

        }

        io.to(data.channelID).emit(
            'online-users',
            channelUsers[data.channelID]
        );

        socket.to(data.channelID).emit(
            'user-joined',
            {
                username: data.username
            }
        );

    });

    socket.on('leave-channel', (data) => {

        if (
            channelUsers[data.channelID]
        ) {

            channelUsers[data.channelID] =
                channelUsers[data.channelID]
                    .filter(
                        user =>
                            user !== data.username
                    );

            io.to(data.channelID).emit(
                'online-users',
                channelUsers[data.channelID]
            );

        }

        socket.to(data.channelID).emit(
            'user-left',
            {
                username: data.username
            }
        );

        socket.leave(data.channelID);

    });

    socket.on('send-message', (message) => {

        io.to(message.channelID)
            .emit(
                'receive-message',
                message
            );

    });

    socket.on('disconnect', () => {

        if (
            socket.channelID &&
            channelUsers[socket.channelID]
        ) {

            channelUsers[socket.channelID] =
                channelUsers[socket.channelID]
                    .filter(
                        user =>
                            user !== socket.username
                    );

            io.to(socket.channelID)
                .emit(
                    'online-users',
                    channelUsers[socket.channelID]
                );

        }

        console.log(
            'User Disconnected'
        );

    });

});

server.listen(3000, () => {
    console.log('Server running on port 3000');
});

main().catch(console.error);
