interface IncomingData {
    name: string;
    age: number;
    hobbies: string[];
}
interface Storage extends IncomingData {
    id: string;
}
declare class Users {
    private _storage;
    private _statusCode;
    private _errorMessage;
    constructor();
    get statusCode(): number;
    get errorMessage(): string;
    set errorMessage(message: string);
    set statusCode(code: number);
    setData(data: IncomingData): string | undefined;
    getAllData(): Storage[];
    validateId(id: string): void;
    getUserById(id: string): string | Storage;
    updateUser(data: IncomingData, id: string): string;
    deleteUser(id: string): string | undefined;
}
declare const UsersInstance: Users;
export { UsersInstance };
