import Link from 'next/link';
import renderHtml from 'react-render-html';
import { useState, useEffect } from 'react';
import { searchList } from '../RequestApi/blogRequest';
const Search = () => {
	const [search, setSearch] = useState('');
	const [result, setResult] = useState([]);
	const [message, setMessage] = useState('');
	const [searched, setSearched] = useState(false);
	const searchSubmit = async (e) => {
		e.preventDefault();
		const response = await searchList({ search });
		if (response.success) {
			console.log(response.result);
			setResult(response.result);
			setSearched(true);
			setSearch('');
			setMessage(`${response.result.length} blogs found`);
		} else if (response.error) {
			console.log('error', response.errorMessage);
			setMessage(response.errorMessage);
		}
	};
	const handleChange = (e) => {
		setSearch(e.target.value);
		setSearched(false);
		setResult([]);
	};
	const searchedBlog = () => {
		if (result.length > 0) {
			return (
				<div className="jumbotron bg-white">
					{message && <p className="pt-4 text-muted font-italic">{message}</p>}
					{result.map((blog, index) => {
						return (
							<div key={index}>
								<Link href={`/blogs/${blog.slug}`}>
									<a className="text-primary"> {blog.title}</a>
								</Link>
							</div>
						);
					})}
				</div>
			);
		}
	};
	const searchForm = () => {
		return (
			<form onSubmit={searchSubmit}>
				<div className="row">
					<div className="col-md-8">
						<input
							type="text"
							placeholder="Search blogs"
							onChange={handleChange}
							value={search}
							className="form-control"
						/>
					</div>
					<div className="col-md-4">
						<button className="btn btn-block btn-outline-primary" type="submit">
							Search
						</button>
					</div>
				</div>
			</form>
		);
	};
	return (
		<div className="container-fluid">
			<div className="pt-3 pb-5">{searchForm()}</div>
			{searched && (
				<div style={{ marginTop: '-120px', marginBotton: '-80px' }}>
					{searchedBlog()}
				</div>
			)}
		</div>
	);
};
export default Search;
