import moment from 'moment';
import renderHtml from 'react-render-html';
import Link from 'next/link';
import { API } from '../config';
const Card = ({ blog ,categories,tags}) => {
	const showBlogCategories = (categories) => {
		return categories.map((item, i) => {
			return (
				<Link href={`/categories/${item.slug}`}>
					<a className="btn btn-primary mr-1 ml-1 mt-3">{item.name}</a>
				</Link>
			);
		});
	};
	const showBlogTags = (tags) => {
		return tags.map((item, i) => {
			return (
				<Link href={`/tags/${item.slug}`}>
					<a className="btn btn-outline-primary mr-1 ml-1 mt-3">{item.name}</a>
				</Link>
			);
		});
	};
	return (
		<div className="lead">
			<header>
				<Link href={`/blogs/${blog.slug}`}>
					<a>
						<h5  >{blog.title}</h5>
					</a>
				</Link>
			</header>
			<section>
				<p className="mark ml-1 pt-2 pb-2">
					written by {blog.postedBy.name} | published{' '}
					{moment(blog.updatedAt).fromNow()}
				</p>
			</section>
			<section>
				{/* {showBlogCategories(categories)}
				{showBlogTags(tags)} */}
			</section>
			<div className="row">
				<div className="col-md-5">
					<section>
						<img
							src={`${API}/blogs/photo/${blog.slug}`}
							style={{ maxHeight: '150px', width: 'auto' }}
							alt={blog.title}
							className="img img-fluid"
						/>
					</section>
				</div>
				<div className="col-md-7">
					<section>
						{<div className="pb-3">{renderHtml(blog.body)}</div> }
						<Link href={`/blogs/${blog.slug}`}>
							<a href="" className="btn btn-primary pt-2">
								Read More
							</a>
						</Link>
					</section>
				</div>
			</div>
		</div>
	);
};
export default Card;
