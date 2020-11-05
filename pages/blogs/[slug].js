import Head from 'next/head';
import Link from 'next/link';
import moment from 'moment';
import RenderHtml from 'react-render-html';
import { withRouter } from 'next/router';
import Layout from '../../components/Layout';
import SmallCard from '../../components/SmallCard';
import { useState, useEffect } from 'react';
import { getOneBlog, listRelated } from '../../RequestApi/blogRequest';
import { API, DOMAIN, APP_NAME } from '../../config';
const SingleBlog = ({ router, blog }) => {
	const [relatedBlog, setRelatedBlog] = useState([]);

	const loadRelated = async (blog) => {
		console.log(blog);
		const data = await listRelated(blog);
		if (data.error) {
			console.log(data.errorMessage);
		} else if (data.success) {
			setRelatedBlog(data.result);
			console.log(data.result);
		}
	};

	useEffect(() => {
		loadRelated(blog);
	}, []);
	const showBlogCategories = (blog) => {
		return blog.categories.map((item, i) => {
			return (
				<Link href={`/categories/${item.slug}`}>
					<a className="btn btn-primary mr-1 ml-1 mt-3">{item.name}</a>
				</Link>
			);
		});
	};
	const showBlogTags = (blog) => {
		return blog.tags.map((item, i) => {
			return (
				<Link href={`/tags/${item.slug}`}>
					<a className="btn btn-outline-primary mr-1 ml-1 mt-3">{item.name}</a>
				</Link>
			);
		});
	};
	const showRelatedBlog = () => {
		return relatedBlog.map((blog, i) => {
			return (
				<div key={i} className="col-md-4">
					<article>
						<SmallCard blog={blog} />
					</article>
				</div>
			);
		});
	};
	return (
		<React.Fragment>
			<Layout>
				<main>
					<article>
						<div className="container-fluid">
							{/* {JSON.stringify(blog)} */}
							<section>
								<div className="row" style={{ marginTop: '-30px' }}>
									<img
										src={`${API}/blogs/photo/${blog.slug}`}
										alt={blog.slug}
										className="img img-fluid featured-image"
									/>
								</div>
							</section>
							<section>
								<p className="lead mt-3  mark">
									<Link href={`/profile/${blog.postedBy.username}`}>
										<a href="">
											written by {blog.postedBy.username}|published{' '}
										</a>
									</Link>
									{moment(blog.updatedAt).fromNow()}
								</p>
								<div className="pb-3">
									{showBlogCategories(blog)}
									{showBlogTags(blog)}
								</div>
							</section>
						</div>
						<div className="container">
							<section>
								<div className="col-md-12 lead">{RenderHtml(blog.body)}</div>
							</section>
						</div>
						<div className="container pb-5">
							<h4 className="text-center pb-5 pb-3 h2">Related blogs</h4>
							<div className="row">{showRelatedBlog(relatedBlog)}</div>
						</div>
						<div className="container pb-5"></div>
					</article>
				</main>
			</Layout>
		</React.Fragment>
	);
};

SingleBlog.getInitialProps = async ({ query }) => {
	console.log(query);
	let data;

	const response = await getOneBlog(query.slug);
	if (response.error) {
		data = {};
	} else if (response.success) {
		data = { blog: response.result };
	}
	return data;
};

export default withRouter(SingleBlog);
