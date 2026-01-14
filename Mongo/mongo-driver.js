import {MongoClient} from 'mongodb';

const client = new MongoClient('mongodb://127.0.0.1');
await client.connect();

const db = client.db("mongodb_js");

const userCollection = db.collection("users");

// userCollection.insertOne({name: "Jignesh",  age: 31});

// userCollection.insertMany([
//     {name: "Alice", age: 25},
//     {name: "Bob", age: 28},
//     {name: "Charlie", age: 30}
// ])



// const userData= await userCollection.find().toArray();

// const userData = await userCollection.findOne({name: "Jignesh"});

// console.log(userData._id.toHexString());

await userCollection.updateMany({name: "alice"}, {$set: {age: 29}});
await userCollection.updateMany({name: "Jignesh"}, {$set: {age: 39}});

await userCollection.deleteMany({});