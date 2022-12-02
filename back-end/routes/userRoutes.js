import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/UserModel.js';
import expressAsyncHandler from 'express-async-handler'
//import token for authentication
import { generateToken } from '../utils.js'


const userRouter = express.Router();


userRouter.post('/sign-in', expressAsyncHandler(async (req, res,) => {
    const user = await User.findOne({ email: req.body.email })
    if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
            // this compareSyn funcyion is returnin bollean 
            // in short matching the req.body.password and client data user from back end encrypted
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                tokee: generateToken(user)
            });
            return
        }
    } else {
        res.status(401).send({ message: 'lnvalisssd email or password' })
    }
}))


export default userRouter;