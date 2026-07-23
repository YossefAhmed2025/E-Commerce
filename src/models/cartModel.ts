import mongoose,{type ObjectId,Document,Schema} from "mongoose";
import type { IProduct } from "./productmodel.js";

const cartstatusenum = ['active', 'completed'] as const;    

export interface ICartItem extends Document{
    product:IProduct;
    unitPrice:Number;
    quantity:number;
}

export interface Icart extends Document{
    userId:mongoose.Types.ObjectId | string;

    items: ICartItem[];

    totalAmount: number;

    status: 'active' | 'completed' ;
}

const cartItemschema= new Schema<ICartItem>({
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },

    quantity: { type: Number, required: true, default: 1 },

    unitPrice: { type: Number, required: true },


})

const cartschema = new Schema <Icart>({

    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },

    items: [cartItemschema],

    totalAmount: { type: Number, required: true, default: 0 },

    status: { type: String, enum: ['active', 'completed'], required: true }
}

)
export const Cart = mongoose.model<Icart>('Cart', cartschema);