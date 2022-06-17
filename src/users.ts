import { v4, validate } from 'uuid';

enum Args {
    'id',
    'name',
    'age',
    'hobbies'
}

interface IncomingData{
    name: string,
    age: number,
    hobbies: string[],
}
interface Storage extends IncomingData {
    id: string,
}

class Users {
    private _storage: Storage[]
    private _statusCode:number
    private _errorMessage:string
    constructor(){
        this._storage = [];
        this._statusCode = 404;
        this._errorMessage = 'Error: Not valid path';
    }

    public get statusCode() {
        return this._statusCode;
    }

    public get errorMessage() {
        return this._errorMessage;
    }

    public set errorMessage(message:string) {
        this._errorMessage = message;
    }

    public set statusCode(code:number) {
        this._statusCode = code;
    }

    setData(data:IncomingData){
        if('name' in data && 'age' in data && 'hobbies' in data){
            this._storage.push({
                ...data,
                'id': v4()
            });
            this._statusCode = 201;
        }
        else{
            this._statusCode = 400;
            this._errorMessage = 'Error: Not valid data structure';
            return this.errorMessage;
        }
    }
    getAllData():Storage[]{
        this._statusCode = 200;
        return this._storage;
    }
    validateId(id:string){
        if(validate(id)){
            this._statusCode = 404;
            this._errorMessage = 'Error: Record doesn\'t exist'
        }
        else{
            this._statusCode = 400; 
            this._errorMessage = 'Error: UserId is invalid'
        }
    }
    getUserById(id:string){
        const currentItem = this._storage.find( item => item.id === id );
        if (currentItem){
            this._statusCode = 200;
            return currentItem; 
        }
        else {
            this.validateId(id);
            return this.errorMessage;

        };
    }
    updateUser(data:IncomingData,id:string){
        if('name' in data && 'age' in data && 'hobbies' in data){
            const currentItemIdx = this._storage.findIndex( item => item.id === id );
            if( currentItemIdx > -1 ) {
                this._storage[currentItemIdx] = {
                    ...data,
                    id: this._storage[currentItemIdx].id
                }
                this._statusCode = 200;
                return '';
            }
            else {
                this.validateId(id);
                return this.errorMessage
            }
        }
        else{
            this._statusCode = 400;
            this._errorMessage = 'Not valid data structure';
            return this.errorMessage;
        }
    }
    deleteUser(id:string){
         const currentItemIdx = this._storage.findIndex( item => item.id === id );
            if( currentItemIdx > -1 ) {
                this._storage = [
                    ...this._storage.slice(0,currentItemIdx),
                    ...this._storage.slice(currentItemIdx+1)
                ]
                this._statusCode = 204;
            }
            else {
                this.validateId(id);
                return this.errorMessage;
            }
    }

}
const UsersInstance = new Users();

export {UsersInstance};