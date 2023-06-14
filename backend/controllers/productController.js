import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";



const getProdcuts = asyncHandler(async (req, res) => {
    const Products = await Product.find({})
    res.json(Products);
});

const getProdcutByID = asyncHandler(async (req, res) => {
    // const product = Products.find(item => item._id === req.params.id);
    const product = await Product.findById(req.params.id);
    
    if (product) {
        return res.json(product);
    } else {
        res.status(404);
        throw new Error('Resource Not Found');
        // res.status(404).json({message: 'Product not found'});
    }
});

export { getProdcuts,getProdcutByID};