const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
let dbName = 'b28we';
let dbUrl = `mongodb+srv://Raj2710:Raj2710@raj.x3e0h.mongodb.net/${dbName}`;

module.exports = {dbUrl,mongodb,MongoClient}