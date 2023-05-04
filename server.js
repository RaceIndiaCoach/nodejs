const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
require('dotenv').config();
const PORT = process.env.NODE_PORT;

global.__basedir = __dirname;
app.use(cors());
app.options('*', cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));
app.use(express.static('resources'));
app.set('views', './resources');

const adminRoutes = require('./api/admin/routes/admin.routes');
app.use('/', adminRoutes);

// const userRoutes = require('./api/users/routes/user.routes');
// app.use('/', userRoutes);

app.listen(PORT, () => { console.log(`Server Listing PORT: ${PORT} ❤️❤️❤️`)});

process.title = `RACE INDIA COACH`;

module.exports = app;