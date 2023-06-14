import express from "express";
import { getProdcutByID, getProdcuts } from "../controllers/productController.js";
// import Products from '../data/Product.js';
// import asyncHandler from "../middleware/asyncHandler.js";
// import Product from "../models/productModel.js";
const router = express.Router();


router.route('/').get(getProdcuts);
router.route('/:id').get(getProdcutByID);

export default router;