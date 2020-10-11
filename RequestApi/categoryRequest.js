import cookie from 'js-cookie';
import fetch from 'isomorphic-fetch';
import { API } from '../config';
export const createCategory = async (category, token) => {
	console.log(category, token);
	console.log(typeof token);
	let requestState = {
		error: false,
		success: false,
		errorMessage: '',
		result: null,
	};

	const res = await fetch(`${API}/category/newCategory`, {
		method: 'post',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			authentication: 'Bearer ' + token,
		},
		body: JSON.stringify(category),
	});
	const response = await res.json();
	console.log({ response });
	if (response.status === 'success') {
		requestState = {
			...requestState,
			success: true,
			result: response.result,
		};
	} else {
		requestState = {
			...requestState,
			error: true,
			errorMessage: response.message,
		};
	}

	console.log(requestState);
	return requestState;
};
export const getCategories = async () => {
	let requestState = {
		error: false,
		success: false,
		errorMessage: '',
		result: null,
	};

	const res = await fetch(`${API}/category/allCategories`);
	const response = await res.json();
	console.log({ response });
	if (response.status === 'success') {
		requestState = {
			...requestState,
			success: true,
			result: response.result,
		};
	} else {
		requestState = {
			...requestState,
			error: true,
			errorMessage: response.message,
		};
	}

	console.log(requestState);
	return requestState;
};
export const getOneCategory = async (category) => {
	console.log(category, token);
	let requestState = {
		error: false,
		success: false,
		errorMessage: '',
		result: null,
	};

	const res = await fetch(`${API}/category/${category}`, {
		method: 'get',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			authentication: 'Bearer ' + token,
		},
	});
	const response = await res.json();
	console.log({ response });
	if (response.status === 'success') {
		requestState = {
			...requestState,
			success: true,
			result: response.result,
		};
	} else {
		requestState = {
			...requestState,
			error: true,
			errorMessage: response.message,
		};
	}

	console.log(requestState);
	return requestState;
};

export const deleteOneCategory = async (category, token) => {
	console.log(category, token);
	let requestState = {
		error: false,
		success: false,
		errorMessage: '',
		result: null,
	};

	const res = await fetch(`${API}/category/${category}`, {
		method: 'delete',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			authentication: 'Bearer ' + token,
		},
	});
	const response = await res.json();
	console.log({ response });
	if (response.status === 'success') {
		requestState = {
			...requestState,
			success: true,
			result: response.result,
		};
	} else {
		requestState = {
			...requestState,
			error: true,
			errorMessage: response.message,
		};
	}

	console.log(requestState);
	return requestState;
};
