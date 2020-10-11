import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import GoogleLogin from 'react-google-login';
import { googleLogin } from '../../RequestApi/authRequest';
import { GOOGLE_CLIENT_ID } from '../../config';

const LoginWithGoogle = () => {
	const responseGoogle = async (response) => {
		console.log(response);
		const tokenId = response.tokenId;
		const user = { tokenId };
		const data = await googleLogin(user);
		if (data.error) {
		} else if (data.success) {
			console.log(data.result);
			if (reponse.result.user.role === 1) {
				Router.push('/admin');
			} else {
				Router.push('/user');
			}
		}
	};
	return (
		<div className="login-with-google-div mb-3">
			<GoogleLogin
				client_Id={GOOGLE_CLIENT_ID}
				buttonText="Login with Google"
				onSuccess={responseGoogle}
				onFailure={responseGoogle}
				theme="dark"
			/>
		</div>
	);
};
export default LoginWithGoogle;
