import express from "express";
const router = express.Router();
import { getAllProducts } from "../services/productServices.js";
router.get("/", async (request, response) => {
try {
    const products = await getAllProducts();
    response.status(200).send(products);
} catch (error) {
    console.error('Error fetching products:', error);
    response.status(500).send({ error: 'Internal server error' });
}
});
export default router;