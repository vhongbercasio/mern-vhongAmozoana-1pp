
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useContext } from "react";
import { Store } from './Store'
import HomeScreen from './screen/HomeScreen '
import ProductScreen from './screen/ProductScreen'
import CartScreen from './screen/CartScreen'
import SigninScreen from './screen/SigninScreen'
import ShippingAddressScreen from './screen/ShippingAddressScreen'
import SignUpSreen from './screen/SignUpSreen';
import PayMethodScreen from './screen/PayMethodScreen';
import PlaceOrderScreen from "./screen/PlaceOrderScreen";
import OrdeScreen from './screen/OrdeScreen'
import OrderHistoryScreen from './screen/OrderHistoryScreen'
import ProfileScreen from './screen/ProfileScreen'

// import the some react-bootstrap
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown'

// import toastify as the design the error ir invalid of user
import { ToastContainer } from 'react-toastify';
// import  react -bootrap-router  
import { LinkContainer } from 'react-router-bootstrap';


function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;


  const signoutHandler = () => {
    // reset all data from cartitem and userinfo
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    // if the user is update there informairion and keep signout
    window.location.href = '/signin'

  }

  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        < ToastContainer position="bottom-center" limit={1} />
        <header>
          <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>amazona</Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto w-100 justify-content-end">
                  <Link to="/cart" className="nav-link">
                    Cart
                    {cart.cartItems.length > 0 && (
                      <Badge pill bg="danger">
                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                      </Badge>
                    )}
                  </Link>
                  {userInfo ? (
                    <NavDropdown title={userInfo.name} id="basic-nav-dropdown" >
                      <LinkContainer to="/profile">
                        <NavDropdown.Item> User Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/orderhistory">
                        <NavDropdown.Item> Order History</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <Link className="dropdown-item" to="#signout" onClick={signoutHandler}>
                        sign Out
                      </Link>
                    </NavDropdown>
                  ) : (
                    <Link className="nav-link" to="/signin" >Sign in</Link>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>


        <main>
          <Container className="mt-3">
            <Routes>
              {/* anchor tag in params slug components ProductScreen and route  with the params of slugId */}
              <Route path="/product/:slug" element={<ProductScreen />} />

              {/* list of products homeScreen components and route  */}
              <Route path="/cart" element={<CartScreen />} />

              {/* Sign in components and routes  */}
              <Route path="/signin" element={<SigninScreen />} />

              {/* Sign up components and routes  */}
              <Route path="/sign-up" element={<SignUpSreen />} />

              {/* Profile components and routes  */}
              <Route path="/profile" element={<ProfileScreen />} />

              {/* ShippingaddressScreen components and route*/}
              <Route path="/shipping" element={< ShippingAddressScreen />} />

              {/* ShippingaddressScreen components and route*/}
              <Route path="/payment" element={<PayMethodScreen />} />

              {/* PlaceOrderScreen components and route*/}
              <Route path="/placeorder-screen" element={<PlaceOrderScreen />} />

              {/* OrderScreen components and route with the params of orderID */}
              <Route path="/order/:id" element={<OrdeScreen />} />

              {/*OrderHistoryScreen components and route with comes of order*/}
              <Route path="/orderhistory" element={<OrderHistoryScreen />} />


              <Route path="/" element={<HomeScreen />} />
            </Routes>
          </Container>
        </main>



        <footer>
          <div className='text-center'>All rights reserved.</div>
        </footer>
      </div>
    </BrowserRouter >
  );
}

export default App;
