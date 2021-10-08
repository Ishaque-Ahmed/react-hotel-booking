import React, { Component } from "react";
import BookingHoom from "./BookingHoom/BookingHoom";
import About from "./About/About";
import BookNow from "./BookNow/BookNow";
import BookedRooms from "./BookedRooms/BookedRooms";
import Auth from '../auth/Auth';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import { authCheck } from "../../redux/authActionCreators";
import Logout from '../auth/Logout';

const mapStateToProps = state => {
    return {
        token: state.token,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authCheck: () => dispatch(authCheck()),
    }
}

class Body extends Component {
    componentDidMount() {
        this.props.authCheck();
    }
    render() {
        let routes = null;
        if (this.props.token === null) {
            routes = (
                <Switch>
                    <Route path="/login" exact component={Auth} />
                    <Redirect to="/login" />
                </Switch>
            )
        } else {
            routes = (
                <Switch>
                    <Route path="/" exact component={BookingHoom} />
                    <Route path="/about" exact component={About} />
                    <Route path="/book-now" exact component={BookNow} />
                    <Route path="/bookings" exact component={BookedRooms} />
                    <Route path="/logout" exact component={Logout} />
                    <Redirect to="/" />
                </Switch>
            )
        }
        return (
            <div>
                {routes}
            </div>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Body);