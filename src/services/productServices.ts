import productmodel from "../models/productmodel.js";

export const getAllProducts=async()=>{
return await productmodel.find();

}

export const seedinitialProducts =async()=>{
  try{
        const products =await getAllProducts();
        if (products.length===0){
          await productmodel.insertMany([{
            title: 'labtop',
            image: 'https://pimcdn.sharafdg.com/cdn-cgi/image/width=600,height=600,fit=pad,format=webp,quality=70/images/S400890954_1?1773033984',
            price: 10.99,
            stock: 100
          }]);
        }
  }
  catch(err){
    console.error("error in seeding inittial products",err)
  }
}