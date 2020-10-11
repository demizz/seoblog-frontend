import moment from 'moment';
import renderHtml from 'react-render-html';
import Link from 'next/link';
import { API } from '../config';
const SmallCard = ({ blog }) => {
	return (
		<div className="card">
			<section>
				<Link href={`/blogs/${blog.slug}`}>
					<a>
						<img
							style={{ maxHeight: '150px', width: 'auto' }}
							src={`${API}/blogs/photo/${blog.slug}`}
							alt={blog.title}
							className="img img-fluid"
						/>
					</a>
				</Link>
			</section>
			<div className="card-body">
				<section>
					<Link href={`/blogs/${blog.slug}`}>
						<h5 className="card-title">{blog.title}</h5>
					</Link>
					<p className="card-text">{}</p>
				</section>
			</div>

			<div className="card-body">
				<Link href={`/blogs/${blog.slug}`}>
					<a className="btn btn-primary pt-2">Read More</a>
				</Link>
				<div>
					posted {moment(blog.updatedAt).fromNow()} by
					<Link href={'/'}>
						<a className="float-right">{blog.postedBy.username}</a>
					</Link>
				</div>
			</div>
		</div>
	);
};
export default SmallCard;
