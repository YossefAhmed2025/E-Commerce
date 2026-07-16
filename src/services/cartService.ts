import { Cart } from '../models/cartModel.js';

interface CreateCartForUser {
    userId: string;
}

const createCartUser = async ({ userId }: CreateCartForUser) => {
    // Cart.create persists the document, explicit save is unnecessary
    const cart = await Cart.create({ userId, status: 'active' });
    return cart;
};

export const getActivecartForUser= async ({userId}: {userId: string}) => {
    let cart = await Cart.findOne({ userId, status: 'active' })
    if (!cart) {
        cart = await createCartUser({ userId });
    }

    return cart;
};
