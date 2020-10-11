import Layout from '../../../components/Layout';
import Admin from '../../../components/authentication/admin';
import Category from '../../../components/crud/Category';
import Tag from '../../../components/crud/Tag';
const AdminIndex = () => {
	return (
		<Layout>
			<Admin>
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-12 pt-4 pt-5">
							<h2>Manage Category and Tags</h2>
						</div>
						<div className="col-md-4">
							<Category />
						</div>
						<div className="col-md-8">
							<Tag />
						</div>
					</div>
				</div>
			</Admin>
		</Layout>
	);
};
export default AdminIndex;
