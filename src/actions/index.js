import {
	ADMIN_DATA,
	EMAIL,
	SIGN_IN,
	SEARCH_TEXT,
	ORDER_SEARCH_TEXT,
	STATUS,
	DATE_FILTER,
	START_DATE_FILTER,
	END_DATE_FILTER,
	FILTER_BY,
	CLEAR_DATA,
} from './types';
import history from '../history';

export const signIn = (formValues) => async (dispatch, getState) => {
	dispatch({
		type: SIGN_IN,
		payload: true,
	});
	history.push('/');
	window.location.reload();
};

export const setEmail = () => async (dispatch) => {
	dispatch({
		type: EMAIL,
	});
};

export const setCustomerText = () => async (dispatch, getState) => {
	dispatch({
		type: SEARCH_TEXT,
		payload: getState(),
	});
};

export const setText = () => async (dispatch, getState) => {
	dispatch({
		type: ORDER_SEARCH_TEXT,
		payload: getState(),
	});
};

export const setSTatus = () => async (dispatch, getState) => {
	dispatch({
		type: STATUS,
		payload: getState(),
	});
};

export const setAdminDetails = () => (dispatch, getState) => {
	dispatch({
		type: ADMIN_DATA,
		payload: getState(),
	});
};

export const setStartDate = () => async (dispatch, getState) => {
	dispatch({
		type: START_DATE_FILTER,
		payload: getState(),
	});
};
export const setEndDate = () => async (dispatch, getState) => {
	dispatch({
		type: END_DATE_FILTER,
		payload: getState(),
	});
};

export const setFilterBy = () => async (dispatch, getState) => {
	dispatch({
		type: FILTER_BY,
		payload: getState(),
	});
};

export const setClearData = () => ({
	type: CLEAR_DATA
});

export const clearData = (callback) => async (dispatch, getState) => {
	await dispatch(setClearData());
	callback();
};