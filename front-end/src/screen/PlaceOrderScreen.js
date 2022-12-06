import React, { useContext, useEffect } from 'react';
import CheckoutSteps from '../components/CheckoutSteps';
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { Store } from '../Store';
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link, useNavigate } from 'react-router-dom';


const PlaceOrderScreen = () => {
    const navigate = useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store);
    //define the cart ot get ther object shiiping address 
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
    const placeOrderHandler = () => {

    }

    useEffect(() => {
        if (!cart.paymentMethod) {
            navigate('/payment')
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
                                <strong>Name:</strong> {cart.shippingAdress.fullName} <br />
                                <strong>Address:</strong> {cart.shippingAdress.address},
                                {cart.shippingAdress.postalCode}, {cart.shippingAdress.country}
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
                                    <ListGroup.Item key={item.id || item}>
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
