const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

import dotenv from 'dotenv';
dotenv.config();

(async () => {
    const mongod = await MongoMemoryServer.create();
    const mongoUri = process.env.MONGODB_CONNECTION_STRING?.replace(
        '<USERNAME>',
        process.env.MONGODB_CONNECTION_STRING_USERNAME ?? ''
    )?.replace(
        '<PASSWORD>',
        process.env.MONGODB_CONNECTION_STRING_PASSWORD ?? ''
    );

    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then((result: { connection: { readyState: any; host: any; }; }) => {
    }).catch((err: any) => {
        console.log(err);
    });;
})();