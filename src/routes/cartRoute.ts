import express from "express";
import { getActivecartForUser } from "../services/cartService.js";
import validateJWT from "../middlewears/validateJWT.js";
const router = express.Router();

router.get("/", validateJWT, async (request, response) => {
    const userId = (request as any).user_Id; // use a cast since user_Id isn't on the Express Request type
    const cart = await getActivecartForUser({ userId });
    response.status(200).send(cart);
});

export default router;

