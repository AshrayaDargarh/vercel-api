import express from "express"
import { signUp,login,forgotPassword,resetPassword,verifyEmail,manuallyVerifyEmail } from "../controllers/auth.mjs"
export const authRouter=express.Router()
authRouter
.post('/signUp',signUp)
.post('/login',login)
.post('/forgot-password',forgotPassword)
.post('/reset-password/:token',resetPassword)
.post('/verify/:token',verifyEmail)
.post('/manually-verify',manuallyVerifyEmail)