import Layout from '../../components/Layout';
import Admin from '../../components/authentication/admin';
import Link from 'next/link';
const AdminIndex = () => {
	return (
		<Layout>
			<Admin>
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-12 pt-4 pt-5">
							<h2>Admin Dashboard</h2>
						</div>
						<div className="col-md-4">
							<ul className="list-group">
								<li className="list-group-item">
									<Link href="admin/crud/category-tag">
										<a>create Category</a>
									</Link>
								</li>
								<li className="list-group-item">
									<Link href="admin/crud/category-tag">
										<a>create Tag</a>
									</Link>
								</li>
								<li className="list-group-item">
									<Link href="admin/crud/blogs">
										<a>create Blog</a>
									</Link>
								</li>
								<li className="list-group-item">
									<Link href="admin/crud/blogs">
										<a>Manage Blogs</a>
									</Link>
								</li>
							</ul>
						</div>
						<div className="col-md-8">right</div>
					</div>
				</div>
			</Admin>
		</Layout>
	);
};
export default AdminIndex;
