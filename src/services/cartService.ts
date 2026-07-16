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