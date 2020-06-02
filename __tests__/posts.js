const supertest = require('supertest');
const server = require('../api/server.js');
const db= require('../data/db_config.js');

// this stops from keeping knex connected to db
// while testing and stops showing the error in console
afterAll(async () => {
    await db.destroy();
});

describe('Posts unit tests', ()=> {
    it('GET /api/posts', async () => {
        const res = await supertest(server).get('/api/posts');

        expect(res.statusCode).toBe(200);
        expect(res.type).toBe('application/json');
        expect(res.body[1].username).toBe('pvanderveldt1')
    });

    it('GET /api/posts/:id', async () => {
        const res = await supertest(server).get('/api/posts/1');

        expect(res.statusCode).toBe(200);
        expect(res.type).toBe('application/json');
        expect(res.body[0].issue).toBe('Lambda Driveway');
    });
});