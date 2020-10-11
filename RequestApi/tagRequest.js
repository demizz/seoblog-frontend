import fetch from 'isomorphic-fetch';
import { API } from '../config';
export const createTag = async (tag, token) => {
	console.log(tag, token);
	console.log(typeof token);
	let requestState = {
		error: false,
		success: false,
		errorMessage: '',
		result: null,
	};

	const res = await fetch(`${API}/tag/newTag`, {
		method: 'post',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			authentication: 'Bearer ' + token,
		},
		body: JSON.stringify(tag),
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
export const getTags = async () => {
	let requestState = {
		error: false,
		success: false,
		errorMessage: '',
		result: null,
	};

	const res = await fetch(`${API}/tag/allTags`);
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
export const getOneTag = async (tag, token) => {
	console.log(tag, token);
	let requestState = {
		error: false,
		success: false,
		errorMessage: '',
		result: null,
	};

	const res = await fetch(`${API}/tag/${tag}`, {
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

export const deleteOneTag = async (tag, token) => {
	console.log(tag, token);
	let requestState = {
		error: false,
		success: false,
		errorMessage: '',
		result: null,
	};

	const res = await fetch(`${API}/tag/${tag}`, {
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
