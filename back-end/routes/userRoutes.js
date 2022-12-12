import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/UserModel.js';
import expressAsyncHandler from 'express-async-handler'
//import token for authentication
import { isAuth, generateToken } from '../utils.js'


const userRouter = express.Router();

// Define the user sign-in api wiht use of expressAsyncHandler as the passing them to you express error handler
userRouter.post('/sign-in', expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
            // this compareSyn funcyion is return in bollean 
            // in short matching the req.body.password to the client data user from back end encrypted
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user)
            });
            return
        }
    } else {
        res.status(401).send({ message: 'lnvalid email or password' })
    }
}))


// Define the sign-up api as the create a user new info 
userRouter.post('/sign-up', expressAsyncHandler(async (req, res) => {
    // instanstiate new data model 
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password)
    });
    // after  to instantiate yuu must be save it
    const user = await newUser.save();
    // and respone it by server to UI
    res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user)
    });
    return
}));

// define to update the information of user 
userRouter.put('/profile', isAuth, expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = bcrypt.hashSync(req.body.password, 8)
        }
        const updatedUser = await user.save();

        // send response in front UI
        res.send({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser)

        })
    } else {
        res.status(404).send({ message: 'User not found' })
    }
}))

export default userRouter;