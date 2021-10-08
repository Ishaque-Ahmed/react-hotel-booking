import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchBookings } from '../../../redux/actionCreators';
import SingleBooking from "./SingleBooking";
import Spinner from '../Spinner/Spinner';
const mapStateToProps = state => {
    return {
        bookings: state.bookings,
        bookingsLoading: state.bookingsLoading,
        bookingsErr: state.bookingsErr,
        token: state.token,
        userId: state.userId,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchBookings: (token, userId) => dispatch(fetchBookings(token, userId)),
    }
}

class BookedRooms extends Component {
    componentDidMount() {
        this.props.fetchBookings(this.props.token, this.props.userId);
    }

    render() {
        document.title = "Your Bookings"
        let bookings = null;
        if (this.props.bookingsErr) {
            bookings = (
                <div className="border border-secondary rounded p-3 mb-4 shadow ">
                    <p>Sorry Failed to load your bookings.</p>
                </div>
            )
        } else {
            if (this.props.bookings.length === 0) {
                bookings = (
                    <div className="border border-secondary rounded p-3 mb-4 shadow ">
                        <p>You have no bookings.</p>
                    </div>
                )
            } else {
                bookings = this.props.bookings.map(booking => {
                    return (
                        <SingleBooking booking={booking} key={booking.id} />
                    )
                })
            }

        }

        return (
            <div className="container">
                {this.props.bookingsLoading ? <Spinner /> : bookings}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookedRooms);