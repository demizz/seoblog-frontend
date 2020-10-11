import Layout from '../../../components/Layout';
import Admin from '../../../components/authentication/admin';
import ReadBlogs from '../../../components/crud/ReadBlogs';

const AdminIndex = () => {
	return (
		<Layout>
			<Admin>
				<div className="container">
					<div className="row">
						<div className="col-md-12 pt-4 pt-5">
							<h2>Manage Blogs</h2>
						</div>
						<div className="col-md-10 offset-md-1">
							<ReadBlogs />
						</div>
					</div>
				</div>
			</Admin>
		</Layout>
	);
};
export default AdminIndex;
