const router = require('express').Router();
const db = require('./auth-model.js');
const bcrypt = require('bcryptjs');
const authenticate = require('./auth-middleware.js');

router.post('/register', async (req, res, next) => {
    // implement registration
    try {

        // goes into users table
        const payload1= {
            username: req.body.username,
            password: req.body.password,
        };

        // goes into user table
        const payload2= {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        };

        if (!req.body) {
            return res.status(400).json({
                message: 'Please add user information',
            });
        } else if (!req.body.firstName) {
            return res.status(400).json({
                message: 'Please enter first name',
            });
        } else if (!req.body.lastName) {
            return res.status(400).json({
                message: 'Please enter last name',
            });
        } else if (!req.body.email) {
            return res.status(400).json({
                message: 'Please enter your email',
            });
        } else if (!req.body.username) {
            return res.status(400).json({
                message: 'Please create a username',
            });
        } else if (!req.body.password) {
            return res.status(400).json({
                message: 'Please create a password',
            });
        };

        // checking the username through req.body object
        // purpose is to check if username already exists in db
        const username = req.body.username;
        const user = await db.fetchBy({ username }).first();

        // checking if username already exists
        if (user) {
            return res.status(409).json({ // 409 stands for conflict
                message: "Username is already taken",
            });
        };

        const newUser = await db.register(payload1, payload2);
        console.log(newUser);
        res.status(201).json(newUser);
    } catch (err) {
        console.log('Registering:', err)
        next(err);
    };
});

router.post('/login', async (req, res, next) => {
    // implement login

    const authErr = {
        username: 'Username not found',
        password: 'Incorrect password, please try again',
    };

    try {
        if (!req.body.username) {
            return res.status(400).json({
                message: 'Please enter username',
            });
        } else if (!req.body.password) {
            return res.status(400).json({
                message: 'Please enter password',
            });
        };

        // searching for user in db with stored username
        const user = await db.fetchBy({
            username: req.body.username,
        }).first();

        // if no user is found stored in db, forbid them from logging in
        if (!user) {
            return res.status(401).json(authErr.username); // 401 forbidden
        };

        // since bcrypt hashes generate different results due to the salting,
        // we rely on the magic internals of bcrypt to compare hashes rather than doing it
        // manually with "!=="

        const validPswrd = await bcrypt.compare(req.body.password, user.password);
        // checking if the password entered by user 
        // is the same as password saved in db

        if (!validPswrd) {
            return res.status(401).json(authErr.password);
        };

        // create a new session for the user and saves it in memory

        if(req.session.user){
            return res.json('You are already logged in');
        } else{

            req.session.user = user;

            res.json({
                message: `Welcome ${user.username}!`
            });
        };

    } catch (err) {
        console.log('Login:', err)
        next(err);
    };
});

router.get('/logout', authenticate(), async (req, res, next) => {
    // this will delete the session in the database and try to expire the cookie,
    // though it's ultimately up to the client if they delete the cookie or not.
    // but it becomes useless to them once the session is deleted server-side.

    req.session.destroy(err => {
        if (err) {
            next(err);
        } else {
            res.json({
                success_message: 'You have logged out.',
            });
        };
    });
});

module.exports = router;
