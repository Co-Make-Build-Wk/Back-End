const express= require('express');
const helmet= require('helmet');
const cors= require('cors');

const server= express();

const welcome_route= require('../Welcome/welcome-router.js');

// middleware
server.use(express.json());
server.use(helmet());
server.use(cors());

// routes
server.use('/', welcome_route);

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