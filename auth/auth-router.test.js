const supertest = require('supertest')
const server = require('../api/server')
const db = require('../data/db-config')

describe('USERS', () => {
    describe('all users routes work as expected', () => {

        beforeEach(async () => {
            await db('users').truncate()
        })

        it('should return status code 200 upon successful register', async () => {
            const res = await supertest(server)
                .post('/api/auth/register')
                .send({
                    username: 'usertest',
                    password: 'pass123',
                    email: 'fake@mail.com',
                    role: 'diner'
                })
            expect(res.status).toEqual(201)
        })

        it('should return status code 201 upon successful login', async () => {
            const res = await supertest(server)
                .post('/api/auth/login')
                .send({
                    username: 'usertest',
                    password: 'pass123',
                    role: 'diner'
                })
            expect(res.status).toEqual(201)
        })
    })
})