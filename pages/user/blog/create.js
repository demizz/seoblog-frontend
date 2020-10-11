import Layout from '../../../components/Layout';
import Private from '../../../components/authentication/Private';
import NewBlog from '../../../components/NewBlog';
import { createBlog } from '../../../RequestApi/usersRequest';

const blog = () => {
	return (
		<div className="container-fluid">
			<div className="row">
				<h2>Create a new Blog</h2>
			</div>
		</div>
	);
};
export default blog;
