"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const http_1 = require("http");
const users_1 = require("./users");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const validateUrl = function (request) {
    const url = request.url || '';
    const pathArray = url.trim().split('/');
    const possibleDir = pathArray.slice(0, 3).join('/');
    const possibleId = pathArray.slice(3).join('/');
    if (pathArray.length > 4 || pathArray.length < 2 || possibleDir !== '/api/users') {
        return { url: null, id: null };
    }
    return { url: possibleDir, id: possibleId };
};
const isValidIncomingData = function (data) {
    if (typeof data !== "object") {
        users_1.UsersInstance.statusCode = 400;
        users_1.UsersInstance.errorMessage = 'Error: Incoming data shoul be object type';
        return false;
    }
    if ('name' in data && 'age' in data && 'hobbies' in data) {
        const isValid = (typeof data.name === 'string'
            && typeof data.age === 'number'
            && Array.isArray(data.hobbies)
            && data.hobbies.every((item) => typeof item === 'string'));
        if (!isValid) {
            users_1.UsersInstance.statusCode = 400;
            users_1.UsersInstance.errorMessage = 'Not valid data types';
        }
        return isValid;
    }
    users_1.UsersInstance.statusCode = 400;
    users_1.UsersInstance.errorMessage = 'Not valid data structure';
    return false;
};
const server = (0, http_1.createServer)((request, response) => {
    const { url, id } = validateUrl(request);
    console.log(url, "", id, "");
    //Requests to non-existing endpoints
    if (url === null) {
        response.writeHead(404, { 'Content-type': 'application/json' });
        response.end('Error: Requests to non-existing endpoints');
        return;
    }
    //Requests to /api/users
    if (id === '') {
        switch (request.method) {
            case 'POST': {
                // try{
                const chunks = [];
                request.on("data", function (chunk) {
                    chunks.push(chunk);
                });
                console.log('chunks', chunks.join().toString());
                request.on("end", function () {
                    try {
                        const incomingDataObj = JSON.parse(chunks.join().toString());
                        const data = isValidIncomingData(incomingDataObj) ?
                            users_1.UsersInstance.setData(incomingDataObj) :
                            users_1.UsersInstance.errorMessage;
                        response.writeHead(users_1.UsersInstance.statusCode, { "Content-Type": "application/json" });
                        response.end(data);
                    }
                    catch (_a) {
                        response.writeHead(500, { "Content-Type": "application/json" });
                        response.end('Error: Server error');
                    }
                });
                break;
            }
            case 'GET': {
                console.log('in GET method');
                const data = users_1.UsersInstance.getAllData();
                response.writeHead(users_1.UsersInstance.statusCode, { "Content-Type": "application/json" });
                response.end(JSON.stringify(data));
                break;
            }
            default: {
                response.writeHead(404, { "Content-Type": "application/json" });
                response.end('This method didn\'t allowed with this url');
            }
        }
    }
    else {
        switch (request.method) {
            case 'PUT': {
                const chunks = [];
                request.on("data", function (chunk) {
                    chunks.push(chunk);
                });
                request.on("end", function () {
                    console.log(chunks.join().toString());
                    try {
                        const incomingDataObj = JSON.parse(chunks.join().toString());
                        const data = isValidIncomingData(incomingDataObj) ?
                            users_1.UsersInstance.updateUser(incomingDataObj, id) :
                            users_1.UsersInstance.errorMessage;
                        response.writeHead(users_1.UsersInstance.statusCode, { "Content-Type": "application/json" });
                        response.end(data);
                    }
                    catch (_a) {
                        response.writeHead(500, { "Content-Type": "application/json" });
                        response.end('Error: Server error');
                    }
                });
                break;
            }
            case 'GET': {
                const data = users_1.UsersInstance.getUserById(id);
                response.writeHead(users_1.UsersInstance.statusCode, { "Content-Type": "application/json" });
                response.end(JSON.stringify(data));
                break;
            }
            case 'DELETE': {
                const data = users_1.UsersInstance.deleteUser(id);
                response.writeHead(users_1.UsersInstance.statusCode, { "Content-Type": "application/json" });
                response.end(JSON.stringify(data));
                break;
            }
            default: {
                response.writeHead(404, { "Content-Type": "application/json" });
                response.end('This method didn\'t allowed with this url');
            }
        }
        console.log(users_1.UsersInstance.getUserById(id));
        console.log(users_1.UsersInstance.statusCode, users_1.UsersInstance.errorMessage);
    }
});
exports.server = server;
server.listen(process.env.PORT);
//# sourceMappingURL=app.js.map