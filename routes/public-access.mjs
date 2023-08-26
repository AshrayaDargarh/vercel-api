import express from "express"
import { publicView } from "../controllers/public-controller.mjs"

export const publicRouter=express.Router()

publicRouter
.get('/:id',publicView)