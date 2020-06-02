const supertest = require('supertest');
const server = require('../api/server.js');
const db = require('../data/db_config.js');

beforeEach(async () => {
    await db.seed.run();
});

afterAll(async () => {
    await db.destroy();
});

describe('User Privilege Integration Tests', () => {
    it('POST /api/user/:id/posts', async () => {
        const post = {
            issue: 'Exposed wiring',
            description: 'Loose wires by Lambda Park, please address concerns',
            street_address: '26 Lambda Street',
            neighborhood: 'Lambda Creek',
            city: 'San Juan',
            state: 'California',
            zip_code: '11111',
        };

        const res= await supertest(server).post('/api/user/1/posts').send(post)

        expect(res.statusCode).toBe(201);
        expect(res.type).toBe('application/json');
    });

    it('GET /api/user/:id/post', async () => {
        const res = await supertest(server).get('/api/user/1/posts');

        expect(res.body).toHaveLength(1);
    })
    
    it('PUT /api/user/:id/post/:postid', async () => {
        const post = {
            issue: 'Exposed wiring',
            description: 'Loose wires by Lambda Park, please address concerns',
            street_address: '26 Lambda Street',
            neighborhood: 'Lambda Creek',
            created_at: '2020-06-02 02:00:19',
            is_fixed: true,
        };

        const res = await supertest(server).put('/api/user/1/posts/1').send(post)
        // console.log(res);
        expect(res.statusCode).toBe(200);
        expect(res.type).toBe('application/json');
        // expect(res.body.is_fixed).toBe(1);
    });

    it('DEL /api/user/:id/post/:postid', async () => {
        const res = await supertest(server).delete('/api/user/2/posts/2');

        expect(res.statusCode).toBe(204);
    });
});