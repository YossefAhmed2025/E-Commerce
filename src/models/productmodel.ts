import mongoose, { Schema,Document } from "mongoose";

export interface IProduct extends Document{
  title:string;
  image:string;
  price:number;
  stock:number;
}


const productSchema=new Schema <IProduct>(
  {
    title:{type:String,required:true},
    image:{type:String,requires:true},
    price:{type:Number,requires:true},
    stock:{type:Number,requires:true,default:0}
  }
)

const productmodel =mongoose.model<IProduct>('product',productSchema);
export default productmodel;