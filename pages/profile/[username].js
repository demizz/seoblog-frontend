import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { userProfile } from '../../RequestApi/usersRequest';
import moment from 'moment';
import { withRouter } from 'next/router';
import { API } from '../../config';
const username = ({ user, blogs }) => {
	const showUserBlogs = () => {
		const blogs = blogs;
		return blogs.map((blog, i) => {
			return (
				<div className="mt-4 mb-4">
					<Link href={`/blogs/${blog.slug}`}>
						<a href="" className="lead">
							{blog.title}
						</a>
					</Link>
				</div>
			);
		});
	};
	return (
		<React.Fragment>
			<Layout>
				{JSON.stringify(user, blogs)}
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<div className="card">
								<div className="card-body">
									<h5>username</h5>

									<Link href={`${user.profile}`}>
										<a href=""> View Profile</a>
									</Link>
									<p className="text-muted">
										Joined {moment(user.createdAt).fromNow()}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<br />
				<div className="container pb-5">
					<div className="row">
						<div className="col-md-6">
							<div className="card">
								<div className="card-body">
									<h5 className=" text-white card-title bg-primary pt-4 pl-4 pr-4">
										Recent blogs by{user.name}
									</h5>

									<p> {showUserBlogs()}</p>
								</div>
							</div>
						</div>
						<div className="col-md-6">
							<div className="card">
								<div className="card-body">
									<h5 className="text-white card-title bg-primary pt-4 pl-4 pr-4">
										Message{user.name}
									</h5>
									<br />
									<p>Contact form</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		</React.Fragment>
	);
};
username.getInitialProps = async ({ query }) => {
	console.log(query);
	let data;
	const response = await userProfile(query.username);
	console.log(response);
	if (response.error) {
		data = {};
	} else if (response.success) {
		console.log(response.result);
		data = { user: response.result.user, blogs: response.result.blogs };
	}
	console.log(data);
	return data;
};
export default withRouter(username);
