const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
let dbUrl = `${process.env.DB_URL}/${process.env.DB_NAME}`;
module.exports = {dbUrl,mongodb,MongoClient}