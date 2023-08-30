import express, { json } from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"
dotenv.config()
import { authRouter } from "./routes/auth.mjs"
import { viewRouter } from "./routes/view.mjs"
import { userRouter } from "./routes/user.mjs"
import jwt from "jsonwebtoken"
import { publicRouter } from "./routes/public-access.mjs"
import path from "path"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const app=express()
 
// db connection
main().catch(err=>console.log(err,'Something went wrong while connecting with the database'))
async function main()
{
    await mongoose.connect(process.env.MONGO_URL)
    console.log("DB Connected")
}
const auth=(req,res,next)=>{
    try{
        const token=req.get('Authorization').split('Bearer ')[1]
        const decoded=jwt.verify(token,process.env.SECRET_KEY)
        if(decoded.userId)
        {
            req.userId=decoded.userId
            req.userName=decoded.userName
            next()
        }
    }
    catch(error)
    {
        res.sendStatus(401)
    }
} 
// middleware
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.resolve(__dirname,'dist')));
app.use(json())
app.use(cors())
app.use('/auth',authRouter)
app.use('/view',auth,viewRouter)
app.use('/user',auth,userRouter)
app.use('/public-access',publicRouter) 
app.get('*', (req, res) =>
  res.sendFile(path.resolve('dist', 'index.html'))
);

app.get("/",(req,res)=>{
    res.send("<h1>Inside the home dir</h1>")
})
  
const PORT=process.env.PORT || 4000
app.listen(PORT,()=>{  
    console.log(`Server is listing at http://localhost:${PORT}`)
})