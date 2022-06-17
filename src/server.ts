import { createServer, IncomingMessage, ServerResponse } from 'http';
import {UsersInstance as Users} from './users';
import dotenv from 'dotenv';

dotenv.config();


const validateUrl = function(request:IncomingMessage){
  const url = request.url||'';
  const pathArray = url.trim().split('/');
  const possibleDir = pathArray.slice(0,3).join('/');
  const possibleId = pathArray.slice(3).join('/');
  if( pathArray.length > 4||pathArray.length < 2 || possibleDir !== '/api/users'){
    return { url:null, id: null };
  }
  return { url:possibleDir, id: possibleId }
}

const isValidIncomingData = function(data:any){
  if (typeof data !=="object"){
    Users.statusCode = 400;
    Users.errorMessage ='Error: Incoming data shoul be object type';
    return false;
  }
  if('name' in data && 'age' in data && 'hobbies' in data){
    const isValid = (typeof data.name === 'string' 
      && typeof data.age === 'number'
      && Array.isArray(data.hobbies)
      && data.hobbies.every( (item: any) => typeof item === 'string')); 
    if(!isValid){
      Users.statusCode = 400;
      Users.errorMessage = 'Not valid data types';
    }
    return isValid;
  }
  Users.statusCode = 400;
  Users.errorMessage = 'Not valid data structure';
  return false;
}


const server = createServer((request: IncomingMessage, response: ServerResponse) => {
  const { url, id } = validateUrl(request);
  //Requests to non-existing endpoints
  if(url === null ){
    response.writeHead(404, {'Content-type': 'application/json'})
    response.end(JSON.stringify('Error: Requests to non-existing endpoints'));
    return;
  }
  //Requests to /api/users
  if( id === ''){
    switch(request.method){
      case 'POST': {
        // try{
          const chunks: string[] = [];
          request.on("data", function (chunk) {
            chunks.push( chunk );
          });
          request.on("end", function () {
            try{
              const incomingDataObj = JSON.parse(chunks.join().toString());
              const data = isValidIncomingData(incomingDataObj)?
              Users.setData(incomingDataObj):
              Users.errorMessage;
              response.writeHead(Users.statusCode, { "Content-Type": "application/json"});
              response.end(JSON.stringify(data));
            }
            catch{
             response.writeHead(500, { "Content-Type": "application/json"});
             response.end(JSON.stringify('Error: Server error'));
            }
          });
        break;
      }
      case 'GET':{
        const data = Users.getAllData();
        response.writeHead(Users.statusCode, { "Content-Type": "application/json" });
        response.end(JSON.stringify(data));
        break;
       }
       default: {
        response.writeHead(404, { "Content-Type": "application/json" });
        response.end(JSON.stringify('This method didn\'t allowed with this url'));
       }
    }
  }
  else{
    switch(request.method){
      case 'PUT': {
        const chunks: string[] = [];
        request.on("data", function (chunk) {
          chunks.push( chunk );
        });
        request.on("end", function () {
          try{
            const incomingDataObj = JSON.parse(chunks.join().toString());
            const data = isValidIncomingData(incomingDataObj)?
            Users.updateUser(incomingDataObj, id):
            Users.errorMessage;

            response.writeHead(Users.statusCode, { "Content-Type": "application/json"});
            response.end(JSON.stringify(data));
          }
          catch{
            response.writeHead(500, { "Content-Type": "application/json"});
            response.end(JSON.stringify('Error: Server error'));
          }
          
        });
        break;
      }
      case 'GET':{
        const data = Users.getUserById(id);
        response.writeHead(Users.statusCode, { "Content-Type": "application/json" });
        response.end(JSON.stringify(data));
        break;
      }
      case 'DELETE':{
        const data = Users.deleteUser(id);
        response.writeHead(Users.statusCode, { "Content-Type": "application/json" });
        response.end(JSON.stringify(data));
        break;
      }
      default: {
        response.writeHead(404, { "Content-Type": "application/json" });
        response.end(JSON.stringify('This method didn\'t allowed with this url'));
       }
    }
  }


})
export default server

