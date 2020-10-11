import Link from 'next/link';
import { useState, useEffect } from 'react';
import router from 'next/router';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import { getCookie, isAuth } from '../../RequestApi/authRequest';
import { getCategories } from '../../RequestApi/categoryRequest';
import { getTags } from '../../RequestApi/tagRequest';
import { createBlog } from '../../RequestApi/blogRequest';
import { modules, formats } from '../../utils/helpers';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import '../../node_modules/react-quill/dist/quill.snow.css';
const CreateBlog = ({ router }) => {
	const blogFronLS = () => {
		if (typeof window === 'undefined') {
			return false;
		}
		if (localStorage.getItem('blog')) {
			return JSON.parse(localStorage.getItem('blog'));
		} else {
			return false;
		}
	};
	const [body, setBody] = useState(blogFronLS());
	const [categories, setCategories] = useState([]);
	const [tags, setTags] = useState([]);
	const [checkedCategories, setCheckedCategories] = useState([]);
	const [checkedTags, setCheckedTags] = useState([]);
	const [values, setValues] = useState({
		error: '',
		sizeError: '',
		success: '',
		formData: '',
		title: '',
		hidePublishButton: false,
	});
	useEffect(() => {
		setValues({ ...values, formData: new FormData() });
		initCategories();
		initTags();
	}, [router]);
	const initCategories = async () => {
		const data = await getCategories();
		if (data.success) {
			setCategories(data.result);
		} else if (data.error) {
			setValues({ ...values, error: data.errorMessage });
		}
	};
	const initTags = async () => {
		const data = await getTags();
		if (data.success) {
			setTags(data.result);
		} else if (data.error) {
			setValues({ ...values, error: data.errorMessage });
		}
	};
	const {
		error,
		sizeError,
		success,
		formData,
		title,
		hidePublishButton,
	} = values;
	const token = getCookie('token');
	const publishBlog = async (e) => {
		e.preventDefault();
		console.log('submit');
		const data = await createBlog(formData, token);
		console.log(data);
		if (data.success) {
			setValutes({
				...values,
				title: '',
				error: '',
				succss: `a new blog titled ${data.result.title}is created`,
			});
			setBody('');
			setCategories([]);
			setTags([]);
		} else if (data.error) {
			setValues({ ...values, error: data.errorMessage });
		}
	};
	const handleChange = (name) => (event) => {
		const value = name === 'photo' ? event.target.files[0] : event.target.value;
		formData.set(name, value);
		setValues({ ...values, [name]: event.target.value, formData, error: ' ' });
	};
	const handleBody = (e) => {
		console.log(e);
		setBody(e);
		formData.set('body', e);
		if (typeof window !== undefined) {
			localStorage.setItem('blog', JSON.stringify(e));
		}
	};
	const handleToggleCategories = (item) => () => {
		setValues({ ...values, error: '' });
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
		formData.set('categories', arrayCat);
	};
	const handleToggleTags = (item) => () => {
		setValues({ ...values, error: '' });
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
		formData.set('tags', arrayCat);
	};
	const showCategories = () => {
		return (
			categories &&
			categories.map((item, key) => (
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
			tags.map((item, key) => (
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
	const showError = () => {
		return (
			<div
				style={{ display: error ? '' : none }}
				className="alert alert-danger"
			>
				{error}
			</div>
		);
	};
	const showSuccess = () => {
		return (
			<div
				className="alert alert-success"
				style={{ display: success ? '' : 'none' }}
			>
				{success}
			</div>
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
					<button type="submit" className="btn btn-primary">
						Publish
					</button>
				</div>
			</form>
		);
	};
	return (
		<div className="container-fluid pb-5">
			<div className="row">
				<div className="col-md-8">
					<h2>Create blog form</h2>
					{createBlogForm()}
					<div>
						{showError()}
						{showSuccess()}
					</div>
				</div>
				<div className="col-md-4">
					<div className="form-group pb-2">
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
export default withRouter(CreateBlog);
