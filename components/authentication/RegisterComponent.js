import { useState, useEffect } from 'react';
import { registerRequest, isAuth } from '../../RequestApi/authRequest';
import Router from 'next/router';
const RegisterComponent = () => {
	const [formdata] = useState(new FormData());
	const [fileReader] = useState(new FileReader());
	const [inputsValues, setInputsValues] = useState({
		name: '',
		email: '',
		password: '',
		photo: '',
	});
	const [imagePreview, setImagePreview] = useState();
	const [requestState, setRequestState] = useState({
		error: false,
		errorMessage: '',
		loading: false,
		success: false,
		successMessage: '',
	});

	useEffect(() => {
		isAuth() && Router.push('/');
	}, []);
	const { name, email, password, photo } = inputsValues;
	const {
		error,
		errorMessage,
		loading,
		success,
		successMessage,
	} = requestState;
	const handleChange = (inputName) => (e) => {
		const value = inputName === 'photo' ? e.target.files[0] : e.target.value;
		if (inputName === 'photo') {
			fileReader.onload = () => {
				setImagePreview(fileReader.result);
			};
			fileReader.readAsDataURL(value);
		}

		formdata.set(inputName, value);

		setInputsValues({
			...inputsValues,
			[inputName]: value,
		});
	};
	const handleSubmit = async (event) => {
		event.preventDefault();
		console.table({
			name,
			email,
			password,
			photo,
			formdata,
			loading,
			error,
			errorMessage,
			success,
		});
		setRequestState({
			...requestState,
			loading: true,
		});

		const response = await registerRequest(formdata);
		console.log('register response', response);
		if (response.error) {
			setRequestState({
				...requestState,
				error: true,
				loading: false,

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
			}, 4000);
		} else if (response.success) {
			setRequestState({
				...requestState,

				loading: false,
				success: true,
				successMessage:
					'congradulation you are successfully register try to login In',
			});

			setInputsValues({
				...inputsValues,
				name: '',
				password: '',
				email: '',
			});
			setTimeout(() => {
				Router.push('/login');
			}, 4000);
		}
	};

	const registerForm = () => {
		return (
			<div className="row">
				<div className="col-md-7">
					<form action="" onSubmit={handleSubmit}>
						<div className="form-group">
							<input
								type="text"
								onChange={handleChange('name')}
								placeholder="Tape your name"
								className="form-control"
								value={name}
							/>
						</div>
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
							<button className="btn btn-primary">Register</button>
						</div>
					</form>
				</div>
				<div className="col-md-5">
					<div className="form-group text-center">
						{!imagePreview && (
							<React.Fragment>
								<h5>Please Pick an image</h5>
								<p>
									<small className="text-muted">Max size 1 MB</small>
								</p>
								<label htmlFor="userPhoto" className=" btn btn-outline-info">
									<input
										hidden
										type="file"
										name="photo"
										id="userPhoto"
										accept="image/*"
										onChange={handleChange('photo')}
									/>
									Upload Photo
								</label>
							</React.Fragment>
						)}
						{imagePreview && (
							<div style={{ maxHeight: '300px', maxWidth: '300px' }}>
								<img src={imagePreview} alt="" />
							</div>
						)}
					</div>
				</div>
			</div>
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

			{!success && !error && registerForm()}
		</React.Fragment>
	);
};
export default RegisterComponent;
