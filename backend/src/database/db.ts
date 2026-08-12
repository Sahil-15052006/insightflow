import { neon } from "@neondatabase/serverless";
import dotenv from 'dotenv'

dotenv.config();
const DATABASE_URL:string=process.env.DATABASE_URL!
const sql = neon(DATABASE_URL)

async function connectDB() {
    try{
        const result =  await sql`SELECT version()`;
        console.log("Database connected : ",result[0]!.version);
    }catch(error){
        console.log(error);
    }
}

export default connectDB;

