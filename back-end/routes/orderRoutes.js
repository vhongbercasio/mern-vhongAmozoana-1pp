import express from 'express';
import Order from '../models/ordersModel.js';
import expressAsyncHandler from 'express-async-handler'
//import token for authentication
import { isAuth } from '../utils.js'


const orderRouter = express.Router();

//  craete  api order summmary
orderRouter.post('/', isAuth, expressAsyncHandler(async (req, res) => {
    const newOrder = await new Order({
        orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
    })

    const order = await newOrder.save();
    // send to front end
    res.status(201).send({ message: 'New Order Created', order });
}))




// defiene the mine order API
orderRouter.get('/mine', isAuth, expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
}))



// define the the order Id API with the authentication of user where as allow to buy
orderRouter.get('/:id', isAuth, expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    console.log(order)
    if (order) {
        res.send(order);
    } else {
        res.status(404).send({ message: 'Order not found' })
    }

}))


// define  the the API paymnet order 
orderRouter.put('/:id/pay', isAuth, expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        order.isPaid = true;
        order.paidAt = Date.Now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address,
        };
        const updateOrder = await order.save();
        // send to front end 
        res.send({ message: 'Order is Paid', order: updateOrder });
    } else {
        res.status(404).send({ message: 'Order Not Found' })
    }
}))





export default orderRouter;
