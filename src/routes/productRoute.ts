import express from "express";
const router = express.Router();
import { getAllProducts } from "../services/productServices.js";
router.get("/", async (request, response) => {

    const products = await getAllProducts();
    response.status(200).send(products);
});
export default router;