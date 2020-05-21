const express= require('express');

const router= express.Router();

router.get('/', async (req, res, next) => {
    try {
        await res.send(`<h4 align='center'>Welcome to my server! :)</h4>`);
    } catch (err) {
        console.log('Server home', err);
        next(err);
    };
});

module.exports= router;