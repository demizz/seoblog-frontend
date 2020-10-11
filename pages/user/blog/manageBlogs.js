import Layout from '../../../components/Layout';
import Private from '../../../components/authentication/Private';
import ManageBlogsComponent from '../../../components/ManageBlogsComponent';
import { isAuth } from '../../../RequestApi/authRequest';
const list = () => {
	const username = isAuth() && isAuth().username;
	return (
		<Layout>
			<Private>
				<div className="container">
					<div className="row">
						<div className="col-md-12 pt-4 pt-5">
							<h2>Manage Blogs</h2>
						</div>
						<div className="col-md-10 offset-md-1">
							<ManageBlogsComponent username={username} />
						</div>
					</div>
				</div>
			</Private>
		</Layout>
	);
};
export default list;
