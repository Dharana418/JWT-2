import { error } from "console";
import user from "../models/userSchema.js";
import bcrypt from 'bcryptjs';

const createuser=async(req,res)=>{
    try{
        const{email,username,password}=req.body;
        const hashpassword=await bcrypt.hash(password,10);
        const newUser=new user({email,username,password:hashpassword})
        await newUser.save();
        res.status(201).json({message:"User created successfully"});
}catch(err){
    res.status(500).json({error:"Error signing up"})
}
}


export{createuser}

