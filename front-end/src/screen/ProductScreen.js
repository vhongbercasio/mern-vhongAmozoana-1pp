import React, { useEffect, useReducer, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
// import logger from 'use-reducer-logger';
import axios from 'axios';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/esm/ListGroup';
import Rating from '../components/Rating';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import MessageBox from '../components/MessageBox'
import LoadingBox from '../components/LoadingBox'
import { Helmet } from 'react-helmet-async';
import { getError } from '../utils'
import { Store } from '../Store'


// define the reducer to rely on the complex state logic 
const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loadings: true }
        case 'FETCH_SUCCESS':
            return { ...state, product: action.payload, loading: false };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}


const ProductScreen = () => {
    const navigate = useNavigate()
    //define the useParams into varible
    const params = useParams();
    // defracture the slug in object 
    const { slug } = params;
    // render the reducer state logic
    // initialize the state value
    const [{ loading, error, product }, dispatch] = useReducer(reducer, {
        product: [],
        loading: true,
        error: '',
    })
    // const [products, setProducts] = useState([]);
    // console.log(products);

    useEffect(() => {
        return () => {
            const fetchdata = async () => {
                dispatch({ type: 'FETCH_REQUEST' });

                try {
                    const result = await axios.get(`/api/products/slug/${slug}`);
                    dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
                } catch (error) {
                    dispatch({ type: 'FETCH_FAIL', payload: getError(error) });
                }

                // setProducts(result.data);
            }
            return fetchdata();
        };
    }, [slug])



    const { state, dispatch: ctxDispatch } = useContext(Store);
    // empty array of cart item
    console.log(state)
    const { cart } = state
    const addtoCartHandler = async () => {
        const exisItem = cart.cartItems.find((x) => x._id === product._id)
        console.log(exisItem)
        const quantity = exisItem ? exisItem.quantity + 1 : 1;
        console.log(quantity)
        const { data } = await axios.get(`/api/products/${product._id}`);
        console.log(data)
        if (data.countInStock < quantity) {
            window.alert("Sorry. product is out of stock")
            return;
        }

        // dispatch the cartitem with the object the quantity to product object 
        ctxDispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } })

        // change the cunrent locaation 
        navigate('/cart')
    }

    return (
        loading ? <LoadingBox /> : error ? (<MessageBox variant="danger">{error}</MessageBox>)
            : (
                <div>
                    <Row>


                        <Col md={6}>
                            <img className="img-large"
                                src={product.image}
                                alt={product.name}

                            />
                        </Col>


                        <Col md={3}>
                            <ListGroup variant="flush" >
                                <ListGroup.Item>
                                    <Helmet>
                                        <title>{product.name}</title>
                                    </Helmet>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating rating={product.rating}
                                        numRiviews={product.numRiview}>
                                    </Rating>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Price:${product.price}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>


                        <Col md={3}>
                            <Card>
                                <Card.Body>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Price:</Col>
                                                <Col>${product.price}</Col>
                                            </Row>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Status:</Col>
                                                <Col>{product.price > 0 ? <Badge bg="success">
                                                    In Stock
                                                </Badge> : <Badge bg="danger">
                                                    Unavailable
                                                </Badge>}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>

                                        {product.countInStock > 0 && (
                                            <ListGroup.Item>
                                                <div className="d-grid">
                                                    <Button onClick={addtoCartHandler} variant="primary" >
                                                        Add to cart
                                                    </Button>
                                                </div>

                                            </ListGroup.Item>
                                        )}

                                    </ListGroup>
                                </Card.Body>
                            </Card>
                        </Col>

                    </Row >

                </div >
            )


    )
}

export default ProductScreen