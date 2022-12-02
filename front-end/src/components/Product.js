import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Rating from './Rating'
import axios from 'axios'
import { Store } from "../Store"

const Product = (props) => {
    const { product } = props;
    console.log(product)
    const { state, dispatch: ctxDispatch } = useContext(Store);

    const {
        cart: { cartItems },
    } = state;
    console.log(cartItems)
    const addToCartHandler = async (item) => {
        const existItem = cartItems.find((x) => x._id === product._id)
        console.log(existItem)
        const quantity = existItem ? existItem.quantity + 1 : 1;
        console.log(quantity)
        const { data } = await axios.get(`/api/products/${item._id}`);
        if (data.countInStock < quantity) {
            window.alert("Sorry. product is out of stock")
            return;
        }

        // didpacth  the cartitem with the object the quantity to product object 
        ctxDispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } })


    }
    return (
        <Card>
            <Link to={`/product/${product.slug}`}>
                <img src={product.image} alt={product.name} className="card-img-top" />
            </Link>
            <Card.Body>
                <Link to={`/product/${product.slug}`}>
                    <Card.Title> {product.name}</Card.Title>
                </Link>
                <Rating rating={product.rating} numRiviews={product.numReviews} />
                <Card.Text><p><strong>{product.price}</strong></p></Card.Text>
                {product.countInStock === 0 ? (<Button variant="light" disabled>out of stock</Button>) : (
                    <Button onClick={() => addToCartHandler(product)}>Add to cart</Button>)}
            </Card.Body>

        </Card>
    )
}

export default Product
