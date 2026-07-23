import express, { response } from 'express';
import { login, register } from '../services/userservices.js';
const router = express.Router();

router.post('/register',async (request,response)=>{
    try{
        const{firstName,lastName,email,password}=request.body;
        const result=await register({firstName,lastName,email,password})
        response.status(200).send("Registration Success")
    }
    catch(error){

        console.error("error in Registration",error);
        response.status(500).send("error in Registration")
    }    
}
);

router.post('/login',async (request,response)=>{
try{
    const {email,password}=request.body;
    const result=await login({email,password});
    response.status(200).send("login success");

}
catch(err){
    console.error("error in login",err);
    response.status(500).send("failed login");
}
})
export default router;