import React from "react";

const SingleBooking = props => {
    //console.log(props);
    return (
        <div className="container">
            <div className="border border-secondary rounded p-3 mb-4 shadow ">
                <p>Customer Name: {props.booking.customer.name}</p><hr />
                <p>Customer Phone: {props.booking.customer.phone}</p><hr />
                <p>Room Type: {props.booking.title}</p><hr />
                <p>Cost: {props.booking.price} BDT per night</p>
            </div>
        </div>
    )
}
export default SingleBooking;