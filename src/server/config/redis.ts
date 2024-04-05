import { createClient } from "redis";

let client: any
if(process.env.NODE_ENV === "production"){
    const redisHost = process.env.PROD_REDIS_HOST;
    const redisAccess = process.env.PROD_REDIS_ACCESS_KEY;

     client = createClient({
       // rediss for TLS
       url: `rediss://${redisHost}:6380`,
       password: redisAccess
    })
}else{
    client = createClient();
}

client.on('error', (err: any) => console.log('Redis Client Error', err));

client.connect();

export { client } 