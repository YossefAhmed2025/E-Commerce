import express from "express";
import { addItemToCart, getActivecartForUser, updateCartItem, deleteCartItem } from "../services/cartService.js";
import validateJWT from "../middlewears/validateJWT.js";
import type { ExtendedRequest } from "../types/extendedRequest.js";
import { checkout } from "../services/cartService.js";
const router = express.Router();
import { clearCart } from "../services/cartService.js";

router.get("/", validateJWT, async (request: ExtendedRequest, response) => {
    try {
    const userId = request.user_Id; // use a cast since user_Id isn't on the Express Request type
    const cart = await getActivecartForUser({ userId });
    response.status(200).send(cart);
} catch (error) {
    console.error('Error fetching user cart:', error);
    response.status(500).send({ error: 'Internal server error' });
}
});


router.delete("/",validateJWT, async (request: ExtendedRequest, response) => {
    try {
    const userId = request.user_Id;
    const result = await clearCart({userId});
    response.status(result.status).send(result.data);
} catch (error) {
    console.error('Error clearing user cart:', error);
    response.status(500).send({ error: 'Internal server error' });
}
});
router.post("/items", validateJWT, async (request: ExtendedRequest, response) => {
    try {
        const userId = request.user_Id;
        const { productId, quantity } = request.body;
        const cartItem = await addItemToCart({ userId, productId, quantity });
        response.status(cartItem.status).send(cartItem.data);
    } catch (error) {
        console.error('Error adding item to cart:', error);
        response.status(500).send({ error: 'Internal server error' });
    }
});


router.put('/items', validateJWT, async (request: ExtendedRequest, response) => {
    try {
        const userId = request.user_Id;
        const { productId, quantity } = request.body;
        const result = await updateCartItem({ userId, productId, quantity });
        response.status(result.status).send(result.data);
    } catch (error) {
        console.error('Error updating cart item:', error);
        response.status(500).send({ error: 'Internal server error' });
    }
});
router.delete('/items/:productId', validateJWT, async (request: ExtendedRequest, response) => {
    try {
        const userId = request.user_Id;
        const { productId } = request.params;
        const result = await deleteCartItem({ userId, productId });
        response.status(result.status).send(result.data);
    } catch (error) {
        console.error('Error deleting cart item:', error);
        response.status(500).send({ error: 'Internal server error' });
    }
});

router.post("/checkout", validateJWT, async (request: ExtendedRequest, response) => {
    try {
        const userId = request.user_Id;
        const { address } = request.body;
        const result = await checkout({ userId, address });
        response.status(result.status).send(result.data);
    } catch (error) {
        console.error('Error during checkout:', error);
        response.status(500).send({ error: 'Internal server error' });
    }
});
export default router;

