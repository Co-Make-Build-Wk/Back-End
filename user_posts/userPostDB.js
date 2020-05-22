const db = require('../data/db_config.js');

module.exports = {
    fetch,
    fetchById,
    create,
    update,
    destroy,
};

async function fetch(user_id) { // works
    return await db
        .select('posts.id', 'users.username', 'posts.issue', 'posts.description', 'posts.street_address', 'posts.created_at', 'posts.is_fixed')
        .from('posts')
        .join('users', 'posts.user_id', 'users.id')
        .where('posts.user_id', user_id);
};

function fetchById(userid, postid) {
    return db
        .select('posts.id', 'users.username', 'posts.issue', 'posts.description', 'posts.street_address', 'posts.created_at', 'posts.is_fixed')
        .from('posts')
        .join('users', 'posts.user_id', 'users.id')
        .where('posts.user_id', userid)
        .where('posts.id', postid);
};

async function create(postinfo, areainfo) {
    const { user_id, issue, description, street_address } = postinfo
    const { neighborhood, city, state, zip_code } = areainfo

    // 1. creating post
    // 2. inserting values into area table at same time
    // 3. connect the intermediary table for both posts and area

    try {
        // insert post and get back id as postId using array destructuring to get the first id

        const [postId] = await db('posts').insert({ user_id, issue, description, street_address })
        // same as
        // const ids = await db('posts').insert({ user_id, issue, description, street_address })
        // const postId = ids[0]

        // insert area and get back id as areaId using array destructuring to get the first id

        const [areaId] = await db('area').insert({ neighborhood, city, state, zip_code });
        // same as
        // const ids = await db('area').insert({ neighborhood, city, state, zip_code })
        // const areaId = ids[0]

        // insert ids to the intermediary table
        await db('post_area')
            .insert({
                post_id: postId, // is id of object since it was destructured above
                area_id: areaId, // is id of object since it was destructured above
            });

        // return the newly created post to the router
        return await db('posts').where("id", postId)
    } catch (err) {
        // if there's an error, console log it and return nothing to the router
        console.log('create error', err)
        next(err);
    };
};

function update(userid, postid) {

};

function destroy(userid, postid) {
    return db('posts')
        .where({ id })
        .del();
};

