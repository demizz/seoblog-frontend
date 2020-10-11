import fetch from 'isomorphic-fetch';
import { API } from '../config';
import queryString from 'querystring';
export const userProfile = async (username) => {
	let requestState = {
		error: false,
		success: false,
		errorMessage: '',
		result: null,
	};

	const res = await fetch(`${API}/users/${username}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
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
export const getProfile = async (token) => {
	let requestState = {
		error: false,
		success: false,
		errorMessage: '',
		result: null,
	};

	const res = await fetch(`${API}/users/profile`, {
		method: 'GET',
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
export const updateProfile = async (token, user) => {
	let requestState = {
		error: false,
		success: false,
		errorMessage: '',
		result: null,
	};

	const res = await fetch(`${API}/users/update`, {
		method: 'put',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			authentication: 'Bearer ' + token,
		},
		body: user,
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
export const readPhoto = async (username) => {
	let requestState = {
		error: false,
		success: false,
		errorMessage: '',
		result: null,
	};

	const res = await fetch(`${API}/users/photo/${username}`, {
		method: 'GET',
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
export const createBlog = async (data, token) => {

	let requestState = {
		error: false,
		success: false,
		errorMessage: '',
		result: null,
	};

	const res = await fetch(`${API}/users/blog/create`, {
		method: 'post',
		headers: {
			

			authentication: 'Bearer ' + token,
		},
		body: data,
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

export const getAllBlogsForThisUser = async (username, token) => {
	let requestState = {
		error: false,
		success: false,
		errorMessage: '',
		result: null,
	};
	console.log(API);
	const res = await fetch(`${API}/users/${username}/blogs`, {
		method: 'get',
		headers: {
			Accept: 'application/json',
			ContentType: 'application/json',
			authentication: 'Bearer ' + token,
		},
	});
	console.log(res);
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
export const removeBlog = async (slug, token) => {
	let requestState = {
		error: false,
		success: false,
		errorMessage: '',
		result: null,
	};
	console.log(API);
	const res = await fetch(`${API}/users/blog/${slug}`, {
		method: 'delete',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			authentication: 'Bearer ' + token,
		},
	});
	console.log(res);
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
export const updateBlog = async (data, token, slug) => {
	console.log(data, token);
	console.log(typeof token);
	let requestState = {
		error: false,
		success: false,
		errorMessage: '',
		result: null,
	};

	const res = await fetch(`${API}/users/blog/${slug}`, {
		method: 'put',
		headers: {
			Accept: 'application/json',

			authentication: 'Bearer ' + token,
		},
		body: data,
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
