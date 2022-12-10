import React, { useContext, useEffect, useState } from 'react'
import { Store } from '../Store'
import { useNavigate } from "react-router-dom"
import CheckoutSteps from '../components/CheckoutSteps';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/esm/Button';

const PayMethodScreen = () => {
    const navigate = useNavigate()
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const {
        cart: { shippingAddress, paymentMethod }
    } = state;

    const [paymentMethodName, setPaymentMethod] = useState(paymentMethod || "PayPal")

    useEffect(() => {
        if (!shippingAddress.address) {
            navigate('/shipping');
        }
    }, [shippingAddress, navigate])


    // to define to submit the paytment 
    const submitHandler = (e) => {
        e.preventDefault();
        ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName })
        localStorage.setItem('paymentMethod', paymentMethodName)
        navigate('/placeorder-screen')

    }



    return (
        <div>
            <CheckoutSteps steps1 steps2 steps3></CheckoutSteps>
            <div className="container small-container">
                <Helmet>
                    <title>Payment Method</title>
                </Helmet>
                <div className="my-3">Payment
                    <h1 className="my-3">Payment Method</h1>
                    <Form onSubmit={submitHandler}>
                        <div classnames="mb-3">
                            <Form.Check
                                type="radio"
                                id="PayPal"
                                label="PayPal"
                                value="PayPal"
                                checked={paymentMethodName === 'PayPal'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            >

                            </Form.Check>
                        </div>
                        <div classnames="mb-3">
                            <Form.Check
                                type="radio"
                                id="Stripe"
                                label="Stripe"
                                value="Stripe"
                                checked={paymentMethodName === 'Stripe'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            >

                            </Form.Check>
                        </div>
                        <div call="mb-3">
                            <Button type="submit">Continue</Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default PayMethodScreen
