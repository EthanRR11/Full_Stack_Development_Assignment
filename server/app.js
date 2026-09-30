const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const authRoutes = require('./routes/authRoutes');
const groupRoutes = require('./routes/groupRoutes');
const channelRoutes = require('./routes/channelRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const dbName = 'chatapp';

async function main() {
    await client.connect();
    console.log('Connected successfully to server');

    const db = client.db(dbName);

    return db;
}

app.use(cors());
app.use(express.json());

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

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

main().catch(console.error);
