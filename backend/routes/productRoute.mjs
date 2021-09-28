import express from 'express';
import Product from '../models/productModel.mjs';
import { getToken, isAdmin, isAuth } from '../utl.mjs';

const router = express.Router();

router.get("/", async(req, res) => {
    const products = await Product.find({});
    res.send(products)
});
router.post("/", async(req, res) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        img: req.body.img,
        qty: req.body.qty,
        description: req.body.description,
        total: req.body.total,
        color: req.body.color,
    });
    const newProduct = await product.save()
    .catch((err) => console.log(err));
    if(newProduct){
      return  res.status(201).send({msg: "New Product Created", data: newProduct});
      
    }
    return res.status(500).send({msg: "Error in creating Product."})
    console.log("ok") 
})

router.put("/:id", async(req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if(product) {
        product.name = req.body.name;
        product.price = req.body.price;
        product.img = req.body.img;
        product.qty = req.body.qty;
        product.description = req.body.description;
        product.total = req.body.total;
        product.color = req.body.color;

        const updatedProduct = await product.save()
    .catch((err) => console.log(err));
    if(updatedProduct){
      return  res.status(200).send({msg: "New Product Updated", data: updatedProduct});
      
    }
    return res.status(500).send({msg: "Error in Updating Product."})
    console.log("ok") 

    }
})

router.delete("/:id", async(req, res) => {
    const deleteProduct = await Product.findById(req.params.id);
    if(deleteProduct){
        await deleteProduct.remove()
        res.send({message: "product Deleted"})
    }else{
        res.send("Error in Deletion")
    }
    
})
    
export default router;