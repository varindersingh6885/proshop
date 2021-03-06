import React, { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button} from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from '../components/CheckoutSteps';

//action
import {saveShippingAddress} from '../actions/cartActions';

const ShippingScreen = ({history}) => {

    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} = userLogin;

    const dispatch = useDispatch();
    
    const cart = useSelector(state => state.cart);
    const {shippingAddress} = cart;
    
    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode); 
    const [country, setCountry] = useState(shippingAddress.country);


    useEffect(()=> {
        if(!userInfo){
            history.push('/login');
        }
    })
    
    const submitHandler = (e) => {
        e.preventDefault();
        const data = {
            address,
            city,
            postalCode,
            country
        }
        dispatch(saveShippingAddress(data));
        history.push('/payment');
    }




    return userInfo && (
        <FormContainer>
            <CheckoutSteps step1 step2/>
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter address"
                        value={address}
                        required
                        onChange={(e) => setAddress(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter city"
                        value={city}
                        required
                        onChange={(e) => setCity(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId="postalCode">
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter postal code"
                        value={postalCode}
                        required
                        onChange={(e) => setPostalCode(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId="country">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Country"
                        value={country}
                        required
                        onChange={(e) => setCountry(e.target.value)}
                    ></Form.Control>
                </Form.Group>      

                <Button type='submit' variant='primary'>
                    Continue
                </Button>       
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen;