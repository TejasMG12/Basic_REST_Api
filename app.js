const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(bodyParser.json());


mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser:true });

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.on('open', () => console.log("connected to database"));
db.on('disconnected', () => console.log('Disconnected from database'));
db.on('reconnected', () => console.log('Reconnected to database'));
db.on('close', () => console.log('Database connection closed'));


const UserRoute = require('./routes/user.js');
app.use('/user', UserRoute);

app.listen(3000, function () {
    console.log("Server started");
    console.log(process.env.MONGODB_URL)
    // console.log(db);
}); 