import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModal.js";
import generateToekn from "../utils/generateToken.js";


// @desc Auth user & get
// @route GET API/user
// @access Public
const authUser = asyncHandler(async (req, res) => {
    const {email, password}  = req.body;
    console.log(User);
    const user = await User.findOne({email: email});
    if (user && (await user.matchPassword(password))) {
        generateToekn(res, user._id);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    } else {
        res.status(401);
        throw new Error('Invalid Email or Password');
    }
    res.send('auth_user');
});


const registerUser = asyncHandler(async(req, res) => {
    const {name, email, password} = req.body;

    const userExist = await User.findOne({email});

    if (userExist) {
        res.status(401);
        throw new Error('User already Exist')
    }

    const user = await User.create({
        name,
        email,
        password
    });

    if (user) {
        generateToekn(res, user._id);
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    } else {
        res.status(400);
        throw new Error('Invalid User data');
    }
});


const logoutUser = asyncHandler( async(req, res) => {
    res.cookie('jwt', '', {
        httpOnly:true,
        expires: new Date(0)
    });

    res.status(200).json({message: 'Logged out successfully'});
});


const getUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(404);
        throw new Error('User not Found');
    }
});

const updateUserProfile = asyncHandler (async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        });
    } else {
        res.status(404);
        throw new Error('User not Found');
    }
});

const getUserById = asyncHandler (async (req, res) => {
    res.send('GetUsers');
});


const deleteUser = asyncHandler (async (req, res) => {
    res.send('Delete User');
});

const updateUser = asyncHandler (async (req, res) => {
    res.send('Update User')
});


const getUsers = asyncHandler (async (req, res) => {
    res.send('get Users');
});

export {authUser, registerUser, logoutUser, getUserProfile, updateUserProfile, getUserById, deleteUser, updateUser, getUsers}