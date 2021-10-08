import * as actionTypes from './actionTypes';

const INITIAL_STATE = {
    featured: [],
    deluxe: [],
    single: [],
    double: [],
    family: [],
    bookings: [],
    bookingsLoading: true,
    bookingsErr: false,
    isLoading: false,
    errMsg: null,
    token: null,
    userId: null,
    authLoading: false,
    authFailedMessage: null,
}

export const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.FETCH_LOADING:
            return {
                ...state,
                featured: [],
                isLoading: true,
                errMsg: null,
            }
        case actionTypes.LOAD_FEATURED:
            let featured = [];
            for (let key in action.payload) {
                featured.push({
                    ...action.payload[key],
                    id: key,
                })
            }
            return {
                ...state,
                featured: featured,
                isLoading: false,
                errMsg: null,
            }
        case actionTypes.FETCH_FAILED:
            return {
                ...state,
                featured: [],
                isLoading: false,
                errMsg: action.payload,
            }
        case actionTypes.LOAD_DELUXE:
            let deluxe = [];
            for (let key in action.payload) {
                deluxe.push({
                    ...action.payload[key],
                    id: key,
                })
            }
            return {
                ...state,
                deluxe: deluxe,
                isLoading: false,
                errMsg: null,
            }
        case actionTypes.LOAD_SINGLE:
            let single = [];
            for (let key in action.payload) {
                single.push({
                    ...action.payload[key],
                    id: key,
                })
            }
            return {
                ...state,
                single: single,
                isLoading: false,
                errMsg: null,
            }
        case actionTypes.LOAD_DOUBLE:
            let double = [];
            for (let key in action.payload) {
                double.push({
                    ...action.payload[key],
                    id: key,
                })
            }
            return {
                ...state,
                double: double,
                isLoading: false,
                errMsg: null,
            }
        case actionTypes.LOAD_FAMILY:
            let family = [];
            for (let key in action.payload) {
                family.push({
                    ...action.payload[key],
                    id: key,
                })
            }
            return {
                ...state,
                family: family,
                isLoading: false,
                errMsg: null,
            }
        case actionTypes.LOAD_BOOKINGS:
            let bookings = [];
            for (let key in action.payload) {
                bookings.push({
                    ...action.payload[key],
                    id: key,
                })
            }
            return {
                ...state,
                bookings: bookings,
                bookingsLoading: false,
            }
        case actionTypes.BOOKINGS_FAILED:
            return {
                ...state,
                bookingsLoading: false,
                bookingsErr: true,
            }

        //Auth
        case actionTypes.AUTH_SUCCESS:
            return ({
                ...state,
                token: action.payload.token,
                userId: action.payload.userId,
                authFailedMessage: null,
            })

        case actionTypes.AUTH_LOGOUT:
            return ({
                ...state,
                token: null,
                userId: null,
                authFailedMessage: null,
            })

        case actionTypes.AUTH_LOADING:
            return ({
                ...state,
                authLoading: action.payload,
                authFailedMessage: null,
            })

        case actionTypes.AUTH_FAILED:
            return ({
                ...state,
                authFailedMessage: action.payload,
            })

        default:
            return state;
    }
}