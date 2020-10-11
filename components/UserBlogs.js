



import Link from 'next/link';

import Card from '../components/Card';

import { useState ,useEffect} from 'react';
import { listBlogsWithCategoriesAndTags } from '../RequestApi/blogRequest';

const UserBlogs = (
	) => {
	const [limit, setLimit] = useState();
	const [skip, setSkip] = useState(0);
	const [size, setSize] = useState();
	const [loadedBlogs, setLoadedBlogs] = useState([]);
	const [requestState, setRequestState] = useState({
		error: false,
		errorMessage: '',
		success: false,
		successMessage: '',
		loading: false,
	});
	const [blogs,setBlogs]=useState([])
	const[categories,setCategories]=useState([])
	const [tags,setTags]=useState([]);
	const [totalBlogs, setTotalBlogs] = useState()
	const [blogsLimit, setBlogsLimit] = useState()
	const [blogsSkip, setBlogsSkip] = useState()
	const {loading,error,errorMessage,success,successMessage}=requestState

	useEffect(()=>{
		getdata()
	},[])


	const getdata=async()=>{
			let skip = 0;
	let limit = 2;

	setRequestState({...requestState,loading:true,})
	const response = await listBlogsWithCategoriesAndTags(skip, limit);
	console.log({response});
	if (response.error) {
		setRequestState({...requestState,loading:false,error:true,errorMessage:response.errorMessage})
		
		
	} else if (response.success) {
		setRequestState({...requestState,loading:false,success:true})
		
			setBlogs( response.result.blogs)
			setCategories(response.result.categories)
			setTags(response.result.tags)
			setTotalBlogs (response.result.size)
			setBlogsLimit(limit)
			setBlogsSkip( skip)
	
	}

	}
	const loadMore = async () => {
		let toSkip = skip + limit;
		setRequestState({ ...requestState, loading: true });
		const response = await listBlogsWithCategoriesAndTags(toSkip, limit);
		if (response.error) {
			console.log(response.errorMessage);
			setRequestState({
				...requestState,
				loading: false,
				error: true,
				errorMessage: response.errorMessage,
			});
		} else if (response.success) {
			setLoadedBlogs([...loadedBlogs, ...response.result.blogs]);
			setSize(response.result.size);
			setSkip(toSkip);
			setRequestState({ ...requestState, loading: false, success: true });
		}
	};
	const loadMoreButton = () => {
		return (
			size > 0 &&
			size >= limit && (
				<button onClick={loadMore} className="btn btn-outline-primary btn-lg">
					load More
				</button>
			)
		);
	};
	const showAllLoadedBlogs = () => {
		return loadedBlogs.map((blog, i) => {
			<article key={i}>
				<Card blog={blog} />
			</article>;
		});
	};
	const showAllBlogs = () => {
		return blogs && blogs.map((blog, i) => {
			return (
				<article key={i}>
					<Card blog={blog} categories={categories} tags={tags}/>
					<hr />
				</article>
			);
		});
	};
	const showAllCategories = () => {
		return categories && categories.map((item, i) => {
			return (
				<Link key={i} href={`/categories/${item.slug}`}>
					<div className="btn btn-primary mr-1 ml-1 mt-3">{item.name}</div>
				</Link>
			);
		});
	};
	const showAllTags = () => {
		return tags && tags.map((item, i) => {
			return (
				<Link key={i} href={`/tags/${item.slug}`}>
					<div className="btn btn-outline-primary mr-1 ml-1 mt-3">
						{item.name}
					</div>
				</Link>
			);
		});
	};
	const showResponseMessages=()=>{
		return (
			<div className="alert alert-info" style={{display:loading?'':'none'}}><h3>Loading ....
				</h3></div>
		)
	}
	return (
		
				<main>
					<div className="container-fluid">
						<header>
							<div className="col-md-12 pt-3">
								<h1 className="display-4 font-weight-bold text-center">
									Programming blogs and tutorial
								</h1>
							</div>
						</header>
							{showResponseMessages()}
							{!loading && success && (
								<React.Fragment>
							<section>
								<div className="pb-5 text-center">
									
									{showAllCategories()}
									<br />
									{showAllTags()}
								</div>
							</section>
					
						<h3> All blogs</h3>

						
						{showAllBlogs()}
						
						</React.Fragment>
					)}
					</div>

					<div className="text-center pt-5">{loadMoreButton()}</div>
				</main>
		
	);
};

export default UserBlogs;
