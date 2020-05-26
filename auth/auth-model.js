const db = require('../data/db_config.js');
const bcrypt = require('bcryptjs');

module.exports = {
    fetchBy,
    fetchById,
    register,
};

function fetchById(id) {
    return db('users')
        .select('id', 'username')
        .where('id', id)
        .first();
};

function fetchBy(filter) {
    return db('users')
        .select('id', 'username', 'password')
        .where(filter);
};

async function register(usernameInfo, user) {

    let {username, password}= usernameInfo
    let {firstName, lastName, email}= user;

    try {
        // hash the password with a time complexity of 14 
        password = await bcrypt.hash(password, 14);

        // inserting both username and user firstname and lastname into DB

        const [userid] = await db('user').insert({ firstName, lastName, email })
        const [id] = await db('users')
            .insert({ 
             username,
             password, 
             user_id: userid 
            });

        return fetchById(id);

    } catch (err) {
        console.log('DB register error:', err);
    };

};