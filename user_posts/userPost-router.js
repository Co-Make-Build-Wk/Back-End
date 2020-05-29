const express = require('express');
const db = require('./userPostDB.js');

const router = express.Router();

router.get('/:id/posts', async (req, res, next) => { // works
    try {
        const user= await db.validateUserExists(req.params.id);

        if(!user){
            return res.status(404).json({
                message: 'User not found'
            });
        }

        res.json(await db.fetch(req.params.id));
    } catch (err) {
        console.log('get user posts', err);
        next(err);
    };
});


router.post('/:id/posts', async (req, res, next) => { 
    try {

        const user = await db.validateUserExists(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        const payload1= { // for posts table
            users_id: req.params.id, // just user id
            issue: req.body.issue,
            description: req.body.description,
            street_address: req.body.street_address,
        };

        const payload2= { // for area table
            neighborhood: req.body.neighborhood,
            city: req.body.city,
            state: req.body.state,
            zip_code: req.body.zip_code
        };

        const newPost= await db.create(payload1, payload2);
        console.log(newPost);
        res.status(201).json(newPost);

    } catch (err) {
        console.log('err posting:', err);
        next(err);
    };
});

router.get('/:id/posts/:postid', async (req, res, next) => {

    const { id, postid } = req.params;

    try {
        const post = await db.validatePostExists(postid);

        if (!post) {
            return res.status(404).json({
                message: 'Post not found'
            });
        };

        res.json(await db.fetchById(id, postid));

    } catch (err) {
        console.log('get user post by id:', err);
        next(err);
    };
});

router.put('/:id/posts/:postid', async (req, res, next) => {

    const { id, postid } = req.params;

    try {

        const user = await db.validateUserExists(id);
        const post= await db.validatePostExists(postid);

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        };

        if (!post) {
            return res.status(404).json({
                message: 'Post not found'
            });
        };

        const payload1 = { // for posts table
            ...req.body,
            users_id: req.params.id,// just user id
            issue: req.body.issue,
            description: req.body.description,
            street_address: req.body.street_address,
            is_fixed: req.body.is_fixed,
            updated_at: req.body.updated_at
        };

        const payload2 = { // for area table
            ...req.body,
            neighborhood: req.body.neighborhood,
            city: req.body.city,
            state: req.body.state,
            zip_code: req.body.zip_code
        };

        const updatedPost = await db.update(payload1, payload2, id, postid);
        console.log(updatedPost);
        res.json(updatedPost);
        
    } catch (err) {
        console.log('update post:', err);
        next(err);
    };

});

router.delete('/:id/posts/:postid', async (req, res, next) => {

    const { id, postid } = req.params;

    try {
        const user = await db.validateUserExists(id);
        const post = await db.validatePostExists(postid);

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        };

        if (!post) {
            return res.status(404).json({
                message: 'Post not found'
            });
        };

        await db.destroy(id, postid);
        res.status(204).end();

    } catch (err) {
        console.log('delete error:', err);
        next(err);
    };

});

module.exports= router;
