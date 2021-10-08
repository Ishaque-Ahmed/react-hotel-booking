import React, { Component } from "react";
import { Alert } from "reactstrap";
import { Formik } from 'formik';
import { auth } from "../../redux/authActionCreators";
import { connect } from "react-redux";
import Spinner from '../Body/Spinner/Spinner';

const mapDispatchToProps = dispatch => {
    return {
        auth: (email, password, mode) => dispatch(auth(email, password, mode)),
    }
}
const mapStateToProps = state => {
    return {
        authLoading: state.authLoading,
        authFailedMsg: state.authFailedMessage,
    }
}

class Auth extends Component {

    state = {
        mode: "Login",
    }

    switchModeHandler = () => {
        this.setState({ mode: this.state.mode === "Sign Up" ? "Login" : "Sign Up" })
    }
    render() {
        let error = null;
        if (this.props.authFailedMsg !== null) {
            error = <Alert color="danger" style={{ marginTop: "80px" }}>
                {this.props.authFailedMsg}</Alert>
        }
        let form = null;
        if (this.props.authLoading) {
            form = <Spinner />
        } else {
            form = (
                <Formik
                    initialValues={
                        {
                            email: "",
                            password: "",
                            passwordConfirm: "",
                        }
                    }
                    onSubmit={
                        values => {
                            this.props.auth(values.email, values.password, this.state.mode);
                        }
                    }
                    validate={(values) => {
                        const errors = {};

                        if (!values.email) {
                            errors.email = "Required";
                        } else if
                            (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                            errors.email = "Invald Email Address";
                        }

                        if (!values.password) {
                            errors.password = "Required";
                        } else if (values.password.length < 6) {
                            errors.password = "Must be atleast six characters";
                        }
                        if (this.state.mode === "Sign Up") {
                            if (!values.passwordConfirm) {
                                errors.passwordConfirm = "Required";
                            } else if (values.password !== values.passwordConfirm) {
                                errors.passwordConfirm = "password field does not match";
                            }
                        }
                        return errors;
                    }}>
                    {
                        ({ values, handleChange, handleSubmit, errors }) => (
                            <div className="container mt-5 border border-secondary p-3 rounded">
                                {this.state.mode === "Sign Up" ? <div>Already Has An Account?
                                    <button className="btn btn-primary btn-sm py-2 ms-2"
                                        onClick={this.switchModeHandler}>Login
                                    </button>
                                </div> : <div>Switch To
                                    <button className="btn btn-primary btn-sm py-2 ms-2"
                                        onClick={this.switchModeHandler}>Sign Up
                                    </button> </div>} <br />
                                <form onSubmit={handleSubmit}>
                                    <input name="email"
                                        placeholder="Enter Your Email"
                                        className="form-control"
                                        value={values.email}
                                        onChange={handleChange} />
                                    <span className="text-danger">{errors.email}</span><br />
                                    <input name="password" type="password"
                                        placeholder="Enter Password"
                                        className="form-control"
                                        value={values.password}
                                        onChange={handleChange} />
                                    <span className="text-danger">{errors.password}</span><br />
                                    {this.state.mode === "Sign Up" ? (<div>
                                        <input name="passwordConfirm" type="password"
                                            placeholder="Confirm Password"
                                            className="form-control"
                                            value={values.passwordConfirm}
                                            onChange={handleChange} />
                                        <span className="text-danger">{errors.passwordConfirm}</span><br />
                                    </div>) : null}

                                    <button type="submit" className="btn btn-success">
                                        {this.state.mode === "Sign Up" ? "Sign Up" : "Login"}
                                    </button>
                                </form>
                            </div>

                        )
                    }
                </Formik>
            )
        }
        return (
            <div className="container" style={{ marginTop: "80px" }}>
                {error}
                {form}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
