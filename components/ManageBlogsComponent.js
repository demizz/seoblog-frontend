import Link from 'next/link';
import { useState, useEffect } from 'react';
import router from 'next/router';
import moment from 'moment';
import { getCookie, isAuth } from '../RequestApi/authRequest';
import {
	removeBlog,
	updateBlog,
	getAllBlogsForThisUser,
} from '../RequestApi/usersRequest';
const ManageBlogsComponent = ({ username }) => {
	const [blogs, setBlogs] = useState([]);
	const [message, setMessage] = useState('');
	const [requestState, setRequestState] = useState({
		success: false,
		error: false,
		errorMessage: '',
		loading: false,
	});
	const token = getCookie('token');
	const loadBlogs = async () => {
		setRequestState({
			...requestState,
			loading: true,
		});

		const data = await getAllBlogsForThisUser(username);
		console.log('all blogs loaded', data);
		if (data.success) {
			setBlogs(data.result);
			setRequestState({
				...requestState,
				success: true,
				loading: false,
			});
		} else if (data.error) {
			console.log(data.error);
			setRequestState({
				...requestState,
				error: true,
				errorMessage: data.errorMessage,
				loading: false,
			});
		}
	};
	useEffect(() => {
		loadBlogs();
	}, []);
	const deleteBlog = async (slug) => {
		const response = await removeBlog(slug, token);
		if (response.success) {
			loadBlogs();
			setMessage('blog has been deleted successfully');
		} else if (response.error) {
			console.log(response.errorMessage);
		}
	};
	const deleteConfirm = (slug) => {
		let answer = window.confirm('Are you  sure you want to delete your blog');
		if (answer) {
			deleteBlog(slug);
		}
	};
	const showUpdateButton = (blog) => {
		if (isAuth() && isAuth().role === 0) {
			return (
				<Link href={`/user/blog/updateBlog/${blog.slug}`}>
					<a className="btn btn.small btn-info ml-5">Update</a>
				</Link>
			);
		} else if (isAuth() && isAuth().role === 1) {
			return (
				<Link href={`/admin/crud/${blog.slug}`}>
					<a className="btn btn.small ml-5">update</a>
				</Link>
			);
		}
	};
	const showBlogs = (blogs) => {
		if (blogs.length === 0) {
			return (
				<div className="alert alert-info">
					you have not created Blogs yet may be create one
					<Link href={`/user/blog/new`}>
						<a> Create New Blog</a>
					</Link>
				</div>
			);
		} else {
			return (
				blogs &&
				blogs.map((blog, ind) => {
					return (
						<div key={ind} className="pb-5">
							<h3>{blog.title}</h3>
							<p className="mark">
								written by {blog.postedBy.name} |published on{' '}
								{moment(blog.updatedAt).fromNow()}
							</p>
							<button
								className="btn btn-sm btn-danger"
								onClick={() => {
									deleteConfirm(blog.slug);
								}}
							>
								Delete
							</button>

							{showUpdateButton(blog)}
						</div>
					);
				})
			);
		}
	};
	const showError = () => {
		return (
			<div
				className="alert alert-danger"
				style={{ display: requestState.error ? '' : 'none' }}
			>
				{requestState.errorMessage}
			</div>
		);
	};
	return (
		<React.Fragment>
			<div className="row">
				<div className="col-md-10 offset-md-1">
					{showError()}
					{message && <div className="alert alert-warning">{message}</div>}
					{showBlogs(blogs)}
				</div>
			</div>
		</React.Fragment>
	);
};
export default ManageBlogsComponent;
