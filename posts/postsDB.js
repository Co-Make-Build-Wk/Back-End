const db= require('../data/db_config.js');

module.exports= {
    fetch,
    fetchById,
    create,
    update,
    destroy,
};

async function fetch(){
   return await db('posts');
};

function fetchById(id){
    return db('posts')
        .where({ id });
};

function create(payload){
    
};

function update(id){

};

function destroy(id){
    return db('posts')
        .where({ id })
        .del();
};