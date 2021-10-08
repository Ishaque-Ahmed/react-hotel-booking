import React, { Component } from "react";
import { Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

const mapStateToProps = state => {
    return {
        token: state.token
    }
}

class Header extends Component {
    render() {
        let links = null;
        if (this.props.token === null) {
            links = (
                <Nav className="ms-auto">
                    <NavItem>
                        <Link to="/login" className="nav-link
                        border border-primary
                        text-success">Login</Link>
                    </NavItem>
                </Nav>
            )
        } else {
            links = <Nav className="ms-auto">
                <NavItem>
                    <Link to="/about" className="nav-link text-dark">About Us</Link>
                </NavItem>
                <NavItem>
                    <Link to="/bookings" className="nav-link text-dark">Your Bookings</Link>
                </NavItem>
                <NavItem>
                    <Link to="/logout" className="nav-link border border-primary
                    text-danger">Logout</Link>
                </NavItem>
            </Nav>
        }
        return (
            <div className="mb-5">
                <Navbar light color="light"
                    style={{
                        position: "fixed",
                        width: "100%",
                        top: 0,
                        zIndex: 100,
                    }}>
                    <div className="container">
                        <NavbarBrand href="/">React Hotel Booking</NavbarBrand>
                        {links}
                    </div>
                </Navbar>
            </div>
        )
    }
}
export default connect(mapStateToProps)(Header);