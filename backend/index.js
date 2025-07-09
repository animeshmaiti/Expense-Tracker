const express = require('express');
const cors = require('cors');
const { db } = require('./db/db');
const {readdirSync} = require('fs');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

// Routes
app.use('/api', require('./routes/transactions'));
app.use('/api/auth',require('./routes/auth'));

const server =()=>{
    db();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

server();