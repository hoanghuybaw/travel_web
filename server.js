import express from "express"
import * as dotenv from "dotenv"
dotenv.config()
import connect from "./database/database.js"
import { userRouter, tourlistRouter } from "./routes/index.js"

const app = express()
app.use(express.json())
const port = process.env.PORT || 3000
//router
app.use('/users', userRouter)
app.use('/tourlist', tourlistRouter)

app.get('/', (req, res) => {
    res.send('response from root router')
})
app.listen( port, async() => {
    await connect()
    console.log(`listing on port : ${port}`);
})