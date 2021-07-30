import { SIGN_IN, SIGN_OUT, EMAIL, ORDER_SEARCH_TEXT,SEARCH_TEXT ,ADMIN_DATA , STATUS, START_DATE_FILTER, END_DATE_FILTER, FILTER_BY, CLEAR_DATA,URL_CHANGE} from '../actions/types';

const INITIAL_STATE = {
    isSignedIn: false,
    userId: null,
    email: null,
    searchText: null,
    orderSearchText : null,
    adminData: null,
    status:null,
    startDate: null,
    endDate: null,
    filterBy: '',
    URL_CHANGE:0
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SIGN_IN:
            return { ...state, isSignedIn: action.payload.token, userId: action.payload.id ,URL_CHANGE: 0};
        case SIGN_OUT:
            return { ...state, isSignedIn: false, userId: null , adminData: null};
        case EMAIL : return {...state, email: action.payload};
        case SEARCH_TEXT : return {...state, searchText: action.payload};
        case ORDER_SEARCH_TEXT : return {...state, orderSearchText: action.payload};
        case ADMIN_DATA : return {...state, adminData: action.payload};
        case STATUS : return {...state, status : action.payload}
        case START_DATE_FILTER : return {...state, startDate : action.payload}
        case END_DATE_FILTER : return {...state, endDate : action.payload}
        case FILTER_BY : return {...state, filterBy : action.payload}
        case CLEAR_DATA: return {...state, startDate: null, endDate: null, filterBy: null, searchText: null}
        case URL_CHANGE: return {...state, URL_CHANGE: action.payload} 
        default:
            return state;
    }

};