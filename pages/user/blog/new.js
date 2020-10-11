import {useState,useEffect} from 'react';
import Layout from '../../../components/Layout';
import Private from '../../../components/authentication/Private';
import {useRouter} from 'next/router'

import { getCookie } from '../../../RequestApi/authRequest';
import { getCategories } from '../../../RequestApi/categoryRequest';
import { getTags } from '../../../RequestApi/tagRequest';
import { createBlog } from '../../../RequestApi/usersRequest';

import { modules, formats } from '../../../utils/helpers';
import ReactQuill from 'react-quill';


const create=()=>{


    const blogFronLS = () => {
		
		if (localStorage.getItem('blog')) {
            return JSON.parse(localStorage.getItem('blog'));
            
		} else {
			return '';
		}
	};


	const Router=useRouter();
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
    const token = getCookie('token');
    formdata.set('body', body);
    
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
    const handleChange = (name) => (event) => {
		const value = name === 'photo' ? event.target.files[0] : event.target.value;
		if (name === 'photo') {
			fileReader.onload = () => {
				setImagePreview(fileReader.result);
			};
			fileReader.readAsDataURL(value);
		}
        formdata.set(name, value);
        if(name==="title"){

            setTitle(event.target.value);
        }
	};

	const handleBody = (e) => {
		console.log(e);
		setBody(e);
		formdata.set('body', e);
		
			localStorage.setItem('blog', JSON.stringify(e));
		
	};
    


    const publishBlog = async (e) => {
		e.preventDefault();
		setNewBlogRequestState({ ...newBlogRequestState, loading: true });

		const response = await createBlog(formdata, token);
		console.log(response);
		if (response.success) {
			setNewBlogRequestState({
				...newBlogRequestState,
				loading: false,
				success: true,
				successMessage: 'New Blog Create successfully',
			});
			localStorage.setItem('body','')
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
				setNewBlogRequestState({
					...newBlogRequestState,
					loading: false,
					error: false,
					errorMessage: '',
					success: false,
					successMessage: '',
				});
			}, 3000);
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
			categories.map((item, i) => (
				<li key={i} className="list-unstyled">
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
			tags.map((item, i) => (
				<li key={i} className="list-unstyled">
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
				<div
					className="alert alert-info"
					style={{ display: newBlogRequestState.loading ? '' : 'none' }}
				>
					<h3>Loading ...</h3>
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
    <Layout>
        <Private>

        <h2 className="text-center">create New Blog</h2>
        <div className="container">
            {/* {JSON.stringify(categories)}
				{JSON.stringify(tags)}
				{JSON.stringify(token)} */}

				
							<div>{showResponseMessages()}</div>
					<div className="row">
						
                            {!newBlogRequestState.loading && !newBlogRequestState.success && !newBlogRequestState.error &&(
                                <React.Fragment>


                                <div className="col-md-7">
							{createBlogForm()}
						</div>
						<div className="col-md-5 text-center">
							<div className="form-group pb-2 text-center">
								{!imagePreview && (
                                    <React.Fragment>
										<h5>Featured image</h5>
										<hr />
                                        <p>

										<small className="text-muted">Max size :1MB</small>
                                        </p>
										<label htmlFor="blogPhoto" className="btn btn-outline-info">
											<input
												hidden
												onChange={handleChange('photo')}
												type="file"
												name=""
												accept="image/*"
												id="blogPhoto"
                                                />
                                                Upload image
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
                    </React.Fragment>
                    )}
					</div>
				</div>
                
        </Private>
    </Layout>
)
}
export default create;