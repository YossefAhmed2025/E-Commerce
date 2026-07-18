import {Document, model, Schema} from "mongoose";
import mongoose from "mongoose";
import type { IProduct } from "./productmodel.js";  

export interface IorderItem extends Document {
    producttitle: string;
    productquantity: number;
    productPrice: number;
    productImage: string;
}

export interface Iorder extends Document {
    userId: import("mongoose").Types.ObjectId | string;
    items: IorderItem[];
    address: string;
    totalAmount: number;
    status: 'pending' | 'completed' | 'cancelled';
}
const orderItemSchema = new Schema<IorderItem>({
    producttitle: { type: String, required: true },
    productImage: { type: String, required: true },
    productPrice: { type: Number, required: true },
    productquantity: { type: Number, required: true }, 
});

const orderSchema = new Schema<Iorder>({
   totalAmount: { type: Number, required: true },
   userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
   items: [orderItemSchema],
   address: { type: String, required: true },
   status: { type: String, enum: ['pending', 'completed', 'cancelled'], required: true, default: 'pending' }
});

export const Order =mongoose.model<Iorder>('Order', orderSchema);  