import express, {Request,Response} from 'express'
import jwt from "jsonwebtoken"
import User from '../modals/user';

const router = express.Router();

// create user and if had errors handling those

// /api/users/register
router.post("/register", async (req:Request, res:Response) =>{
    try{
         let user=await User.findOne({
            email:req.body.email,
         });

         if(user){
            return res.status(400).json({message:"User already exists..."})
         }

         user=new User(req.body);
         await user.save();

        // set JWT token and make cookie
         const token = jwt.sign({userId:user.id}, process.env.JWT_SECRET_KEY as string, {
            expiresIn: "1d",

         });

         res.cookie("auth token", token , {
            httpOnly:true,
            secure: process.env.NODE_ENV==="production",
            maxAge:86400000,
         })
         return res.sendStatus(200)
    }catch(error){
        res.status(500).send({message:"Internal Server Error..."})    }
})

export default router