import { useState } from 'react';
import Layout from '../../../../../components/Layout';
import { resetPassword } from '../../../../../RequestApi/authRequest';
import { withRouter } from 'next/router';

const ResetPassword = ({ router }) => {
	const [requestState, setRequestState] = useState({
		error: false,
		errorMessage: '',
		success: false,
		successMessage: '',
		loading: false,
	});
	const [showForm, setShowForm] = useState(true);
	const [password, setPassword] = useState('');
	const {
		error,
		errorMessage,
		success,
		successMessage,
		loading,
	} = requestState;

	const handleSubmit = async (e) => {
		e.preventDefault();
		setRequestState({ ...requestState, loading: true });
		console.log(router.query.id);
		const response = await resetPassword({
			resetPasswordLink: router.query.id,
			newPassword: password,
		});
		if (response.success) {
			setRequestState({
				...requestState,
				loading: false,
				success: true,
				successMessage: response.result.message,
			});
			setShowForm(false);
		} else if (response.error) {
			setRequestState({
				...requestState,
				loading: false,
				error: true,
				errorMessage: response.errorMessage,
			});
		}
	};

	const handleChange = (e) => {
		setPassword(e.target.value);
	};

	const showResponseMessages = () => {
		return (
			<React.Fragment>
				<div
					className="alert alert-danger"
					style={{ display: error ? '' : 'none' }}
				>
					{errorMessage}
				</div>
				<div
					className="alert alert-info"
					style={{ display: success ? '' : 'none' }}
				>
					{successMessage}
				</div>
			</React.Fragment>
		);
	};
	const passwordForm = () => {
		return (
			<div className="container">
				<form onSubmit={handleSubmit}>
					<div className="form-group pt-5">
						<input
							type="password"
							onChange={handleChange}
							required
							autoFocus
							placeholder="Type your new password"
							className="form-control"
						/>
					</div>
					<div>
						<button className="btn-primary">Send password reset link</button>
					</div>
				</form>
			</div>
		);
	};
	return (
		<Layout>
			<div className="container">
				<h2>Reset Password</h2>
				{showResponseMessages()}
				{showForm && passwordForm()}
			</div>
		</Layout>
	);
};
export default withRouter(ResetPassword);
