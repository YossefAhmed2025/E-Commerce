import express from "express";
import { addItemToCart, getActivecartForUser } from "../services/cartService.js";
import validateJWT from "../middlewears/validateJWT.js";
import type { ExtendedRequest } from "../types/extendedRequest.js";
const router = express.Router();

router.get("/", validateJWT, async (request: ExtendedRequest, response) => {
    const userId = request.user_Id; // use a cast since user_Id isn't on the Express Request type
    const cart = await getActivecartForUser({ userId });
    response.status(200).send(cart);
});

router.post("/items", validateJWT, async (request: ExtendedRequest, response) => {
    const userId = request.user_Id;
    const { productId, quantity } = request.body;
    const cartItem = await addItemToCart({ userId, productId, quantity });
    response.status(cartItem.status).send(cartItem.data);
});
export default router;

