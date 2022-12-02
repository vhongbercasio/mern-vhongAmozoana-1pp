import React, { useState, useContext } from 'react'
import { Store } from '../Store'
import { Helmet } from 'react-helmet-async'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import { useLocation, Link } from 'react-router-dom'
import axios from 'axios'


const SigninScreen = () => {

    const { search } = useLocation();
    //  instanstaite the shipping url in cartScreen 
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';

    //define the email and password
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { state, dispatch: ctxDispatch } = useContext(Store);

    const submitHandler = async (e) => {
        e.preventDefault()

        try {
            const { data } = await axios.post(`/api/users/signin`, {
                email,
                password
            })

            ctxDispatch({ type: 'USER_SIGNIN', data: data })
        } catch (error) {

        }
    }

    return (
        <Container className="small-container">
            <Helmet>
                <title>Sgin in </title>
            </Helmet>
            <h1 className="my-3">Sign In</h1>
            <Form onSubmit={submitHandler}>

                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" required onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" required onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>

                <div>
                    <Button type="submit">Sign in</Button>
                </div>
                <div className="mb-3">
                    New customer? {' '}
                    <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
                </div>
            </Form>
        </Container>
    )
}

export default SigninScreen