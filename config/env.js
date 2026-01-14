import 'dotenv/config';
import {z} from "zod";
export const env=z.object({
    PORT:z.string().default("3000"),
    MONGOURL:z.string(),
    MONGO_DB_NAME:z.string()
}).parse(process.env);