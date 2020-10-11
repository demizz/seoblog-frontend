import { useState, useEffect } from 'react';

import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import { getCookie } from '../RequestApi/authRequest';
import { getCategories } from '../RequestApi/categoryRequest';
import { getTags } from '../RequestApi/tagRequest';
import { createBlog } from '../RequestApi/usersRequest';

import { modules, formats } from '../utils/helpers';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import '../node_modules/react-quill/dist/quill.snow.css';
const NewBlog = ({ router }) => {
	console.log({ router });
	const blogFronLS = () => {
		if (typeof window === 'undefined') {
			return null;
		}
		if (localStorage.getItem('blog')) {
			return JSON.parse(localStorage.getItem('blog'));
		} else {
			return null;
		}
	};
	const [formdata] = useState(new FormData());
	const [fileReader] = useState(new FileReader());
	const [imagePreview, setImagePreview] = useState();
	const [body, setBody] = useState(blogFronLS());
	const [title, setTitle] = useState('');
	const [categories, setCategories] = useState([]);

	const [tags, setTags] = useState([]);
	const [categoriesRequestState, setCategoriesRequestState] = useState({
		error: false,
		errorMessage: '',
		success: false,
		loading: false,
		successMessage: '',
	});
	const [tagsRequestState, setTagsRequestState] = useState({
		error: false,
		errorMessage: '',
		success: false,
		loading: false,
		successMessage: '',
	});
	const [newBlogRequestState, setNewBlogRequestState] = useState({
		error: false,
		errorMessage: '',
		success: false,
		loading: false,
		successMessage: '',
	});
	const [checkedCategories, setCheckedCategories] = useState([]);
	const [checkedTags, setCheckedTags] = useState([]);
	let formData;

	useEffect(() => {
		initCategories();
		initTags();
	}, []);

	const initCategories = async () => {
		setCategoriesRequestState({ ...categoriesRequestState, loading: true });
		const response = await getCategories();
		if (response.success) {
			setCategories(response.result);
			setCategoriesRequestState({
				...categoriesRequestState,
				loading: false,
				success: true,
			});
		} else if (response.error) {
			setCategoriesRequestState({
				...categoriesRequestState,
				loading: false,
				error: true,
				errorMessage: response.errorMessage,
			});
		}
	};

	const initTags = async () => {
		const response = await getTags();
		setTagsRequestState({ ...tagsRequestState, loading: true });
		if (response.success) {
			setTags(response.result);
			setTagsRequestState({
				...tagsRequestState,
				loading: false,
				success: true,
			});
		} else if (response.error) {
			setTagsRequestState({
				...tagsRequestState,
				loading: false,
				error: true,
				errorMessage: response.errorMessage,
			});
		}
	};

	const token = getCookie('token');

	const publishBlog = async (e) => {
		e.preventDefault();
		setNewBlogRequestState({ ...newBlogRequestState, loading: true });

		const response = await createBlog(formData, token);
		console.log(response);
		if (response.success) {
			setNewBlogRequestState({
				...newBlogRequestState,
				loading: false,
				success: true,
				successMessage: 'New Blog Create successfully',
			});
			setTimeout(() => {
				Router.push('/');
			}, 3000);

			setBody('');
			setCategories([]);
			setTags([]);
		} else if (response.error) {
			setNewBlogRequestState({
				...newBlogRequestState,
				loading: false,
				error: true,
				errorMessage: response.errorMessage,
			});
			setTimeout(() => {
				setRequestState({
					...requestState,
					loading: false,
					error: false,
					errorMessage: '',
					success: false,
					successMessage: '',
				});
			}, 3000);
		}
	};

	const handleChange = (name) => (event) => {
		const value = name === 'photo' ? event.target.files[0] : event.target.value;
		if (name === 'photo') {
			fileReader.onload = () => {
				setImagePreview(fileReader.result);
			};
			fileReader.readAsDataURL(value);
		}
		formData.set(name, value);
		setTitle(value);
	};

	const handleBody = (e) => {
		console.log(e);
		setBody(e);
		formdata.set('body', e);
		if (typeof window !== undefined) {
			localStorage.setItem('blog', JSON.stringify(e));
		}
	};

	const handleToggleCategories = (item) => () => {
		const index = checkedCategories.indexOf(item);
		const arrayCat = [...checkedCategories];
		console.log(checkedCategories);
		console.log(index);
		if (index === -1) {
			//setCheckedCategories([...checkedCategories,index])

			arrayCat.push(item);
		} else {
			arrayCat.splice(index, 1);
		}
		setCheckedCategories([...arrayCat]);
		formdata.set('categories', arrayCat);
	};

	const handleToggleTags = (item) => () => {
		const index = checkedTags.indexOf(item);
		console.log(index);
		const arrayCat = [...checkedTags];
		if (index === -1) {
			//setcheckedTags([...checkedTags,index])
			arrayCat.push(item);
		} else {
			arrayCat.splice(index, 1);
		}
		setCheckedTags([...arrayCat]);
		console.log(checkedTags);
		formdata.set('tags', arrayCat);
	};

	const showCategories = () => {
		return (
			categories &&
			!categoriesRequestState.loading &&
			categoriesRequestState.success &&
			categories.map((item) => (
				<li key={item._id} className="list-unstyled">
					<input
						type="checkbox"
						onChange={handleToggleCategories(item._id)}
						className="mr-2"
					/>
					<label htmlFor="" className="form-check-label">
						{item.name}
					</label>
				</li>
			))
		);
	};

	const showTags = () => {
		return (
			tags &&
			!tagsRequestState.loading &&
			tagsRequestState.success &&
			tags.map((item) => (
				<li key={item._id} className="list-unstyled">
					<input
						onChange={handleToggleTags(item._id)}
						type="checkbox"
						className="mr-2"
					/>
					<label htmlFor="" className="form-check-label">
						{item.name}
					</label>
				</li>
			))
		);
	};

	const showResponseMessages = () => {
		return (
			<React.Fragment>
				<div
					style={{ display: categoriesRequestState.error ? '' : 'none' }}
					className="alert alert-danger"
				>
					{categoriesRequestState.errorMessage}
				</div>
				<div
					style={{ display: tagsRequestState.error ? '' : 'none' }}
					className="alert alert-danger mt-2"
				>
					{tagsRequestState.errorMessage}
				</div>
				<div
					style={{ display: newBlogRequestState.error ? '' : 'none' }}
					className="alert alert-danger mt-2"
				>
					{newBlogRequestState.errorMessage}
				</div>
				<div
					className="alert alert-success"
					style={{ display: newBlogRequestState.success ? '' : 'none' }}
				>
					{newBlogRequestState.successMessage}
				</div>
			</React.Fragment>
		);
	};

	const createBlogForm = () => {
		return (
			<form action="" onSubmit={publishBlog}>
				<div className="form-group">
					<label htmlFor="" className="text-muted">
						Title
					</label>
					<input
						type="text"
						onChange={handleChange('title')}
						className="form-control"
						value={title}
					/>
				</div>
				<div className="form-goup">
					<ReactQuill
						modules={modules}
						formats={formats}
						value={body}
						placeholder="tape some thing amazing"
						onChange={handleBody}
					/>
				</div>
				<div>
					<button type="submit" className="btn btn-primary mt-4">
						Publish
					</button>
				</div>
			</form>
		);
	};
	return (
		<div className="container-fluid pb-5">
			<div className="row">
				<h2>New Blog Components</h2>
				<div className="col-md-8">
					<div>{showResponseMessages()}</div>
					{createBlogForm()}
				</div>
				<div className="col-md-4 text-center">
					<div className="form-group pb-2">
						{!imagePreview && (
							<React.Fragment>
								<h5>Featured image</h5>
								<hr />
								<small className="text-muted">Max size :1MB</small>
								<label htmlFor="" className="btn btn-outline-info">
									upload image
									<input
										hidden
										onChange={handleChange('photo')}
										type="file"
										name=""
										accept="image/*"
										id=""
									/>
								</label>
							</React.Fragment>
						)}
						{imagePreview && (
							<div style={{ maxHeight: '300px', maxWidth: '300px' }}>
								<img src={imagePreview} alt="feature image" />
							</div>
						)}
					</div>
					<div>
						<h5>Categories</h5>

						<hr />
						<ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>
							{showCategories()}
						</ul>
					</div>
					<div>
						<h5>Tags</h5>
						<hr />
						<ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>
							{showTags()}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default withRouter(NewBlog);
