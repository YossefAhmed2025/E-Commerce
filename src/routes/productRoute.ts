import express, { response } from "express";
import { getAllProducts } from "../services/productServices.js";
const router= express.Router();

router.get('/', async (request,response)=>{

    try{
        const product =await getAllProducts();
        response.status(200).send(product)
    }
    catch(error){
        console.error(response.status(500).send(error))
    }
}
)

export default router;