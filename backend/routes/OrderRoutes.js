import express from "express";
const router = express.Router();
import { addOrderItems, getOrderById, getMyOrders, UpdateOrderToDelivered, UpdateOrderToPaid, getOrders } from "../controllers/orderController.js";

import { admin, protect } from "../middleware/authMiddleWare.js";

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, admin, getOrderById);
router.route('/:id/pay').put(protect, UpdateOrderToPaid);
router.route('/:id/deliver').get(protect, admin, UpdateOrderToDelivered);

export default router;