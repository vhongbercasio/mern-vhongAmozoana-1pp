import React, { useReducer, useEffect, useContext } from 'react';
import { Store } from '../Store'
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { getError } from '../utils';
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';



//  define the reducer as a action wheread the independent this component
const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return {
                ...state, loading: true, error: ''
            }
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, order: action.payload, error: '' }

        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }
        default:
            return state
    }
}


const OrdeScreen = () => {
    //define the state in global state
    const { state } = useContext(Store);
    const { userInfo } = state;

    //define the navigation
    const navigate = useNavigate()
    // deifen the param since we are using the id of order id and renanme it ordeId
    const params = useParams()
    const { id: orderId } = params;
    // console.log(orderId)

    const [{ loading, error, order }, dispatch] = useReducer(reducer, {
        // initialice  the state first 
        loading: true,
        order: {},
        error: '',

    })


    console.log(order)



    //  define the user if not exist they are navigate in direct in log in in page
    useEffect(() => {
        const fetchOrder = async () => {

            try {
                dispatch({ type: 'FETCH_REQUEST' })
                // define and get the api data in backend
                const { data } = await axios.get(`/api/orders/${orderId}`, {
                    headers: { authorization: `Bearer ${userInfo.token}` }
                });
                // define to sucess the request
                dispatch({ type: 'FETCH_SUCCESS', payload: data });

            } catch (error) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(error) })
            }
        }
        // if the user is did not exist will navigata intp
        if (!userInfo) {
            return navigate('/login')
        }
        if (!order._id || (order._id && order._id !== orderId)) {
            fetchOrder();

        }

    }, [userInfo, navigate, order, orderId])


    return (

        loading ? (<LoadingBox></LoadingBox>) : error ? (<MessageBox></MessageBox>) : (<div>
            <Helmet>
                <title>Order {orderId}</title>
            </Helmet>
            <h1 className="my-3">
                Order {orderId}
            </h1>
            <Row>
                <Col md={8}>
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Shipping</Card.Title>
                            <Card.Text>
                                <strong>Name:</strong>{order.shippingAddress.fullName} <br />
                                <strong>Address:</strong>{order.shippingAddress.address},
                                {order.shippingAddress.city},{order.shippingAddress.postalCode}, {order.shippingAddress.country}
                            </Card.Text>
                            {order.isDelivered ? (
                                <MessageBox variant="success">
                                    Delivered at {order.deliveredAt}
                                </MessageBox>
                            ) : (
                                <MessageBox variant="danger">Not Delivered</MessageBox>
                            )
                            }
                        </Card.Body>
                    </Card>
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Payment</Card.Title>
                            <Card.Text>
                                <strong>Method:</strong> {order.paymentMethod}
                            </Card.Text>
                            {order.isPaid ? (
                                <MessageBox variant="success">
                                    Paid at {order.paidAt}
                                </MessageBox>
                            ) : (
                                <MessageBox variant="danger">Not Paid</MessageBox>
                            )}
                        </Card.Body>
                    </Card>
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Body>
                                <Card.Title>
                                    <ListGroup variant="flush">
                                        {order.orderItems.map((item) => (
                                            <ListGroup.Item key={item._id}>
                                                <Row className="align-items-center">
                                                    <Col md={6}>
                                                        <img src={item.image} alt={item.name} className="img-fluid rounded img-thumbnail" >
                                                        </img> {''}
                                                        <Link to={`/product/${item.slug}`}>{item.name}</Link>
                                                    </Col>
                                                    <Col md={3}>
                                                        <span>{item.quantity}</span>
                                                    </Col>
                                                    <Col md={3}>
                                                        <span>{item.price}</span>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </Card.Title>
                            </Card.Body>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Order Summary</Card.Title>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Items</Col>
                                        <Col>${order.itemsPrice.toFixed(2)}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Shipping</Col>
                                        <Col>${order.shippingPrice.toFixed(2)}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Tax</Col>
                                        <Col>${order.taxPrice.toFixed(2)}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col><strong>Order Total</strong></Col>
                                        <Col>${order.totalPrice.toFixed(2)}</Col>
                                    </Row>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

        </div >)

    )
}

export default OrdeScreen
