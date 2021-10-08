import React, { Component } from "react";
import { baseUrl } from "../../../redux/BaseUrl";
import { Formik } from "formik";
import axios from "axios";
import Spinner from '../Spinner/Spinner';
import { Modal, ModalBody } from "reactstrap";
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        userId: state.userId,
        token: state.token,
    }
}

class BookNow extends Component {

    state = {
        isLoading: false,
        isModalOpen: false,
        modalMessage: "",
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    goBack = () => {
        this.props.history.goBack("/");
    }

    submitHandler = values => {
        this.setState({ isLoading: true });
        const room = this.props.history.location.state.detail;
        const data = {
            roomId: room.room.roomId,
            title: room.room.title,
            price: room.room.price,
            customer: values,
            userId: this.props.userId,
        }
        axios.post("https://react-hotel-booking-4716c-default-rtdb.firebaseio.com/bookings.json?auth="
            + this.props.token, data)
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        isLoading: false,
                        isModalOpen: true,
                        modalMessage: "Room Booked Succesfully!",
                    });
                } else {
                    this.setState({
                        isLoading: false,
                        isModalOpen: true,
                        modalMessage: "Something Went Wrong, Try Again!",
                    });
                }
            })
            .catch(error => {
                this.setState({
                    isLoading: false,
                    isModalOpen: true,
                    modalMessage: "Something Went Wrong, Try Again!",
                });
            });
    }

    render() {
        document.title = "Book Now";
        const room = this.props.history.location.state.detail;
        let form = (
            <div className="my-4">
                <h3 className="text-muted my-4">Place Your Booking: </h3>
                <Formik
                    initialValues={
                        {
                            phone: "",
                            name: "",
                        }
                    }
                    onSubmit={
                        (values, { resetForm }) => {
                            this.submitHandler(values);
                            resetForm(values = '');
                        }
                    }
                    validate={(values) => {
                        const errors = {};

                        if (!values.phone) {
                            errors.phone = "Required";
                        } else if
                            (!/^((\+88)|(88))?01[0-9]{9}$/.test(values.phone)) {
                            errors.phone = "Invald phone Address";
                        }

                        if (!values.name) {
                            errors.name = "Required";
                        }
                        return errors;
                    }}
                >
                    {
                        ({ values, handleChange, handleSubmit, errors }) => (
                            <div className="container border border-secondary p-2 rounded">
                                <form onSubmit={handleSubmit}>
                                    <input
                                        name="phone" placeholder="Enter Your Phone Number"
                                        className="form-control mb-2"
                                        value={values.phone}
                                        onChange={handleChange}
                                    />
                                    <span className="text-danger">{errors.phone}</span>
                                    <br />
                                    <input
                                        name="name" placeholder="Enter Your Name"
                                        className="form-control mb-2"
                                        value={values.name}
                                        onChange={handleChange}
                                    />
                                    <span className="text-danger">{errors.name}</span>
                                    <br />

                                    <button type="submit"
                                        className="btn btn-success mb-2">Confirm Booking
                                    </button>
                                </form>
                            </div>
                        )
                    }
                </Formik>
            </div>
        )
        return (
            <div className="container">
                <div className="row">
                    <div className="col-6 p-2">
                        <img src={baseUrl + room.room.image} alt="Room" className="img-fluid" />
                    </div>
                    <div className="col-md-6 p-2">
                        <div className="text-center">
                            <h1 className="text-muted p-3">{room.room.title}</h1>
                            <h3 className="text-danger p-3">Rooms Left: {room.room.available}</h3>
                            <h3 className="text-success p-3">Price: {room.room.price}BDT</h3>
                        </div>
                    </div>
                </div>
                <div>
                    {
                        (this.state.isLoading) ? <Spinner /> : form
                    }
                    <Modal isOpen={this.state.isModalOpen}
                        onClick={this.goBack}>
                        <ModalBody><p>{this.state.modalMessage}</p></ModalBody>
                    </Modal>
                </div >
            </div>
        )
    }

}
export default connect(mapStateToProps)(BookNow);