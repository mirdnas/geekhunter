import { createConnection } from "typeorm";

createConnection().then( connection => {
  console.log('connection work', connection.isConnected )
}).catch(error => console.log(error));
