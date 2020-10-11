import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import { getCookie, isAuth } from '../../RequestApi/authRequest';
import { getCategories } from '../../RequestApi/categoryRequest';
import { getTags } from '../../RequestApi/tagRequest';
import {
	createBlog,
	getOneBlog,
	updateBlog,
} from '../../RequestApi/blogRequest';
import { API } from '../../config';
import { modules, formats } from '../../utils/helpers';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import '../../node_modules/react-quill/dist/quill.snow.css';
const BlogUpdate = ({ router }) => {
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');
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
		initBlog();
		initTags();
		initCategories();
	}, [router]);
	const { error, success, formData } = values;
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
	const initBlog = async () => {
		if (router.query.slug) {
			const slug = router.query.slug;
			console.log(slug);
			const response = await getOneBlog(slug);
			if (response.error) {
				console.log('error', response.errorMessage);
			} else if (response.success) {
				setTitle(response.result.title);
				setBody(response.result.body);
				setCategoriesArray(response.result.categories);
				setTagsArray(response.result.tags);
				console.log('result', response.result);
			}
		}
	};
	const setCategoriesArray = (categories) => {
		let ca = [];
		categories.map((c, i) => {
			ca.push(c._id);
		});
		setCheckedCategories(ca);
	};
	const setTagsArray = (tags) => {
		let ta = [];
		tags.map((t, i) => {
			ta.push(t._id);
		});
		setCheckedTags(ta);
	};
	const handleChange = (name) => (e) => {
		const value = name === 'photo' ? e.target.files[0] : e.target.value;
		setTitle(value);
		formData.set(name, value);
		setValues({ ...values, [name]: value, formData, error: '' });
	};
	const UpdateBlogForm = () => {
		return (
			<form action="" onSubmit={editBlog}>
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
	const handleBody = (e) => {
		setBody(e);
		formData.set('body', e);
	};
	const token = getCookie('token');
	const editBlog = async (e) => {
		e.preventDefault();
		const response = updateBlog(formData, token, router.query.slug);
		console.log(response);
		console.log('updated Blog');
		if (response.errror) {
			setValues({ ...values, error: response.errorMessage });
		} else if (response.success) {
			setValuse({
				...values,
				success: `Blog titled ${reponse.result.title} is successfully updated`,
			});
			if (isAuth() && isAuth().role === 1) {
				Router.replace(`/admin/`);
			} else if (isAuth() && isAuth().role !== 1) {
				Router.replace(`/user/`);
			}
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
						checked={findOutCategory(item._id)}
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
						checkd={findOutTags(item._id)}
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
	const findOutCategory = (item) => {
		const result = checkedCategories.indexOf(item);
		if (result !== -1) {
			return true;
		} else {
			return false;
		}
	};
	const findOutTags = (item) => {
		const result = checkedTags.indexOf(item);
		if (result !== -1) {
			return true;
		} else {
			return false;
		}
	};
	const showError = () => {
		return (
			<div
				className="alert alert-danger"
				style={{ display: error ? '' : 'none' }}
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
				The blog is successfully updated
			</div>
		);
	};
	return (
		<div className="container-fluid pb-5">
			<div className="row">
				<div className="col-md-8">
					<h2>Update blog form</h2>

					{UpdateBlogForm()}

					<div className="pt-3">
						{showError()}
						{showSuccess()}
					</div>
					<div>
						{body && (
							<img
								style={{ width: '100%' }}
								src={`${API}/blogs/photo/${router.query.slug}`}
								alt={title}
							/>
						)}
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
		</div>
	);
};
export default withRouter(BlogUpdate);
