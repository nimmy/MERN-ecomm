import mongoose from "mongoose";
import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModal.js";



const addOrderItems = asyncHandler(async (req, res) => {
    const { orderItems, shippingAddress, paymentMethod, itemPrice, taxPrice, shippingPrice, totalPrice } = req.body;
    console.log(req.body);
    if ( orderItems && orderItems.length === 0 ) {
        res.status(400);
        throw new Error('No Order Items');
    } else {
        // let userID = Number('');
        const order = new Order({
            orderItems: orderItems.map(x => ({
                ...x, 
                product: x._id, 
                userID: x._id,
                _id: undefined
            })),
            // user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });
        const createOrder = await order.save();
        res.status(201).json(createOrder);
    }
});

const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id});
    res.status(200).json(orders);
});

const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params._id).populate('user', 'name', 'email');
    if (order) {
        res.status(200).json(order);
    } else {
        res.status(404);
        throw new Error('Order not Found');
    }
});


const UpdateOrderToPaid = asyncHandler(async (req, res) => {
    // const orders = await Order.find({})
    // res.json(orders);
    res.send('Update Orders to Items');
});

const UpdateOrderToDelivered = asyncHandler(async (req, res) => {
    // const orders = await Order.find({})
    // res.json(orders);
    res.send('Update Orders to deliver');
});


const getOrders = asyncHandler(async (req, res) => {
    // const orders = await Order.find({})
    // res.json(orders);
    res.send('get All orders');
});

export {addOrderItems, getOrderById, getMyOrders, UpdateOrderToDelivered, UpdateOrderToPaid, getOrders};