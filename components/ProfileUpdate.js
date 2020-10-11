import Link from 'next/link';
import { useState, useEffect } from 'react';
import router from 'next/router';
import { getCookie, isAuth } from '../RequestApi/authRequest';
import { getProfile, updateProfile } from '../RequestApi/usersRequest';
import { response } from 'express';
const ProfileUpdate = () => {
	const [values, setValues] = useState({
		name: '',
		username: '',
		email: '',
		password: '',
		photo: '',
		about: '',
	});
	const userData = new FormData();
	const [requestFindState, setRequestFindState] = useState({
		error: false,
		success: false,
		errorMessage: '',
		successMessage: '',
		loading: false,
	});
	const [requestUpdateState, setRequestUpdateState] = useState({
		error: false,
		success: false,
		errorMessage: '',
		successMessage: '',
		loading: false,
	});
	const [requestResult, setRequestResult] = useState({});
	const token = getCookie('token');
	const { name, username, email, password, about, photo } = values;
	const {
		loading,
		success,
		error,
		errorMessage,
		successMessage,
	} = requestFindState;
	const init = async () => {
		setRequestState({ ...requestFindState, loading: true });
		const response = await getProfile(token);
		if (response.success) {
			setRequestState({ ...requestFindState, loading: false, success: true });
			setRequestResult({ ...requestResult, profile: response.result });
		} else if (response.error) {
			setRequestState({
				...requestFindState,
				loading: false,
				error: true,
				errorMessage: response.errorMessage,
			});
		}
	};
	const showError = () => {
		<div
			className="alert alert-danger"
			style={{ display: error ? '' : 'none' }}
		>
			{errorMessage}
		</div>;
	};
	const showSuccess = () => {
		<div
			className="alert alert-info"
			style={{ display: success ? '' : 'none' }}
		>
			Profile updated
		</div>;
	};

	useEffect(() => {
		init();
	}, []);
	const handleChange = (name) => (e) => {
		const value = name === 'photo' ? e.target.files[0] : e.target.value;
		setValues({ ...values, [name]: value });
		userData.set(name, value);
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		setRequestState({ ...requestState, loading: true });
		const response = await updateProfile(token, userData);
		if (response.success) {
			setRequestUpdateState({ ...requestState, loading: false, success: true });
			setRequestResult({ ...requestResult, profile: response.result });
		} else if (response.error) {
			setRequestUpdateState({
				...requestState,
				loading: false,
				errror: true,
				errorMessage: response.errorMessage,
			});
			console.log(response.errorMessage);
		}
	};
	const profileUpdateForm = () => {
		<form action="">
			<div className="form-group">
				<label htmlFor="" className="text-muted">
					Profile photo
					<input
						type="file"
						onChange={handleChange('photo')}
						name=""
						accept="image/*"
						id=""
						className="form-control"
					/>
				</label>
			</div>
			<div className="form-group">
				<label htmlFor="" className="text-muted">
					username
				</label>
				<input
					type="text"
					onChange={handleChange('username')}
					value={username}
					className="form-control"
				/>
			</div>
			<div className="form-group">
				<label htmlFor="" className="text-muted">
					name
				</label>
				<input
					type="text"
					onChange={handleChange('name')}
					value={name}
					className="form-control"
				/>
			</div>
			<div className="form-group">
				<label htmlFor="" className="text-muted">
					email
				</label>
				<input
					type="text"
					onChange={handleChange('email')}
					value={email}
					className="form-control"
				/>
			</div>
			<div className="form-group">
				<label htmlFor="" className="text-muted">
					password
				</label>
				<input
					type="text"
					onChange={handleChange('password')}
					value={password}
					className="form-control"
				/>
			</div>
			<div className="form-group">
				<label htmlFor="" className="text-muted">
					about
				</label>
				<input
					type="text"
					onChange={handleChange('about')}
					value={about}
					className="form-control"
				/>
			</div>
			<div>
				<button
					className="btn btn-primary"
					type="submit"
					onSubmit={handleSubmit}
				>
					Submit
				</button>
			</div>
		</form>;
	};
	return (
		<React.Fragment>
			<div className="container">
				<div className="row">
					<div className="col-md-4">image</div>
					<div className="col-md-8">
						{showError()}
						{showSuccess()}
						update Form
						{!loading && success && JSON.stringify(requestResult)}
						{!loading && success && profileUpdateForm()}
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};
export default ProfileUpdate;
