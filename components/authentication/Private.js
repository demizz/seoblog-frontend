import { useEffect } from 'react';
import Router from 'next/router';
import { isAuth } from '../../RequestApi/authRequest';
const Private = ({ children }) => {
	useEffect(() => {
		if (!isAuth()) {
			Router.push('/login');
		}
	}, []);
	return <React.Fragment>{children}</React.Fragment>;
};
export default Private;
