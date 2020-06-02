const supertest = require('supertest');
const server = require('../api/server.js');
const db = require('../data/db_config.js');

afterAll(async () => {
    await db.destroy();
});