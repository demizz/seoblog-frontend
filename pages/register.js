import Layout from '../components/Layout';
import Link from 'next/link';
import RegisterComponent from '../components/authentication/RegisterComponent';
const Register = () => {
	return (
		<Layout>
			<h2 className="text-center pt-4 pb-4">Register</h2>
			<div className="container-fluid">
				
					<RegisterComponent />
			
			</div>
		</Layout>
	);
};
export default Register;
