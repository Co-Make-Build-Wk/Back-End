const express= require('express');
const db= require('./postsDB.js');

const router= express.Router();

router.get('/', async (req, res, next) => {
    try {
        res.json(await db.fetch());
    } catch (err) {
        console.log('Error getting posts:', err);
        next(err);
    };
});

router.get('/:id', async (req, res, next) => {
    try {
        res.json(await db.fetchById(req.params.id));
    } catch (err) {
        console.log('Error getting posts by id:', err);
        next(err);
    };
});

module.exports= router;