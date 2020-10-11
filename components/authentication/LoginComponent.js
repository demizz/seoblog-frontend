import { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';

import {
	loginRequest,
	authenticate,
	isAuth,
} from '../../RequestApi/authRequest';

const RegisterComponent = () => {
	const [inputsValues, setInputsValues] = useState({
		email: '',
		password: '',
	});
	const [requestState, setRequestState] = useState({
		error: null,
		errorMessage: null,
		loading: false,
		success: false,
		successMessage: '',
	});
	useEffect(() => {
		isAuth() && Router.push('/');
	}, []);
	const { email, password } = inputsValues;
	const {
		error,
		errorMessage,
		loading,
		success,
		successMessage,
	} = requestState;

	const handleSubmit = async (event) => {
		event.preventDefault();

		setRequestState({
			...requestState,
			loading: true,
		});
		const user = { email, password };
		const response = await loginRequest(user);
		if (response.error) {
			setRequestState({
				...requestState,
				loading: false,
				error: true,

				errorMessage: response.errorMessage,
			});
			setTimeout(() => {
				setRequestState({
					...requestState,
					error: false,
					success: false,
					loading: false,
					errorMessage: '',
					successMessage: '',
				});
			}, 3000);
		} else {
			setRequestState({
				...requestState,
				loading: false,
				success: true,
				successMessage: 'Welcome to Seoblog',
			});
			console.log('result', response.result);
			authenticate(response.result, () => {
				setTimeout(() => {
					Router.push('/');
				}, 3000);
			});
		}
	};
	const handleChange = (name) => (e) => {
		setInputsValues({ ...inputsValues, [name]: e.target.value });
	};
	const registerForm = () => {
		return (
			<form action="" onSubmit={handleSubmit}>
				<div className="form-group">
					<input
						type="email"
						onChange={handleChange('email')}
						placeholder="Tape your email"
						className="form-control"
						value={email}
					/>
				</div>

				<div className="form-group">
					<input
						type="password"
						onChange={handleChange('password')}
						placeholder="Tape your password"
						className="form-control"
						value={password}
					/>
				</div>
				<div>
					<button className="btn btn-primary" disabled={loading}>
						Login
					</button>
				</div>
			</form>
		);
	};
	const showResponseMessages = () => {
		return (
			<React.Fragment>
				<div
					className="alert alert-info"
					style={{ display: loading ? '' : 'none' }}
				>
					Loading...
				</div>
				<div
					className="alert alert-danger"
					style={{ display: error ? '' : 'none' }}
				>
					{errorMessage}
				</div>
				<div
					className="alert alert-success"
					style={{ display: success ? '' : 'none' }}
				>
					{successMessage}
				</div>
			</React.Fragment>
		);
	};

	return (
		<React.Fragment>
			{showResponseMessages()}

			{!success && !error && (
				<React.Fragment>
					{registerForm()}
					<br />
					<Link href="/user/auth/password/forget">
						<a className="btn btn-outline-primary">Forget Password ?</a>
					</Link>
				</React.Fragment>
			)}
		</React.Fragment>
	);
};
export default RegisterComponent;
