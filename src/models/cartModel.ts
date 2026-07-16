import mongoose, { type ObjectId, Document, Schema } from 'mongoose';
import type { IProduct } from './productmodel.js';

const cartstatusenum = ['active', 'completed'] as const;    

export interface ICartItem extends Document {
    product: IProduct;
    unitPrice: number;
    quantity: number;
}


export interface ICart extends Document {
    userId:mongoose.Types.ObjectId | string;
    items: ICartItem[];
    totalAmount: number;
    status: 'active' | 'completed' ;
}
const cartItemSchema = new Schema<ICartItem>({

    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, default: 1 },
    unitPrice: { type: Number, required: true },

})

const cartSchema = new Schema<ICart>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [cartItemSchema],
    totalAmount: { type: Number, required: true, default: 0 },
    status: { type: String, enum: ['active', 'completed'], required: true }

})
export const Cart = mongoose.model<ICart>('Cart', cartSchema);