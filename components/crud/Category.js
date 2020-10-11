import { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { isAuth, getCookie } from '../../RequestApi/authRequest';
import {
	createCategory,
	getCategories,
	getOneCategory,
	deleteOneCategory,
} from '../../RequestApi/categoryRequest';

const Category = () => {
	const showCategories = () => {
		if (categories) {
			return categories.map((item, index) => {
				return (
					<button
						onDoubleClick={() => deleteThisCategory(item.slug)}
						key={item._id}
						className="btn btn-outline-primary mr-1 ml-1 mt-3 "
					>
						{item.name}
					</button>
				);
			});
		} else {
			return null;
		}
	};
	const [categoryName, setCategoryName] = useState('');
	const [loading, setLoading] = useState(false);
	const [categories, setCategories] = useState(null);
	const [requestState, setRequestState] = useState({
		error: null,
		errorMessage: '',
		success: false,
		result: null,
	});
	const [reload, setReload] = useState(false);
	const token = getCookie('token');
	useEffect(() => {
		fetchAllCategories();
	}, [reload]);
	const fetchAllCategories = async () => {
		const data = await getCategories();
		console.log(data);
		if (data.success) {
			setCategories(data.result);
		}
	};
	const deleteThisCategory = async (item) => {
		const answer = window.confirm(
			'Are you sure you want to delete this category'
		);
		if (answer) {
			const data = await deleteOneCategory(item, token);
			if (data.success) {
				setReload(true);
			} else {
				console.log(data.errorMessage);
			}
		}
	};
	const submitHandler = async (e) => {
		e.preventDefault();
		const data = await createCategory(categoryName, token);

		console.log(data);
	};
	const newCategory = () => {
		return (
			<form action="" onSubmit={submitHandler}>
				<div className="form-group">
					<label htmlFor="" className="text-muted">
						Name
					</label>
					<input
						type="text"
						onChange={(e) => setCategoryName(e.target.value)}
						value={categoryName}
						className="form-control"
						required
					/>
				</div>
				<button type="submit" className="btn btn-primary">
					Create
				</button>
			</form>
		);
	};
	return (
		<React.Fragment>
			{newCategory()}
			<div>{showCategories()}</div>
		</React.Fragment>
	);
};
export default Category;
