const express= require('express');
const helmet= require('helmet');
const cors= require('cors');
const session= require('express-session');
const knexSessionStore = require('connect-session-knex')(session);
const db_config = require('../data/db_config.js');
const authenticate= require('../auth/auth-middleware.js');

const server= express();

const welcome_route= require('../Welcome/welcome-router.js');
const auth_route= require('../auth/auth-router.js');
const post_route= require('../posts/post-router.js');

// middleware
server.use(express.json());
server.use(helmet());
server.use(cors());
// creating session object
server.use(session({
    name: 'token', // overwrites the default cookie name, keeps our stack safe
    resave: false, // avoids recreating sessions that have not changed
    saveUninitialized: false, // GDPR laws, against setting cookies automatically
    secret: process.env.COOKIE_SECRET || 'secret', // cryptographically sign the cookie
    cookie: {
        maxAge: 1000 * 60 * 30, // should make cookie 30 mins long
        http: true, // disallows js from reading our cookie contents
    },
    store: new knexSessionStore({
        knex: db_config, // grabs configured instance of knex
        createtable: true, // if a sessions table doesn't exist, create one automatically
    }),
}));

// routes
server.use('/', welcome_route);
server.use('/api/auth', auth_route);
server.use('/api/posts', authenticate(), post_route);

// handles no supported route
server.use((req, res) => {
    res.status(404).send(
        `<h4 align='center'>The url ${req.url.toUpperCase()} was not found.</h4>`
    );
});

// handlers route err
server.use((err, req, res, next) => {
    console.log('Server error:', err);
    res.status(500).json({
        message: "Oops, something went wrong. Please try again later.",
    });
});

module.exports= server;