const express = require('express');
const db = require('./userPostDB.js');

const router = express.Router();

router.get('/:id/posts', async (req, res, next) => { // works
    try {
        res.json(await db.fetch(req.params.id));
    } catch (err) {
        console.log('get user posts', err);
        next(err);
    };
});

router.post('/:id/posts', async (req, res, next) => { // not working
    try {

        const payload1= { // for posts table
            user_id: req.params.id, // just user id
            issue: req.body.issue,
            description: req.body.description,
            street_address: req.body.street_address,
        };

        const payload2= { // for area table
            neighborhood: req.body.neighborhood,
            city: req.body.city,
            state: req.body.state,
            zip_code: req.body.zip_code
        }

        // console.log('payload:', payload1);

        const newPost= await db.create(payload1, payload2);
        console.log(newPost);
        if (req.params.id) {
            // console.log('newpost:', newPost);
            res.status(201).json(newPost);
        } else {
            res.status(404).json({
                message: 'User id does not exist'
            });
        };
    } catch (err) {
        console.log('err posting:', err);
        next(err);
    };
});

// router.put('/:id/posts/:postid', async (req, res, next) => {

// });

// router.delete('/:id/posts/:postid', async (req, res, next) => {

// });

module.exports= router;
