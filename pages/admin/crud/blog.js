import Layout from '../../../components/Layout';
import Admin from '../../../components/authentication/admin';
import BlogCreate from '../../../components/crud/BlogCreate';

const AdminIndex = () => {
	return (
		<Layout>
			<Admin>
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-12 pt-4 pt-5">
							<h2>Create a new Blog</h2>
						</div>
						<div className="col-md-10 offset-md-1">
							<BlogCreate />
						</div>
					</div>
				</div>
			</Admin>
		</Layout>
	);
};
export default AdminIndex;
