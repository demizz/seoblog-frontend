import { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { isAuth, getCookie } from '../../RequestApi/authRequest';
import {
	createTag,
	deleteOneTag,
	getOneTag,
	getTags,
} from '../../RequestApi/tagRequest';

const Tag = () => {
	const showTags = () => {
		if (Tags) {
			return Tags.map((item, index) => {
				return (
					<button
						onDoubleClick={() => deleteThisTag(item.slug)}
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
	const [TagName, setTagName] = useState('');
	const [loading, setLoading] = useState(false);
	const [Tags, setTags] = useState(null);
	const [requestState, setRequestState] = useState({
		error: null,
		errorMessage: '',
		success: false,
		result: null,
	});
	const [reload, setReload] = useState(false);
	const token = getCookie('token');
	useEffect(() => {
		fetchAllTags();
	}, [reload]);
	const fetchAllTags = async () => {
		const data = await getTags();
		console.log(data);
		if (data.success) {
			setTags(data.result);
		}
	};
	const deleteThisTag = async (item) => {
		const answer = window.confirm('Are you sure you want to delete this Tag');
		if (answer) {
			const data = await deleteOneTag(item, token);
			if (data.success) {
				setReload(true);
			} else {
				console.log(data.errorMessage);
			}
		}
	};
	const submitHandler = async (e) => {
		e.preventDefault();
		const data = await createTag(TagName, token);

		console.log(data);
	};
	const newTag = () => {
		return (
			<form action="" onSubmit={submitHandler}>
				<div className="form-group">
					<label htmlFor="" className="text-muted">
						Name
					</label>
					<input
						type="text"
						onChange={(e) => setTagName(e.target.value)}
						value={TagName}
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
			{newTag()}
			<div>{showTags()}</div>
		</React.Fragment>
	);
};
export default Tag;
