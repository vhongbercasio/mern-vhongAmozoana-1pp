import express from 'express';
//import the Product model schema
import Product from '../models/productModel.js';
//import the User model schema
import User from '../models/UserModel.js';
import data from '../data.js';



// we generate sample data from static to pass the model and schema 
const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
    // to call the collectio of Product model with empty object parameter or delete the existing schema in mongooe and mongodb
    await Product.deleteMany({})
    //create New Products to get from data.js or the static to insert the Product model
    const createProducts = await Product.insertMany(data.products);
    //send back to the front end to show the data or UI



    // to call the collection  of User  model with empty object parameter or delete the existing schema in mongooe and mongodb
    await User.deleteMany({})
    //create User  to get from data.js or the static to insert the User model
    const createUser = await User.insertMany(data.users);
    //send back to the front end to show the 
    // by inserting the the data or generating the data unto dynamic the from statcic data file we able use tge one res.send() to put or send 
    // data to  UI or front end
    res.send({ createProducts, createUser })



})

export default seedRouter;