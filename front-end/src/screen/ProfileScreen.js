import React, { useContext, useState, useReducer } from 'react'
import { Store } from '../Store';
import { Helmet } from 'react-helmet-async';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { getError } from '../utils'
import axios from 'axios'


// define the reducer function 
const reducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_REQUEST':
            return { ...state, loadingUpdate: true }
        case 'UPDATE_SUCCESS':
            return { ...state, loadingUpdate: false }
        case 'UPDATE_FAIL':
            return { ...state, loadingUpdate: false }
        default:
            return state
    }

}


const ProfileScreen = () => {
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;


    // define this state for the changes and update state of profile
    const [name, setName] = useState(userInfo.name);
    const [email, setEmail] = useState(userInfo.email);

    // define thid state  with initialize of empty string
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    // define useReducer as independent for profilse screen componet only
    const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
        loadingUpdate: false
    })


    const submitHandler = async (e) => {
        e.preventDefault();
        // send request to backend or ajax
        try {
            const { data } = await axios.put('/api/users/profile', {
                
                name,
                email,
                password
            },
                // with the object of authorization since the user is allowed to access
                {
                    headers: { authorization: `Bearer ${userInfo.token}` }
                }
            );
            dispatch({ type: 'UPDATE_SUCCESS' });
            ctxDispatch({ type: 'USER_SIGNIN', payload: data })
            // define the local Storage to update
            localStorage.setItem('userInfo', JSON.stringify(data))
            toast.success('User update successfully');
        } catch (err) {
            dispatch({ type: 'UPDATE_FAIL' });
            toast.error(getError(err));
        }


    }
    return (


        <div className="container small-container">
            <Helmet>
                <title>User Profile</title>
            </Helmet>
            <h1 className="my-3">User Profile</h1>
            <form onSubmit={submitHandler}>
                <Form.Group className='mb-3' controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group className='mb-3' controlId='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        type="email"
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group className='mb-3' controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    >
                    </Form.Control>

                </Form.Group>
                <Form.Group className='mb-3' controlId='password'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    >
                    </Form.Control>
                </Form.Group>

                <div className="mb-3">
                    <Button type="submit">Update</Button>

                </div>


            </form>


        </div>
    )
}

export default ProfileScreen