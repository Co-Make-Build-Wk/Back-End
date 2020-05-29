const db = require('../data/db_config.js');

module.exports = {
    fetch,
    fetchById,
    create,
    update,
    destroy,
    validateUserExists,
    validatePostExists
};

async function fetch(user_id) { // works
    try {
        return await db
            .select('posts.id', 'users.username', 'posts.issue', 'posts.description', 'posts.street_address', 'posts.created_at', 'posts.is_fixed')
            .from('posts')
            .join('users', 'posts.users_id', 'users.id')
            .where('posts.users_id', user_id);
    } catch (err) {
        console.log('fetch posts err:', err);
    }
};

function fetchById(userid, postid) {

    try {
        return db
            .select('posts.id', 'users.username', 'posts.issue', 'posts.description', 'posts.street_address', 'posts.created_at', 'posts.is_fixed')
            .from('posts')
            .join('users', 'posts.users_id', 'users.id')
            .where('posts.users_id', userid)
            .where('posts.id', postid);
        
    } catch (err) {
        console.log('fetchbyId err:', err)
    }
};

function validateUserExists(id){
    return db('users').where('id', id).first();
};

function validatePostExists(id) {
    return db('posts').where('id', id).first();
};

async function create(postinfo, areainfo) {
    const { users_id, issue, description, street_address } = postinfo
    const { neighborhood, city, state, zip_code } = areainfo

    // 1. creating post
    // 2. inserting values into area table at same time
    // 3. connect the intermediary table for both posts and area

    try {
        // insert post and get back id as postId using array destructuring to get the first id

        // 1st insert
        const [postId] = await db('posts').insert({ users_id, issue, description, street_address })
        // same as
        // const ids = await db('posts').insert({ user_id, issue, description, street_address })
        // const postId = ids[0]

        // insert area and get back id as areaId using array destructuring to get the first id

        // 2nd insert
        const [areaId] = await db('area').insert({ neighborhood, city, state, zip_code });
        // same as
        // const ids = await db('area').insert({ neighborhood, city, state, zip_code })
        // const areaId = ids[0]

        // 3rd insert
        // insert ids to the intermediary table (connecting)
        await db('post_area')
            .insert({
                post_id: postId, // is the id of object since it was destructured above
                area_id: areaId, // is the id of object since it was destructured above
            });

        // return the newly created post to the router
        return await db('posts').where("id", postId)
    } catch (err) {
        // if there's an error, console log it and return nothing to the router
        console.log('error posting:', err)
    };
};

async function update(updatedPostInfo, updatedAreaInfo, userid, postid) {
    const { issue, description, street_address, is_fixed, updated_at } = updatedPostInfo
    const { neighborhood, city, state, zip_code } = updatedAreaInfo

    try {
        const updatedPost = await db('posts').update({ issue, description, street_address, is_fixed, updated_at}).where('id', postid);

        const updatedArea = await db('area').update({ neighborhood, city, state, zip_code }).where('id', postid);

        await db('post_area')
            .insert({
                post_id: updatedPost, 
                area_id: updatedArea, 
            });

        return await db('posts').where('id', userid);
        
    } catch (err) {
        console.log('Error updating:', err);
    };
};

async function destroy(userid, postid) {
    try {
        await db('posts').where('id', postid).del();
    } catch (err) {
        console.log('Error deleting:', err);
    }
};

