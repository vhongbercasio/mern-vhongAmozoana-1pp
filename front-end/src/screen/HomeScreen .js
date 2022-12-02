import React, { useEffect, useReducer } from 'react'
import logger from 'use-reducer-logger';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../components/Product';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox'




// define the reducer to rely on the complex state logic 
const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loadings: true }
        case 'FETCH_SUCCESS':
            return { ...state, products: action.payload, loading: false };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}


const HomeScreen = () => {
    // render the reducer state logic
    // initialize the state value
    const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
        products: [],
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
                    const result = await axios.get('/api/products');
                    dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
                } catch (error) {
                    dispatch({ type: 'FETCH_FAIL', payload: error });
                }

                // setProducts(result.data);
            }
            return fetchdata();
        };
    }, [])
    return (
        <div>
            <Helmet>
                <title>Amazona</title>
            </Helmet>
            <h1> Fetured Products</h1>
            {/* LOOP PRODUCTS SECTION */}
            <div className="products">
                {loading ? <LoadingBox /> : error ? (<MessageBox variant="danger">{error}</MessageBox>)
                    :
                    (
                        <Row>
                            {products.map((product) => (
                                <Col sm={6} md={4} lg={3} className="mb-3" key={product.slug || product.name} >
                                    <Product product={product} />
                                </Col>
                            ))}
                        </Row>
                    )}

            </div>

        </div>
    )
}

export default HomeScreen 
