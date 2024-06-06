import { Badge, Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from "react-redux";
import logo from '../assets/logo.png';

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const logoutHandler = () => {
    console.log('logout');
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="sm" collapseOnSelect>
        <Container>
          {/* replaced href attribute in navbar tags with <LinkContainer to></LinkContainer> so that the website does not loading a new page */}
          <LinkContainer to="/">
          <Navbar.Brand href="/">
            <img src={logo} alt="ProShop" />
            ProShop
          </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/cart">
              <Nav.Link>
                <FaShoppingCart /> Cart
                {
                  cartItems.length > 0 && (
                    <Badge pill bg="success" style={{marginLeft: "5px"}}>
                      { cartItems.reduce((a, c) => a + c.qty, 0) }
                    </Badge>
                  )
                }
              </Nav.Link>
              </LinkContainer>
              { userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link href='/login'>
                    <FaUser /> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header