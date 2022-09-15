import supertest from 'supertest';
import app from './../src/app';
import itemFactory from './../src/factories/itemFactory';

const agent = supertest(app);

const item = itemFactory();
let createdItemId;

describe('Testa POST /items ', () => {

  test('Deve retornar 201, se cadastrado um item no formato correto', async ()=>{

    const response = await agent.post('/items').send(item);
    createdItemId = response.body.id;
    expect(response.status).toBe(201);

  });

  test('Deve retornar 409, ao tentar cadastrar um item que exista', async ()=>{

    const response = await agent.post('/items').send(item);
    expect(response.status).toBe(409);

  });

});

describe('Testa GET /items ', () => {

  test('Deve retornar status 200 e o body no formato de Array', async ()=>{

    const { body } = await agent.get('/items');
    expect(body).toBeInstanceOf(Array);

  });

});

describe('Testa GET /items/:id ', () => {

  test('Deve retornar status 200 e um objeto igual a o item cadastrado', async ()=>{

    const { body } = await agent.get(`/items/${createdItemId}`);
    expect(body).toBeTruthy();
    expect(body.id).toBe(createdItemId);
    expect(body).toHaveProperty('title');
    expect(body).toHaveProperty('url');
    expect(body).toHaveProperty('description');
    expect(body).toHaveProperty('amount');

  });

  test('Deve retornar status 404 caso não exista um item com esse id', async ()=>{

    const response = await agent.get(`/items/9999999`);
    expect(response.status).toBe(404);

  });

});
