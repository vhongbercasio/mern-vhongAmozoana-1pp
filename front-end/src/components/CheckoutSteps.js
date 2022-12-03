import React from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const CheckoutSteps = (props) => {
    return (

        <Row className="checkout-steps" >
            <Col className={props.steps1 ? "active" : ''}>Sigi-In</Col>
            <Col className={props.steps2 ? "active" : ''}>Shiiping</Col>
            <Col className={props.steps3 ? "active" : ''}>Paymnent</Col>
            <Col className={props.steps4 ? "active" : ''}>Place-Order</Col>
        </Row>

    )
}

export default CheckoutSteps
