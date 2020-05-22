const db= require('../data/db_config.js');

module.exports= {
    fetch,
    fetchById,
};

async function fetch(){ // works
   return await db
    .select('posts.id', 'users.username', 'posts.issue', 'posts.description','posts.created_at', 'posts.is_fixed')
    .from('posts')
    .join('users', 'users.id', 'posts.user_id')
};

function fetchById(id){ // works
    return db
        .select('posts.id', 'users.username', 'posts.issue', 'posts.description', 'posts.created_at', 'posts.is_fixed')
        .from('posts')
        .join('users', 'users.id', 'posts.user_id')
        .where('posts.user_id', id);
};

