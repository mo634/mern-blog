import express from 'express'
import mongoose from 'mongoose'
import dotenv from "dotenv"
import userRouter from "./routes/user.route.js"
import authRouter from "./routes/auth.route.js"
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


// routes
app.use("/api/auth", authRouter)


// middleware "custom func for handle the errors"

app.use((error,req,res,next) => { 


    const status = error.status || 500

    const message = error.message || "something went wrong"

    return res.status(status).json({
        success:false , 
        status,
        message
    })

})