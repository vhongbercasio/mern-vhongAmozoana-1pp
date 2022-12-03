import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Store } from '../Store';

// import CheckoutSteps component
import CheckoutSteps from '../components/CheckoutSteps'



const ShiipingAdresScreen = () => {
    // define the useNavigate to back the signin nav or link or router 
    const navigation = useNavigate()
    const { state, dispatch: ctxDispatch } = useContext(Store);
    // define the prev state in every state in shipping Adress  list for user
    const {
        userInfo,
        cart: { shippingAdress }
    } = state;

    // define the context along the  reducer state
    // define the the list form of data
    const [fullName, setFullName] = useState(shippingAdress.fullName || '')
    const [address, setAdress] = useState(shippingAdress.address || '')
    const [City, setCity] = useState(shippingAdress.City || '')
    const [country, setCountry] = useState(shippingAdress.country || '')
    const [postalCode, setPostalCode] = useState(shippingAdress.postalCode || '')


    // define to remove then data if ever the user is log out or the user is did not exist  must be remove it to secure tbe data 
    useEffect(() => {
        if (!userInfo) {
            navigation('/signin?redirect=/shipping  ');
        }
    }, [userInfo, navigation])

    const submitHandler = (e) => {
        e.preventDefault()
        ctxDispatch({
            type: 'SAVE_SHIPPING_ADDRESS',
            payload: {
                fullName,
                address,
                City,
                postalCode,
                country

            }
        });
        localStorage.setItem('shippingAdress', JSON.stringify({
            fullName,
            address,
            City,
            postalCode,
            country
        })
        );
    }


    return (
        <div>
            <Helmet>
                <title>Shiping Address</title>
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
                    <Form.Group className="mb-3" controlId="adress">
                        <Form.Label>Adress </Form.Label>
                        <Form.Control value={address}
                            onChange={(e) => setAdress(e.target.value)} >
                        </Form.Control>
                    </Form.Group>

                    {/* full name city*/}
                    <Form.Group className="mb-3" controlId="city" >
                        <Form.Label>City</Form.Label>
                        <Form.Control value={City}
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

export default ShiipingAdresScreen
