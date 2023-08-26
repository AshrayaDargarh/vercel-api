import express from "express"
import { createView,getViews,updateView,deleteView,getView,updateExpiry } from "../controllers/view.mjs"
// ,updateView,deleteView
export const viewRouter=express.Router()

viewRouter
.post('/',createView)
.get('/',getViews)
.get('/:id',getView)
.patch('/:id',updateView)
.patch('/expiry/:id',updateExpiry)
.delete('/:id',deleteView) 