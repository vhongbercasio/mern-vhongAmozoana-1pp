import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Store } from '../Store';

// import CheckoutSteps component
import CheckoutSteps from '../components/CheckoutSteps'



const ShippingAddressScreen = () => {
    // define the useNavigate to back the signin nav or link or router 
    const navigate = useNavigate()
    const { state, dispatch: ctxDispatch } = useContext(Store);
    // define the prev state in every state in shipping Adress  list for user
    const {
        userInfo,
        cart: { shippingAddress }
    } = state;

    // define the context along the  reducer state
    // define the the list form of data
    const [fullName, setFullName] = useState(shippingAddress.fullName || '')
    const [address, setAdress] = useState(shippingAddress.address || '')
    const [city, setCity] = useState(shippingAddress.city || '')
    const [country, setCountry] = useState(shippingAddress.country || '')
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '')


    // define to remove then data if ever the user is log out or the user is did not exist  must be remove it to secure tbe data 
    useEffect(() => {
        if (!userInfo) {
            navigate('/signin?redirect=/shipping  ');
        }
    }, [userInfo, navigate])

    const submitHandler = (e) => {
        e.preventDefault()
        ctxDispatch({
            type: 'SAVE_SHIPPING_ADDRESS',
            payload: {
                fullName,
                address,
                city,
                postalCode,
                country

            }
        });
        localStorage.setItem('shippingAddress', JSON.stringify({
            fullName,
            address,
            city,
            postalCode,
            country
        })
        );
        navigate('/payment')

    }


    return (
        <div>
            <Helmet>
                <title>Shipping Address</title>
            </Helmet>
            <CheckoutSteps steps1 steps2></CheckoutSteps>
            <div className="container small-container">
                <h1 className="my-3">
                    Shipping Address
                </h1>

                <Form onSubmit={submitHandler}>
                    {/* full name section */}
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control value={fullName}
                            onChange={(e) => setFullName(e.target.value)} >
                        </Form.Control>
                    </Form.Group>

                    {/* full name Adress */}
                    <Form.Group className="mb-3" controlId="address">
                        <Form.Label>Address </Form.Label>
                        <Form.Control value={address}
                            onChange={(e) => setAdress(e.target.value)} >
                        </Form.Control>
                    </Form.Group>

                    {/* full name city*/}
                    <Form.Group className="mb-3" controlId="city" >
                        <Form.Label>City</Form.Label>
                        <Form.Control value={city}
                            onChange={(e) => setCity(e.target.value)} >
                        </Form.Control>
                    </Form.Group>

                    {/* full name  postalCode*/}
                    <Form.Group className="mb-3" controlId="postal-code" >
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)} >
                        </Form.Control>
                    </Form.Group>

                    {/* full name cuontry*/}
                    <Form.Group className="mb-3" controlId="country" >
                        <Form.Label>Country</Form.Label>
                        <Form.Control value={country}
                            onChange={(e) => setCountry(e.target.value)} >
                        </Form.Control>
                    </Form.Group>
                    <div className="mb-3">
                        <Button variant="primary" type="submit">
                            Continue
                        </Button>

                    </div>

                </Form >
            </div>
        </div >
    )
}

export default ShippingAddressScreen
