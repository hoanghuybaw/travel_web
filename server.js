import express from "express"
import * as dotenv from "dotenv"
dotenv.config()
import connect from "./database/database.js"
import { userRouter, tourlistRouter, bookingRouter, countryRouter, discountRouter, commentsRouter } from "./routes/index.js"
import checkToken from "./authentication/auth.js"
import cors from "cors"

const app = express()
app.use(cors("*"))
app.use('/public', express.static('public'))
app.use(checkToken)
app.use(express.json())
const port = process.env.PORT || 3000
//router
app.use('/users', userRouter)
app.use('/tourlist', tourlistRouter)
app.use('/booking', bookingRouter)
app.use('/country', countryRouter)
app.use('/discount', discountRouter)
app.use('/comments', commentsRouter)

app.get('/', (req, res) => {
    res.send('response from root router')
})
app.listen( port, async() => {
    await connect()
    console.log(`listing on port : ${port}`);
})