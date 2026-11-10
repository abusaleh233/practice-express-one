import express, { type Application, type Request, type Response } from "express";
const app:Application = express();
const port = 5000;

app.get('/user',(req:Request,res:Response)=>{
    res.send("hello saleh ahmad");
})

app.listen(port, ()=> {
    console.log(`server is running ${port}`);
})