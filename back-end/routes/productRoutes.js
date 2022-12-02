import express from 'express';
import Product from '../models/productModel.js';

// as for now we going to conver the API endpoint  from the server.js as 
// so that  we transfer here to modify the enpoint for API an also the accesss of the data 
// /api/products/:id --> we do not wrote this URL endpoitn API since we already pass to server with  
// app expressa and use method where as automatically added in server.js file 

// further study about the some function and method of monogoes that we ale to use if we going to acces somw specifi data from mongoose data model schema
// common use are
//  find()
// findOne()
// findById()

const productRouter = express.Router();


productRouter.get('/', async (req, res) => {
    const products = await Product.find()
    res.send(products);

})



// API request [SECTION] for indivdual product with use params method route
productRouter.get('/slug/:slug', async (req, res) => {
    const product = await Product.findOne({ slug: req.params.slug });
    console.log(req);
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: 'Product not found' });
    }

})


// API request [SECTION ] for individual id 
productRouter.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    console.log(req.params)
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: 'Product not found' });
    }

})







export default productRouter;