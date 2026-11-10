import express, { type Application, type Request, type Response } from "express";
const app:Application = express();
const port = 5000;

app.use(express.json());

app.get('/user',(req:Request,res:Response)=>{
    res.status(200).json({
        "message" : "express explore",
        "author" : "saleh ahmad" 
    })
})

app.post('/admin',async(req:Request,res:Response)=>{
    console.log(req.body);
})

app.listen(port, ()=> {
    console.log(`server is running ${port}`);
})