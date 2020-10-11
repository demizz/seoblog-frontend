import Layout from '../../../components/Layout';
import Admin from '../../../components/authentication/admin';
import BlogUpdate from '../../../components/crud/BlogUpdate';

const Blog = () => {
	return (
		<Layout>
			<Admin>
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-12 pt-4 pt-5">
							<h2>Update Blog</h2>
						</div>
						<div className="col-md-10 offset-md-1">
							<BlogUpdate />
						</div>
					</div>
				</div>
			</Admin>
		</Layout>
	);
};
export default Blog;
