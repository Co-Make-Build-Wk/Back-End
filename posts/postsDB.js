const db= require('../data/db_config.js');

module.exports= {
    fetch,
    fetchById,
};

async function fetch() { // works
    try{
        return await db
            .select('posts.id', 'users.username', 'posts.issue', 'posts.description', 'posts.street_address', 'area.neighborhood', 'posts.created_at', 'posts.is_fixed')
            .from('post_area')
            .join('posts', 'post_area.post_id', 'posts.id')
            .join('users', 'users.id', 'posts.users_id')
            .join('area','post_area.area_id', 'area.id');
    } catch (err) {
        console.log(err);
        err;
    }
};

function fetchById(id){ // works
    return db
        .select('posts.id', 'users.username', 'posts.issue', 'posts.description', 'posts.street_address', 'area.neighborhood', 'posts.created_at', 'posts.is_fixed')
        .from('post_area')
        .join('posts', 'post_area.post_id', 'posts.id')
        .join('users', 'users.id', 'posts.users_id')
        .where('posts.id', id)
        .join('area', 'post_area.area_id', 'area.id');
};

