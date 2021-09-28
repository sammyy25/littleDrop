import  mongoose  from "mongoose";

const productSchema = new mongoose.Schema({
    name:{type: String, required: true},
    img:{type: String, required: true},
    color:{type: String, required: true},
    price:{type: Number,default:0, required: true},
    qty:{type: Number, default:1, required: true},
    total:{type: Number, required: true},
    description:{type: String, required: true}
    
});
const productModel = mongoose.model("Product", productSchema);

export default productModel;