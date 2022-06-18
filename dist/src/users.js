"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersInstance = void 0;
const uuid_1 = require("uuid");
var Args;
(function (Args) {
    Args[Args["id"] = 0] = "id";
    Args[Args["name"] = 1] = "name";
    Args[Args["age"] = 2] = "age";
    Args[Args["hobbies"] = 3] = "hobbies";
})(Args || (Args = {}));
class Users {
    constructor() {
        this._storage = [];
        this._statusCode = 404;
        this._errorMessage = 'Error: Not valid path';
    }
    get statusCode() {
        return this._statusCode;
    }
    get errorMessage() {
        return this._errorMessage;
    }
    set errorMessage(message) {
        this._errorMessage = message;
    }
    set statusCode(code) {
        this._statusCode = code;
    }
    setData(data) {
        if ('name' in data && 'age' in data && 'hobbies' in data) {
            this._storage.push(Object.assign(Object.assign({}, data), { 'id': (0, uuid_1.v4)() }));
            this._statusCode = 201;
        }
        else {
            this._statusCode = 400;
            this._errorMessage = 'Error: Not valid data structure';
            return this.errorMessage;
        }
    }
    getAllData() {
        this._statusCode = 200;
        return this._storage;
    }
    validateId(id) {
        if ((0, uuid_1.validate)(id)) {
            this._statusCode = 404;
            this._errorMessage = 'Error: Record doesn\'t exist';
        }
        else {
            this._statusCode = 400;
            this._errorMessage = 'Error: UserId is invalid';
        }
    }
    getUserById(id) {
        const currentItem = this._storage.find(item => item.id === id);
        if (currentItem) {
            this._statusCode = 200;
            return currentItem;
        }
        else {
            this.validateId(id);
            return this.errorMessage;
        }
        ;
    }
    updateUser(data, id) {
        if ('name' in data && 'age' in data && 'hobbies' in data) {
            const currentItemIdx = this._storage.findIndex(item => item.id === id);
            if (currentItemIdx > -1) {
                this._storage[currentItemIdx] = Object.assign(Object.assign({}, data), { id: this._storage[currentItemIdx].id });
                this._statusCode = 200;
                return '';
            }
            else {
                this.validateId(id);
                return this.errorMessage;
            }
        }
        else {
            this._statusCode = 400;
            this._errorMessage = 'Not valid data structure';
            return this.errorMessage;
        }
    }
    deleteUser(id) {
        const currentItemIdx = this._storage.findIndex(item => item.id === id);
        if (currentItemIdx > -1) {
            this._storage = [
                ...this._storage.slice(0, currentItemIdx),
                ...this._storage.slice(currentItemIdx + 1)
            ];
            this._statusCode = 204;
        }
        else {
            this.validateId(id);
            return this.errorMessage;
        }
    }
}
const UsersInstance = new Users();
exports.UsersInstance = UsersInstance;
//# sourceMappingURL=users.js.map