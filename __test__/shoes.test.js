'use strict';

const { db, users } = require('../src/models');
const supertest = require('supertest');
const { server } = require('../src/server');
const request = supertest(server);

let testUser;

beforeAll( async () => {
  await db.sync();
  testUser = await users.create({
    username: 'test', 
    password: 'pass',
    role: 'manager',
  });
});

afterAll( async () => {
  await db.drop();
});

describe('Shoes route with ACL access', () => {
  it('allows user with create access to post', async () => {
    let response = await request.post('/shoes').set('Authorization', `Bearer ${testUser.token}`).send({
      name: 'test',
      color: 'white',
      size: 11,
      brand: 'Crocs',
    });
    expect(response.status).toBe(201);
    expect(response.body.name).toEqual('test');
    expect(response.body.color).toEqual('white');
    expect(response.body.size).toEqual(11);
    expect(response.body.brand).toEqual('Crocs');
  });
  it('allows user with read access to get one item', async () => {
    let response = await request.get('/shoes/1').set('Authorization', `Bearer ${testUser.token}`);

    expect(response.body.name).toEqual('test');
    expect(response.body.color).toEqual('white');
    expect(response.body.size).toEqual(11);
    expect(response.body.brand).toEqual('Crocs');
  });
  it('allows user with read access to get all items', async () => {
    let response2 = await request.post('/shoes').set('Authorization', `Bearer ${testUser.token}`).send({
      name: 'test2',
      color: 'black',
      size: 23,
      brand: 'Nike',
    });
    let response = await request.get('/shoes').set('Authorization', `Bearer ${testUser.token}`);

    expect(response.status).toBe(200);
    expect(response.body[1].name).toEqual('test2');
    expect(response.body[1].color).toEqual('black');
    expect(response.body[1].size).toEqual(23);
    expect(response.body[1].brand).toEqual('Nike');
  });

  it('allows user with update access to update an item', async () => {
    let response = await request.put('/shoes/1').set('Authorization', `Bearer ${testUser.token}`).send({
      name: 'update',
      color: 'yellow',
      size: 13,
      brand: 'Champion',
    });
    expect(response.body.name).toEqual('update');
    expect(response.body.color).toEqual('yellow');
    expect(response.body.size).toEqual(13);
    expect(response.body.brand).toEqual('Champion');

  });

  it('allows user with update access to delete an item', async () => {
    await request.delete('/shoes/1').set('Authorization', `Bearer ${testUser.token}`);
    let response = await request.get('/shoes/1').set('Authorization', `Bearer ${testUser.token}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(null);
  });
});