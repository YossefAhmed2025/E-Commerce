import { Cart } from '../models/cartModel.js';
import productModel from '../models/productmodel.js';

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
interface AddItemToCartParams {
    userId: string;
    productId: any;
    quantity: number;
}
export const addItemToCart = async ({ productId, quantity, userId }: AddItemToCartParams) => {
    const cart = await getActivecartForUser({ userId });


     const existincart=cart.items.find((p)=>p.product.toString()===productId);
     if(existincart){
       return { data: "item already exist in cart", status: 400 };}
     //fetch the product 
     const product = await productModel.findById(productId);
     
     if(!product){
        return { data: "product not found", status: 404 };
    }
    if(product.stock < quantity){
        return { data: "insufficient stock", status: 400 };
    }

    cart.items.push({ product: productId, unitPrice: product.price, quantity } as any);
   
   //update the total price of the cart
   cart.totalAmount += product.price * quantity;
   const updatedCart = await cart.save();
    return { data: updatedCart, status: 200 };

}
interface UpdateCartItemParams {
    userId: string;
    productId: any;
    quantity: number;
}
export const updateCartItem = async ({ userId, productId, quantity }: UpdateCartItemParams) => {
    const cart = await getActivecartForUser({ userId });

    const existingCartItem = cart.items.find((item) => item.product.toString() === productId);
    if (!existingCartItem) {
        return { data: "item not found in cart", status: 404 };
    }
    const product = await productModel.findById(productId);
    if (!product) {
        return { data: "product not found", status: 404 };
    }
    if (product.stock < quantity) {
        return { data: "insufficient stock", status: 400 };
    }
    existingCartItem.quantity = quantity;

    //recalculate the total price of the cart
    const othercartItems = cart.items.filter((p) => p.product.toString() !== productId);
    let total = othercartItems.reduce((sum, item) => {
        sum += item.quantity * item.unitPrice;
        return sum;
    }, 0);
    total += existingCartItem.quantity * existingCartItem.unitPrice;
    cart.totalAmount = total;

    const updatedCart = await cart.save();
    return { data: updatedCart, status: 200 };
}
interface DeleteCartItemParams {
    userId: string;
    productId: any;
}   

export const deleteCartItem = async ({ userId, productId }: DeleteCartItemParams) => {
    const cart = await getActivecartForUser({ userId });
    const existingCartItemIndex = cart.items.findIndex((item) => item.product.toString() === productId);
    if(existingCartItemIndex === -1){
        return { data: "item not found in cart", status: 404 };
    }
    const othercartItems = cart.items.filter((p) => p.product.toString() !== productId);
    let total = othercartItems.reduce((sum, item) => {
        sum += item.quantity * item.unitPrice;
        return sum;
    }, 0);
    cart.items = othercartItems as any;
    cart.totalAmount = total;
    const updatedCart = await cart.save();
    return { data: updatedCart, status: 200 };

}

interface ClearCartParams {
    userId: string;
}
export const clearCart = async ({ userId }: ClearCartParams) => {
    const cart = await getActivecartForUser({ userId });
    cart.items = [];    
    cart.totalAmount = 0;
    const updatedCart = await cart.save();
    return { data: updatedCart, status: 200 };
}       