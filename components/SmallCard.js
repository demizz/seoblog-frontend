import moment from 'moment';
import renderHtml from 'react-render-html';
import Link from 'next/link';
import { API } from '../config';
const SmallCard = ({ blog }) => {
	return (
		<div className="card">
			<div className="row" style={{display:'flex' ,alignItems:'center'}}>
				<div className="col-md-5">

			
				<Link href={`/blogs/${blog.slug}`} style={{cursor:'pointer'}}>
					<a>
						<img
							style={{ maxHeight: 'auto', width: 'auto' }}
							src={`${API}/blogs/photo/${blog.slug}`}
							alt={blog.title}
							className="img img-fluid"
						/>
					</a>
				</Link>
		
				</div>
				<div className="col-md-7">

			<div className="card-body">
				
					<Link href={`/blogs/${blog.slug}`} style={{cursor:'pointer'}}>
						<a className="card-title h4 text-primary" style={{textTransform:'capitalize'}}><strong className=" text.danger" >Title :</strong>{blog.title}</a>
					</Link>
					<hr/>
					<p className="card-text">{renderHtml(blog.body.substring(0,100))}</p>
				
		
					<hr/>
			
				<div style={{fontStyle:'italic'}}>
					posted {moment(blog.updatedAt).fromNow()} by &nbsp;
					<Link href={'/'} style={{cursor:'pointer'}}>
						<a className="h3 text-info">{blog.postedBy.name}</a>
					</Link>
				</div>
			
				</div>
				</div>
			</div>
		</div>
	);
};
export default SmallCard;
