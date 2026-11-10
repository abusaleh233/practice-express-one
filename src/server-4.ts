import express, { type Application, type Request, type Response } from "express";
import {Pool} from "pg"
const app:Application = express();
const port = 5000;

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended:true}));

const pool = new Pool({
    connectionString: "postgresql://neondb_owner:npg_vHPxIqh36sRo@ep-lingering-sky-ao9er3t1-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
})

const initDB = async () => {
    try{
        await pool.query(`
            
         CREATE TABLE IF NOT EXISTS users (
         id SERIAL PRIMARY KEY,
         name VARCHAR(255) NOT NULL,
         email VARCHAR(255) NOT NULL,
         password VARCHAR(30) NOT NULL,
         isActive BOOLEAN DEFAULT true,
         age INT,

         create_at TIMESTAMP DEFAULT NOW(),
         update_at TIMESTAMP DEFAULT NOW()
         )   
            `)
            console.log("database connected successfully");

    }catch(error){
        console.log(error);

    }
}

initDB();

app.get('/',(req:Request,res:Response)=>{
    res.status(200).json({
        "message" : "express explore",
        "author" : "saleh ahmad" 
    })
})

app.post('/',async(req:Request,res:Response)=>{
    const body = req.body;
    res.status(201).json({
        message : "create a user",
        data: body,
    })
})

app.listen(port, ()=> {
    console.log(`server is running ${port}`);
})