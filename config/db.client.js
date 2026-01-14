import {MongoClient} from 'mongodb';
import {env} from "./env.js";

const dbClient = new MongoClient(env.MONGOURL);

await dbClient.connect();

export {dbClient};


