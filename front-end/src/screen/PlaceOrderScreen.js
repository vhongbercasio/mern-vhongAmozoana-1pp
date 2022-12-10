import React, { useContext, useEffect, useReducer } from 'react';
import CheckoutSteps from '../components/CheckoutSteps';
import LoadingBox from '../components/LoadingBox'
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { Store } from '../Store';
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getError } from '../utils'
import Axios from 'axios'


//  as independent in component we define it the logic conmplex state 
const reducer = (state, action) => {
    switch (action.type) {
        case 'CREATE_REQUEST':
            return { ...state, loading: true };

        case 'CREATE_SUCCESS':
            return { ...state, loading: false };

        case 'CREATE_FAIL':
            return { ...state, loading: false };

        default:
            return state
    }
}
const PlaceOrderScreen = () => {
    const navigate = useNavigate();
    //independent this componnent 
    const [{ loading }, dispatch] = useReducer(reducer, {
        loading: false,

    });

    const { state, dispatch: ctxDispatch } = useContext(Store);
    //define the cart ot get ther object shiiping address for all total 
    const { cart, userInfo } = state;

    // logic for order summary or calculated all 
    const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; // to define the number in floating point ex. 123.2345 => 123.23
    cart.itemsPrice = round2(cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0));
    console.log(cart.itemsPrice);
    // define the shipping price 
    cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);

    // define the taxPrice 
    cart.taxPrice = round2(0.15 * cart.itemsPrice);
    // define the totalprice 
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;



    // define the placeOrderHandler
    const placeOrderHandler = async () => {

        try {
            dispatch({ type: 'CREATE_REQUEST' })
            const { data } = await Axios.post('/api/orders/',
                {
                    orderItems: cart.cartItems,
                    shippingAddress: cart.shippingAddress,
                    paymentMethod: cart.paymentMethod,
                    shippingPrice: cart.shippingPrice,
                    itemsPrice: cart.itemsPrice,
                    taxPrice: cart.taxPrice,
                    totalPrice: cart.totalPrice
                },
                {
                    headers: {
                        authorization: `Bearer ${userInfo.token}`
                    }
                },

            );

            ctxDispatch({ type: 'CART_CLEAR' })
            dispatch({ type: 'CREATE_SUCCESS' });
            localStorage.removeItem('cartItems');
            navigate(`/order/${data.order._id}`);


        } catch (error) {
            dispatch({ type: 'CREATE_FAIL' });
            toast.error(getError(error))
            console.log("sdsadsa")
        }

    }

    useEffect(() => {
        if (!cart.paymentMethod) {
            navigate('/payment');

        }
    }, [cart, navigate])
    return (
        <div>
            <CheckoutSteps steps1 steps2 steps3 steps4></CheckoutSteps>
            <Helmet>
                <title>Preview Order </title>
            </Helmet>
            <h1 className="my-3">Preview Order</h1>

            <Row>
                <Col md={8}>
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Shipping</Card.Title>
                            <Card.Text>
                                <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
                                <strong>Address:</strong> {cart.shippingAddress.address}
                                {cart.shippingAddress.postalCode} {cart.shippingAddress.country}
                            </Card.Text>
                            <Link to="/shipping">Edit</Link>
                        </Card.Body>
                    </Card>
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Payment</Card.Title>
                            <Card.Text>
                                <strong>Method:</strong> {cart.paymentMethod}
                            </Card.Text>
                            <Link to="/payment">Edit</Link>
                        </Card.Body>
                    </Card>
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Items</Card.Title>
                            <ListGroup variant="flush">
                                {cart.cartItems.map((item) => (
                                    <ListGroup.Item key={item._id || item}>
                                        <Row className="align-items-center">
                                            <Col md={6}>
                                                <img src={item.image} alt={item.name} className="img-fluid img-thumbnail" >
                                                </img>
                                                {' '}
                                                <Link to={`/product/${item.slug}`}>{item.name}</Link>
                                            </Col>
                                            <Col md={3}><span>{item.quantity}</span></Col>
                                            <Col md={3}><span>{item.price}</span></Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                            <Link to={'/cart'}>Edit</Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Order Summary</Card.Title>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Items</Col>
                                        <Col>${cart.itemsPrice.toFixed(2)}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Shipping</Col>
                                        <Col>${cart.shippingPrice.toFixed(2)}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Tax</Col>
                                        <Col>${cart.taxPrice.toFixed(2)}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col><strong>Order Total</strong></Col>
                                        <Col><strong>${cart.totalPrice.toFixed(2)}</strong></Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <div className="d-grid">
                                        <Button type="button" onClick={placeOrderHandler}
                                            disabled={cart.cartItems === 0}>
                                            Place Order
                                        </Button>
                                    </div>
                                    {loading && <LoadingBox></LoadingBox>}

                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default PlaceOrderScreen
