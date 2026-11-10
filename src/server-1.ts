import express, { type Request, type Response } from "express"
const app = express()
const port = 3000


app.get('/', (req, res) => {
 res.send("hello world")
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})