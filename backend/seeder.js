// import mongooes from 'mongoose';
// import dotenv from 'dotenv';
// import users from './data/Users';
// import products from './data/Product';
// import User from './models/userModal';
// import Product from './models/productModel';
// import Order from './models/orderModal';
// import connectDB from './config/db';

import mongooes from "mongoose";
import dotenv from "dotenv";
import users from "./data/Users.js";
import products from "./data/Product.js";
import User from "./models/userModal.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModal.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers[0]._id;
        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser}
        });

        await Product.insertMany(sampleProducts);

        console.log("Data Imported");
        process.exit();
    } catch (error) {
        console.log("Error ", `${error.message}`);
        process.exit(1);
    }
}


const destroyData = async () => {
    try {
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();

        console.log("Data Destroyed");
        process.exit();
    } catch (error) {
        console.log("Error ", `${error.message}`);
        process.exit(1);
    }
}

importData();
if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}