import express from "express";
import { 
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUserById,
    deleteUser,
    updateUser,
    getUsers } from "../controllers/userController.js";
import { admin, protect } from "../middleware/authMiddleWare.js";


const router = express.Router();


router.route('/').post(registerUser).get(protect, admin, getUsers);
router.route('/profile').get(protect, getUserProfile).put( protect ,updateUserProfile);
router.route('/:id').delete(protect, admin, deleteUser).get(protect, admin, getUserById).put(protect, admin, updateUser);
router.post('/logout', logoutUser);
router.post('/auth', authUser);

export default router;