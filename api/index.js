import express from 'express'
import mongoose from 'mongoose'
import dotenv from "dotenv"
import userRouter from "./routes/user.route.js"
dotenv.config()

const app = express()

// connect DB 
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("connected  to DB "))
.catch((err) => { console.log("error to connect DB : ",err) })

// use   middleware
app.use(express.json())


// run server 
app.listen(4000, () => {
    console.log('server is running on port 4000')
})

app.use("/test", userRouter)