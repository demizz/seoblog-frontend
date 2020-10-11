import fetch from 'isomorphic-fetch';
import { API } from '../config';
import queryString from 'querystring';
export const createBlog = async (data, token) => {
	console.log(data, token);
	console.log(typeof token);
	let requestState = {
		error: false,
		success: false,
		errorMessage: '',
		result: null,
	};

	const res = await fetch(`${API}/blogs/newBlog`, {
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
export const getOneBlog = async (slug) => {
	let requestState = {
		error: false,
		success: false,
		errorMessage: '',
		result: null,
	};

	const res = await fetch(`${API}/blogs/${slug}`, {
		method: 'get',
		headers: {
			Accept: 'application/json',
			ContentType: 'application/json',
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
export const searchList = async (params) => {
	const query = queryString.stringify(params);
	let requestState = {
		error: false,
		success: false,
		errorMessage: '',
		result: null,
	};

	const res = await fetch(`${API}/blogs/search?${query}`, {
		method: 'get',
		headers: {
			Accept: 'application/json',
			ContentType: 'application/json',
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
export const listBlogsWithCategoriesAndTags = async (skip, limit) => {
	let requestState = {
		error: false,
		success: false,
		errorMessage: '',
		result: null,
	};
	const data = { skip, limit };
	console.log(API);
	const res = await fetch(`${API}/blogs/blogs-categories-tags`, {
		method: 'post',
		headers: {
			Accept: 'application/json',
			ContentType: 'application/json',
		},
		body: JSON.stringify(data),
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
export const listRelated = async (blog) => {
	let requestState = {
		error: false,
		success: false,
		errorMessage: '',
		result: null,
	};
	console.log({ blog });
	const res = await fetch(`${API}/blogs/listRelated`, {
		method: 'post',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(blog),
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

export const readPhoto = async (slug) => {
	let requestState = {
		error: false,
		success: false,
		errorMessage: '',
		result: null,
	};
	console.log(API);
	const res = await fetch(`${API}/blogs/photo/${slug}`, {
		method: 'get',
		headers: {
			Accept: 'application/json',
			ContentType: 'application/json',
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
export const getAllBlogs = async (slug) => {
	let requestState = {
		error: false,
		success: false,
		errorMessage: '',
		result: null,
	};
	console.log(API);
	const res = await fetch(`${API}/blogs/allBlogs`, {
		method: 'get',
		headers: {
			Accept: 'application/json',
			ContentType: 'application/json',
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
	const res = await fetch(`${API}/blogs/${slug}`, {
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

	const res = await fetch(`${API}/blogs/${slug}`, {
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
