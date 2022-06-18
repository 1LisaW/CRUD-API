import { v4, validate } from 'uuid';
import storageModel from './model'

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
    public model
    constructor(){
        this.model = storageModel;
    }
    public get statusCode() {
        return this.model.statusCode;
    }

    public get errorMessage() {
        return this.model.errorMessage;
    }

    public set errorMessage(message:string) {
        this.model.errorMessage = message;
    }

    public set statusCode(code:number) {
        this.model.statusCode = code;
    }

    setData(data:IncomingData){
        if('name' in data && 'age' in data && 'hobbies' in data){
            const newData:Storage = {
                ...data,
                'id': v4()
            }
            this.model.storage.push(newData);
            this.model.statusCode = 201;
            return newData;
        }
        else{
            this.model.statusCode = 400;
            this.model.errorMessage = 'Error: Not valid data structure';
            return this.model.errorMessage;
        }
    }
    getAllData():Storage[]{
        this.model.statusCode = 200;
        return this.model.storage;
    }
    validateId(id:string){
        if(validate(id)){
            this.model.statusCode = 404;
            this.model.errorMessage = 'Error: Record doesn\'t exist'
        }
        else{
            this.model.statusCode = 400; 
            this.model.errorMessage = 'Error: UserId is invalid'
        }
    }
    getUserById(id:string){
        const currentItem = this.model.storage.find( item => item.id === id );
        if (currentItem){
            this.model.statusCode = 200;
            return currentItem; 
        }
        else {
            this.validateId(id);
            return this.model.errorMessage;

        };
    }
    updateUser(data:IncomingData,id:string){
        if('name' in data && 'age' in data && 'hobbies' in data){
            const currentItemIdx = this.model.storage.findIndex( item => item.id === id );
            if( currentItemIdx > -1 ) {
                this.model.storage[currentItemIdx] = {
                    ...data,
                    id
                }
                this.model.statusCode = 200;
                return this.model.storage[currentItemIdx];
            }
            else {
                this.validateId(id);
                return this.model.errorMessage
            }
        }
        else{
            this.model.statusCode = 400;
            this.model.errorMessage = 'Not valid data structure';
            return this.model.errorMessage;
        }
    }
    deleteUser(id:string){
         const currentItemIdx = this.model.storage.findIndex( item => item.id === id );
            if( currentItemIdx > -1 ) {
                const removedData = {...this.model.storage[currentItemIdx]};
                this.model.storage = [
                    ...this.model.storage.slice(0,currentItemIdx),
                    ...this.model.storage.slice(currentItemIdx+1)
                ]
                this.model.statusCode = 204;
                return removedData;

            }
            else {
                this.validateId(id);
                return this.model.errorMessage;
            }
    }

}
const UsersInstance = new Users();

export {UsersInstance};