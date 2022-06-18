interface IncomingData{
    name: string,
    age: number,
    hobbies: string[],
}
interface Storage extends IncomingData {
    id: string,
}


class Model {
    public storage: Storage[]
    private _statusCode:number
    private _errorMessage:string
    constructor(){
        this.storage = [];
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
}
const storageModel = new Model();
export default storageModel;