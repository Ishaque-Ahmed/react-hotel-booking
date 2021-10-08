import * as actionTypes from './actionTypes';
import axios from 'axios';
import { baseUrl } from './BaseUrl';

export const fetchLoading = () => ({
    type: actionTypes.FETCH_LOADING,
})
export const fetchFailed = errMsg => ({
    type: actionTypes.FETCH_FAILED,
    payload: errMsg,
})

export const loadFeatured = featured => ({
    type: actionTypes.LOAD_FEATURED,
    payload: featured,
})

export const fetchFeatured = () => dispatch => {
    dispatch(fetchLoading());
    axios.get(baseUrl + "featured")
        .then(response => response.data)
        .then(featured => dispatch(loadFeatured(featured)))
        .catch(error => dispatch(fetchFailed(error.message)));
}

export const loadDeluxe = deluxe => ({
    type: actionTypes.LOAD_DELUXE,
    payload: deluxe,
})

export const fetchDeluxe = () => dispatch => {
    dispatch(fetchLoading());
    axios.get(baseUrl + "deluxe")
        .then(response => response.data)
        .then(deluxe => dispatch(loadDeluxe(deluxe)))
        .catch(error => dispatch(fetchFailed(error.message)));
}

export const loadSingle = single => ({
    type: actionTypes.LOAD_SINGLE,
    payload: single,
})
export const fetchSingle = () => dispatch => {
    dispatch(fetchLoading());
    axios.get(baseUrl + "single")
        .then(response => response.data)
        .then(single => dispatch(loadSingle(single)))
        .catch(error => dispatch(fetchFailed(error.message)));
}

export const loadDouble = double => ({
    type: actionTypes.LOAD_DOUBLE,
    payload: double,
})
export const fetchDouble = () => dispatch => {
    dispatch(fetchLoading());
    axios.get(baseUrl + "double")
        .then(response => response.data)
        .then(double => dispatch(loadDouble(double)))
        .catch(error => dispatch(fetchFailed(error.message)));
}

export const loadFamily = family => ({
    type: actionTypes.LOAD_FAMILY,
    payload: family,
})
export const fetchFamily = () => dispatch => {
    dispatch(fetchLoading());
    axios.get(baseUrl + "family")
        .then(response => response.data)
        .then(family => dispatch(loadFamily(family)))
        .catch(error => dispatch(fetchFailed(error.message)));
}

export const loadBookings = bookings => {
    return {
        type: actionTypes.LOAD_BOOKINGS,
        payload: bookings,
    }
}

export const bookingsFailed = () => {
    return {
        type: actionTypes.BOOKINGS_FAILED,
    }
}

export const fetchBookings = (token, userId) => dispatch => {
    const queryParam = '&orderBy="userId"&equalTo="' + userId + '"';
    axios.get('https://react-hotel-booking-4716c-default-rtdb.firebaseio.com/bookings.json?auth='
        + token + queryParam)
        .then(response => dispatch(loadBookings(response.data)))
        .catch(error => dispatch(bookingsFailed()));

}

// export const update = (roomId, title, price, available, category, image) => {
//     const room = {
//         roomId: roomId,
//         title: title,
//         price: price,
//         available: available,
//         category: category,
//         image: image,
//     }
//     axios.post("http://localhost:3001/featured", room)
//         .then(response => console.log(response.data))
//         .catch(err => console.log(err));
// }
