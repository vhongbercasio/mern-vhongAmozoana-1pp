import express from 'express';
import data from './data.js';
// import mongoose to connect the database atlas 
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// import  Product model from Router SECTION MODIFICATION 
import seedRouter from './routes/seedRoutes.js'
import productRouter from './routes/productRoutes.js'
import userRouter from './routes/userRoutes.js'
import orderRouter from './routes/orderRoutes.js'

// MONGODB PLUGIN CONNECTIION
dotenv.config()
mongoose.connect(process.env.MONGODB_URI).then(function () {
    console.log('connected to DB')
}).catch(function (error) {
    console.log(error.message)
})



//  creating exprees app or defining app and return express object and API router 
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ROUTER SECTION of API wiil uses for front end 
app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);





// Define the error express  handler  function
// this is middleware run if have error in routes ex: userRoute this will be execute 
// this execute if the user log in is invalid
app.use((error, req, res, next) => {

    res.status(500).send({ message: error.message })
})

// define the port express,
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server at http://localhost:${port}`);


});

// API request [SECTION] retirv produc as defaul
// app.get('/api/products', (req, res) => {
//     res.send(data.products)

// })


// API request [SECTION] for indivdual product
// app.get('/api/products/slug/:slug', (req, res) => {
//     const product = data.products.find(x => x.slug === req.params.slug);
//     if (product) {
//         res.send(product);
//     } else {
//         res.status(404).send({ message: 'Product not found' });
//     }

// })

// // API request [SECTION ] for individual id
// app.get('/api/products/:id', (req, res) => {
//     const product = data.products.find((x) => x._id === req.params.id);
//     console.log(req.params)
//     if (product) {
//         res.send(product);
//     } else {
//         res.status(404).send({ message: 'Product not found' });
//     }

// })





