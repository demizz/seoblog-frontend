import cookie from 'js-cookie';
import fetch from 'isomorphic-fetch';
import { API } from '../config';
import { useState } from 'react';
export const registerRequest = async (user) => {
	console.log(user);
	console.log(API);
	let response = {
		error: false,
		success: false,
		errorMessage: '',
		result: null,
	};

	const res = await fetch(`${API}/auth/register`, {
		method: 'post',

		body: user,
	});
	const data = await res.json();
	if (data.status === 'success') {
		response.result = data.result;
		response.success = true;
	} else {
		response.error = true;
		response.errorMessage = data.message;
	}
	console.log('data from backend', response);

	return response;
};
export const loginRequest = async (user) => {
	let requestState = {
		error: false,
		success: false,
		errorMessage: '',
		result: null,
	};

	const res = await fetch(`${API}/auth/login`, {
		method: 'post',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(user),
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
export const signout = async (next) => {
	removeCookie('token');
	removeLocalStorage('user');
	const res = await fetch(`${API}/auth/signout`);
	const response = await res.json();

	if (response.status === 'success') {
		next();
	}
};
export const setCookie = (key, value) => {
	if (process.browser) {
		cookie.set(key, value, {
			expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
		});
	}
};
export const removeCookie = (key) => {
	if (process.browser) {
		cookie.set(key, 'remove', {
			expires: new Date(Date.now() + 10 * 1000),
		});
	}
};
export const getCookie = (key) => {
	if (process.browser) {
		return cookie.get(key);
	}
};
export const setLocalStorage = (key, value) => {
	if (process.browser) {
		localStorage.setItem(key, JSON.stringify(value));
	}
};
export const removeLocalStorage = (key) => {
	if (process.browser) {
		localStorage.removeItem(key);
	}
};
export const authenticate = (data, next) => {
	setCookie('token', data.token);
	setLocalStorage('user', data.user);
	next();
};
export const isAuth = () => {
	if (process.browser) {
		const cookieChecked = getCookie('token');
		if (cookieChecked) {
			if (localStorage.getItem('user')) {
				return JSON.parse(localStorage.getItem('user'));
			} else {
				return false;
			}
		}
	}
};
export const forgetPassword = async (email) => {
	let response = {
		error: false,
		success: false,
		errorMessage: '',
		result: null,
	};
	try {
		const res = await fetch(`${API}/auth/forgetPassword`, {
			method: 'post',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(email),
		});
		const data = await res.json();
		response.result = data.result;
		response.success = true;
	} catch (err) {
		(response.error = true), (response.errorMessage = err);
	}
	return response;
};
export const resetPassword = async (info) => {
	let response = {
		error: false,
		success: false,
		errorMessage: '',
		result: null,
	};
	try {
		console.log(info);
		const res = await fetch(`${API}/auth/resetPassword`, {
			method: 'post',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(info),
		});
		const data = await res.json();
		response.result = data;
		response.success = true;
	} catch (err) {
		(response.error = true), (response.errorMessage = err);
	}
	return response;
};
export const googleLogin = async (info) => {
	let response = {
		error: false,
		success: false,
		errorMessage: '',
		result: null,
	};
	try {
		console.log(info);
		const res = await fetch(`${API}/auth/google-login`, {
			method: 'post',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(info),
		});
		const data = await res.json();
		response.result = data;
		response.success = true;
	} catch (err) {
		(response.error = true), (response.errorMessage = err);
	}
	return response;
};
