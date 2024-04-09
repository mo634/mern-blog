import express from 'express'
import mongoose from 'mongoose'
import dotenv from "dotenv"
import userRouter from "./routes/user.route.js"
import postRouter from "./routes/post.route.js"
import commentRouter from "./routes/comment.route.js"
import authRouter from "./routes/auth.route.js"
import cookieParser from 'cookie-parser'
import path from 'path';

dotenv.config()

const app = express()

// connect DB 
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("connected  to DB "))
.catch((err) => { console.log("error to connect DB : ",err) })

// use   middleware
app.use(express.json())

app.use(cookieParser())

// run server 
app.listen(4000, () => {
    console.log('server is running on port 4000')
})

const __dirname = path.resolve();

// routes
app.use("/api/auth", authRouter)

app.use("/api/user", userRouter)

app.use("/api/post", postRouter)

app.use("/api/comment", commentRouter)

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

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