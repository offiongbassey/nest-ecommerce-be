"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const redis_1 = require("redis");
let client;
if (process.env.NODE_ENV === "production") {
    const redisHost = process.env.PROD_REDIS_HOST;
    const redisAccess = process.env.PROD_REDIS_ACCESS_KEY;
    exports.client = client = (0, redis_1.createClient)({
        // rediss for TLS
        url: `rediss://${redisHost}:6380`,
        password: redisAccess
    });
}
else {
    exports.client = client = (0, redis_1.createClient)();
}
client.on('error', (err) => console.log('Redis Client Error', err));
client.connect();
