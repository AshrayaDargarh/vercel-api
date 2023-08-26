import { View } from "../models/view.mjs"


export const publicView=async(req,res)=>{
    try {
        const id=req.params.id
        const view=await View.findById({_id:id})
        if(!view)
        {
            res.status(400).json({message:"Snippet Not found."})
        }
        else
        {
            res.json(view) 
        }
    } catch (error) {
        res.json(error)
    }
}