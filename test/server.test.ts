import request from "supertest";
import server  from '../src/app';

server.close();

const idList:{[key:string]:string} ={};
const sendData ={
    test1: {'name': 'John',
                'age': 22,
                'hobbies': ['swim']},
    test2: {
        'name': 'Mary',
        'age': 34,
        'hobbies': ["books", "cooking"]
    }
}

describe('POST /api/users', function () {
    it('should return a 200 status code', async () => {
        const response = await request(server)
            .get('/api/users');
        expect(response.statusCode).toBe(200)
        expect(response.body).toMatchObject([])   
    }) 
    it('should add new item to stage', async () => {
            const response = await request(server)
                .post('/api/users')
                .send(sendData.test1)
                
            console.log('response ',response.body);
            expect(response.statusCode).toBe(201)
            
    })
    it('should return a 200 status code', async () => {
        const response = await request(server)
            .get('/api/users');
        idList.test1 = response.body[0].id;
        expect(response.statusCode).toBe(200)
        expect(response.body[0]).toMatchObject({
                ...sendData.test1,
                id: idList.test1
            })   
    }) 
});
describe('PUT /api/users/${idList.test1}', function () {
    it('should add new item to stage', async () => {
            const response = await request(server)
                .post('/api/users')
                .send(sendData.test2)
                
            console.log('response ',response.body);
            expect(response.statusCode).toBe(201)
            
    })
    it('should return a 200 status code', async () => {
        const response = await request(server)
            .get('/api/users');
        idList.test2 = response.body[1].id; 
        expect(response.statusCode).toBe(200)
        expect(response.body[1]).toMatchObject({
               ...sendData.test2,
                id: idList.test2
            })   
    })
    it('should return a 200 status code', async () => {
        sendData.test1.name ="Victor"; 
        sendData.test1.age = 27; 

        const response = await request(server)
            .put(`/api/users/${idList.test1}`)
            .send(sendData.test1);
        expect(response.statusCode).toBe(200)
    })
    it('should return a 200 status code', async () => {
        const response = await request(server)
            .get(`/api/users/${idList.test1}`);
        expect(response.statusCode).toBe(200)
        expect(response.body).toMatchObject({
               ...sendData.test1,
                id: idList.test1
            })   
    })
});
describe('Delete /api/users', function () {
    it('should return a 204 status code', async () => {
        const response = await request(server)
            .delete(`/api/users/${idList.test2}`);
        expect(response.statusCode).toBe(204)     
    })
    it('should return a 404 status code', async () => {
        const response = await request(server)
            .get(`/api/users/${idList.test2}`);
        expect(response.statusCode).toBe(404)
        expect(response.body).toMatch("Error: Record doesn't exist")   
    })
   
});