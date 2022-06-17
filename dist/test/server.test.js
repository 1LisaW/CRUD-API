"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../src/app");
app_1.server.close();
// beforeEach(() => {
//     server.listen(5500);
// });
// afterEach(() => {
//   return  server.close();
// });
const url = ('http://localhost:5500');
describe('GET /users', function () {
    it('should return a 200 status code', () => {
        return (0, supertest_1.default)(app_1.server)
            .get('/api/users')
            .expect(200);
    });
    it('should add new item to stage', async () => {
        const response = await (0, supertest_1.default)(app_1.server)
            .post('/app/user')
            .send({ 'name': 'John',
            'age': 22,
            'hobbies': ['swim'] });
        // expect(response.statusCode).toBe(404)
        // expect(response.body).toMatchObject({
        //     completed: true,
        //     id: 1
        // })
    });
    it('should return a 200 status code', (done) => {
        async () => {
            const response = await (0, supertest_1.default)(app_1.server)
                .get('/app/users');
            expect(response.statusCode).toBe(200);
        };
        done();
    });
});
//# sourceMappingURL=server.test.js.map