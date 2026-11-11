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
         email VARCHAR(255) UNIQUE NOT NULL,
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


//post method
app.post('/api/users',async(req:Request,res:Response)=>{
   const { name, email, password, age } = req.body;

   try {
     const result = await pool.query(`
        INSERT INTO users (name,email,password,age) VALUES($1,$2,$3,$4) RETURNING *
        
    `,[name, email, password, age])

    res.status(201).json({
        message : "create user successfully",
        data: result.rows[0],
    })
    
   } catch (error:any) {
    res.status(500).json({
        message : error.message,
        error:error,
    })
    
   }
   
})


//get all uer
app.get('/api/users',async(req:Request,res:Response)=>{
       try {
        const result = await pool.query(`
             SELECT * FROM users;
        `)
        res.status(200).json({
            success: true,
            message: "all user ",
            data : result.rows,
        });
        
       } catch (error:any) {
        res.status(500).json({
            success:false,
            message:"data not found",
            data : error.message,
            error : error,
        });
        
       }
})


//singer user get

app.get('/api/users/:id',async(req:Request,res:Response)=>{
    const {id} = req.params;

    try {
        const result = await pool.query(`
            SELECT * FROM users WHERE id =$1;
             
    `,[id])

    if(result.rows.length === 0){
       return res.status(404).json({
            success: false,
            message: "user not found ",
            data : {},
        });
    }

     res.status(200).json({
            success: true,
            message: "get singel user ",
            data : result.rows[0],
        });
        
    } catch (error:any) {
        res.status(500).json({
            success:false,
            message:"data not found",
            data : error.message,
            error : error,
        });
        
    }
})





app.listen(port, ()=> {
    console.log(`server is running ${port}`);
})