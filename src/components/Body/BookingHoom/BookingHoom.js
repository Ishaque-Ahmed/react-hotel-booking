import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchFeatured, fetchDeluxe, fetchSingle, fetchDouble, fetchFamily }
    from '../../../redux/actionCreators';
import Category from "../Category/Category";
import Select from 'react-select';
import Spinner from '../Spinner/Spinner';
import { Alert } from "reactstrap";


const mapStateToProps = state => {
    return {
        featured: state.featured,
        deluxe: state.deluxe,
        single: state.single,
        family: state.family,
        double: state.double,
        isLoading: state.isLoading,
        errMsg: state.errMsg,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchFeatured: () => dispatch(fetchFeatured()),
        fetchDeluxe: () => dispatch(fetchDeluxe()),
        fetchSingle: () => dispatch(fetchSingle()),
        fetchDouble: () => dispatch(fetchDouble()),
        fetchFamily: () => dispatch(fetchFamily()),
    }
}

class BookingHoom extends Component {

    state = {
        current: "Featured Rooms",
    }

    componentDidMount() {
        this.props.fetchFeatured();
    }
    handleChange = value => {
        this.setState({ current: value.value })
        if (value.value === 'Featured Rooms') {
            this.props.fetchFeatured();
        } else if (value.value === 'Deluxe Rooms') {
            this.props.fetchDeluxe();
        } else if (value.value === 'Single Rooms') {
            this.props.fetchSingle();
        } else if (value.value === 'Double Rooms') {
            this.props.fetchDouble();
        } else if (value.value === 'Family Rooms') {
            this.props.fetchFamily();
        }
    }

    render() {
        const options = [
            { value: 'Featured Rooms', label: 'Featured Rooms' },
            { value: 'Deluxe Rooms', label: 'Deluxe Rooms' },
            { value: 'Single Rooms', label: 'Single Rooms' },
            { value: 'Family Rooms', label: 'Family Rooms' },
            { value: 'Double Rooms', label: 'Double Rooms' }
        ];

        let categoryValue = null;
        if (this.state.current === "Featured Rooms") {
            categoryValue = this.props.featured;
        } else if (this.state.current === "Deluxe Rooms") {
            categoryValue = this.props.deluxe;
        } else if (this.state.current === "Single Rooms") {
            categoryValue = this.props.single;
        } else if (this.state.current === "Double Rooms") {
            categoryValue = this.props.double;
        } else if (this.state.current === "Family Rooms") {
            categoryValue = this.props.family;
        }

        if (this.props.isLoading) {
            return (
                <Spinner />
            )
        } else if (this.props.errMsg !== null) {
            return (
                <Alert>{this.props.errMsg}</Alert>
            )
        }
        else {
            return (
                <div className="container" >
                    <label className="my-3">Choose A Category</label>
                    <Select options={options}
                        onChange={this.handleChange} />
                    <Category category={categoryValue}
                        categoryName={this.state.current} />
                </div>
            )
        }


    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BookingHoom);