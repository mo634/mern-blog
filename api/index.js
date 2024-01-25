import express from 'express'
import mongoose from 'mongoose'
import dotenv from "dotenv"
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