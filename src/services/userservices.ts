import usermodel from '../models/usermodel.js';   
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
interface Registerparams {                  
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}



export const register =async (registerData: Registerparams)=> {
    const finduser =  await usermodel.findOne( { email: registerData.email });

    if (finduser) {
        return {data: 'User already exists' , statuscode: 400};
    }

    const hashedPassword= await bcrypt.hash(registerData.password, 10);
    const newuser = new usermodel({ ...registerData, password: hashedPassword });
    await newuser.save();

    return {data: generatejwt(newuser.firstName, newuser.email, newuser.lastName), statuscode: 200};


}
interface Loginparams {
    email: string;
    password: string;
}

export const login = async (loginData: Loginparams) => {

    const finduser = await usermodel.findOne({ email: loginData.email });
    if (!finduser) {
        return { data: 'User not found', statuscode: 400 };
    }
    const passwordMatch = await bcrypt.compare(loginData.password, finduser.password);
    if (passwordMatch) {
       return { data: generatejwt(finduser.firstName, finduser.email,finduser.lastName), statuscode: 200 };
    }
    
     return { data: 'Invalid password', statuscode: 400 }};
     
     const generatejwt=(firstName:string, email:string, lastName:string)=>{
        return jwt.sign ({ firstName, email, lastName }, 'bcc54488416f36aefb23108a7d3df5768af152d8ad15e5cf8c2351ab9eaf88f0')   
}
