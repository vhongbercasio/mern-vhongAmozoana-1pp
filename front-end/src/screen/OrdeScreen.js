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

// customize loadign if the applicataion or is log in 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// PAYPAL
import { usePayPalScriptReducer, PayPalButtons } from "@paypal/react-paypal-js";



//  define the reducer as a action whereas the independent this component
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

        case 'PAY_REQUEST':
            return { ...state, loadingPay: true }
        case 'PAY_FAIL':
            return { ...state, loadingPay: false, successPay: true }
        case 'PAY_RESET':
            return { ...state, loadingPay: false, successPay: false }
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

    const [{ loading, error, order, successPay, loadingPay }, dispatch] = useReducer(reducer, {
        // initialice  the state first 
        loading: true,
        order: {},
        error: '',
        successPay: false,
        loadingPay: false

    })
    // console.log(order)
    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();


    // deifine the props handler wiht creating an order
    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: { value: order.totalPrice }
                }
            ]
        }).then((orderID) => {
            return orderID
        })
    }

    // define it is approve if it is already payment the order

    const onApprove = (data, actions) => {
        return actions.order.capture().then(async (details) => {
            try {
                dispatch({ type: 'PAY_REQUEST' })
                const { data } = await axios.put(`/api/orders/${order._id}/pay`, details,
                    {
                        headers: { authorization: `Bearer ${userInfo.token}` },
                    });
                dispatch({ type: 'PAY_SUCCESS', payload: data })
                toast.success('Order is paid')
            } catch (error) {
                dispatch({ type: 'PAY_FAIL', payload: getError(error) })
                toast.error(getError(error))
            }

        })
    }

    //  define the props
    const onError = (err) => {
        toast.error(getError(err))
    }


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
        // condition if the order it niot exist 
        if (!order._id || successPay || (order._id && order._id !== orderId)) {
            fetchOrder();
            if (successPay) {
                dispatch({ type: 'PAY_RESET' });
            }


        } else {
            const loadPaypalScript = async () => {
                const { data: clientId } = await axios.get('/api/keys/paypal', {
                    headers: { authorization: `Bearer ${userInfo.token}` }
                });
                paypalDispatch({
                    type: 'resetOptions',
                    value: {
                        'client-id': clientId,
                        currency: 'USD'
                    }
                });

                paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
            }
            loadPaypalScript();
        }

    }, [userInfo, navigate, order, orderId, successPay])




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
                                {!order.isPaid && (
                                    <ListGroup.Item>
                                        {isPending ? (
                                            <LoadingBox />
                                        ) :
                                            (
                                                <div>
                                                    <PayPalButtons
                                                        createOrder={createOrder}
                                                        onApprove={onApprove}
                                                        onError={onError}
                                                    >

                                                    </PayPalButtons>
                                                </div>
                                            )
                                        }
                                        {loadingPay && <LoadingBox></LoadingBox>}
                                    </ListGroup.Item>
                                )}

                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

        </div >)

    )
}

export default OrdeScreen
