import { useState } from 'react';
import Layout from '../../../../components/Layout';
import { forgetPassword } from '../../../../RequestApi/authRequest';
import Link from 'next/link';
const forget = () => {
	const [requestState, setRequestState] = useState({
		error: false,
		success: false,
		errorMessage: '',
		successMessage: '',
		loading: false,
	});
	const [showForm, setShowForm] = useState(true);
	const [email, setEmail] = useState('');
	const {
		error,
		errorMessage,
		success,
		successMessage,
		loading,
	} = requestState;

	const handleChange = (e) => {
		setEmail(e.target.value);
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		setRequestState({ ...requestState, loading: true });
		const response = await forgetPassword({ email });
		console.log({ response });
		if (response.error) {
			setRequestState({
				...requestState,
				loading: false,
				error: true,
				errorMessage: response.errorMessage,
			});
			setEmail('');
		} else if (response.success) {
			setRequestState({
				...requestState,
				loading: false,
				success: true,
				successMessage: response.result.url,
			});
			console.log(response.result);
			setShowForm(false);
			setEmail('');
		}
	};
	const showResponseMessages = () => {
		return (
			<React.Fragment>
				<div
					className="alert alert-danger"
					style={{ display: error && !loading ? '' : 'none' }}
				>
					{errorMessage}
				</div>
				<div
					className="alert alert-info"
					style={{ display: success && !loading ? '' : 'none' }}
				>
					check this url :
					{
						<Link href={successMessage}>
							<a href="">{successMessage}</a>
						</Link>
					}
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
							type="email"
							onChange={handleChange}
							required
							autoFocus
							autoComplete="on"
							placeholder="Type your email"
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
				<h2>Forget Password</h2>
				{JSON.stringify(email)}
				{showResponseMessages()}
				{showForm && passwordForm()}
			</div>
		</Layout>
	);
};
export default forget;
