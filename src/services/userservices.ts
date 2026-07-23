import usermodel from '../models/usermodel.js';   
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface registerparams{
    firstName:string;
    lastName:string;
    email:string;
    password:string;
}
export const register = async (registerData:registerparams)=>{
    const finduser=await usermodel.findOne({email: registerData.email})
    if(finduser)
        {
        return{data:"user is already exist",status:400}
    }
    const hashpassword=await bcrypt.hash(registerData.password,10)
    const newuser= new usermodel({...registerData,password:hashpassword})
    await newuser.save();
    return{data: generatejwt(newuser.id,newuser.firstName,newuser.lastName,newuser.email),status:200}

}

interface loginparams{
    email:string;
    password:string;
}  
export const login=async (loginData:loginparams)=>{
    const finduser= await usermodel.findOne({email:loginData.email})
    if (!finduser){
        return{data:"user not found",status:400}
    }
    const passwordmatch = await bcrypt.compare(loginData.password,finduser.password)
    if(passwordmatch){
         return{data: generatejwt(finduser.id,finduser.firstName,finduser.lastName,finduser.email),status:200}

    }
    return{data:"invalid password",status:400}
    
}
     const generatejwt=(userId:string, firstName:string, email:string, lastName:string)=>{
        return jwt.sign ({ userId, firstName, email, lastName }, process.env.JWT_SECRET as string);
}
