const supertest = require('supertest');
const server = require('../api/server.js');

// call this hook to refresh seed data
// especially when making a POST req
beforeEach(async () => {
    await db.seed.run();
});

// this stops from keeping knex connected to db
// while testing and stops showing the error in console
afterAll(async () => {
    await db.destroy();
});

describe('Auth integration tests', () => {
    it('POST /api/auth/register', async () => {
        const payload = {
            username: 'the_flash',
            password: 'abc123',
            firstName: 'Barry',
            lastName: 'Allen',
            email: 'b_a_flash@gmail.com',
        };
        const res = await supertest(server).post('/api/auth/register').send(payload);
        // console.log(res);
        expect(res.statusCode).toBe(201);
        expect(res.type).toBe('application/json');
        expect(res.body.username).toBe('the_flash');
    });

    // it('POST /api/auth/login', async () => {
    //     const payload = {
    //         username: '',
    //         password: '',
    //     };
    //     const res = await supertest(server).post('/api/auth/login').send(payload);
    //     // console.log(res);
    //     expect(res.statusCode).toBe(200);
    //     expect(res.type).toBe('application/json');
    //     expect(res.body.message).toMatch('');
    // });
});