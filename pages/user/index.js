
import Layout from '../../components/Layout';
import Private from '../../components/authentication/Private';
import Link from 'next/link';
import MyBlogs from '../../components/MyBlogs';
const UserIndex = ({response}) => {
	return (
		<Layout>
			<Private>
				<div className="container">
					<div className="row">
						<div className="col-md-4 pt-4 text-center">
							<h4>User Dashboard</h4>

							<ul className="list-group text-center">
								<li className="list-group-item">
									<Link href="/user/blog/new">
										<a>create Blog</a>
									</Link>
								</li>
								<li className="list-group-item">
									<Link href="/user/blog/manageBlogs">
										<a>Manage Blogs</a>
									</Link>
								</li>
								<li className="list-group-item">
									<Link href="/user/update">
										<a>update Profile</a>
									</Link>
								</li>
							</ul>
						</div>
						<div className="col-md-8 pt-4 text-center">
							<h4>My Blogs</h4>
							<MyBlogs response={response}/>
						</div>
					</div>
				</div>
			</Private>
		</Layout>
	);
};
// export async function getStaticProps(){
//     const username=isAuth().username;
//     console.log({username});
//     const token=getCookie('token');
//     console.log({token})
//     console.log({query})
    
//     const response=await getAllBlogsForThisUser(username,token);
    

//     return {
//         props:{
//             response
//         }
//     }
// }
export default UserIndex;
