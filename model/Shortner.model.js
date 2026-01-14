import {dbClient} from "../config/db.client.js";
import  {env} from "../config/env.js";

const db = dbClient.db(env.MONGO_DB_NAME);

const shorturlcollection=db.collection("shorturls");

export const LoadFile = async (data)=>{

    return await shorturlcollection.find().toArray();

}


// replaced loadLinks with robust version
export const loadLinks = async (data) => {
    
    return await shorturlcollection.insertOne(data);
    
}

export const getLinkbyShorturl=async(shortcode)=>{
    return await shorturlcollection.findOne({shortcode:shortcode})
}
