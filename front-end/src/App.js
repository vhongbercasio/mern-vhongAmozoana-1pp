
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useContext } from "react";
import { Store } from './Store'
import HomeScreen from './screen/HomeScreen '
import ProductScreen from './screen/ProductScreen'
import CartScreen from './screen/CartScreen'
import SigninScreen from './screen/SigninScreen'

// impoert the some react-bootstrap
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';


// import  reeact-bootrap-router  
import { LinkContainer } from 'react-router-bootstrap';


function App() {
  const { state } = useContext(Store);
  const { cart } = state;



  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <header>
          <Navbar bg="dark" variant="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>amazona</Navbar.Brand>
              </LinkContainer>
              <Nav className="me-auto">
                <Link to="/cart" className="nav-link">
                  Cart
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Link>

              </Nav>
            </Container>
          </Navbar>
        </header>

        <main>
          <Container className="mt-3">
            <Routes>
              {/* anchor tag in params components ProductScreen */}
              <Route path="/product/:slug" element={<ProductScreen />} />
              {/* Route for cartScreen */}
              <Route path="/cart" element={<CartScreen />} />
              {/* list of products homeScreen components */}
              {/* Sign in components */}
              <Route path="/signin" element={<SigninScreen />} />
              <Route path="/" element={<HomeScreen />} />
            </Routes>
          </Container>
        </main>

        <footer>
          <div className='text-center'>All rights reserved.</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;