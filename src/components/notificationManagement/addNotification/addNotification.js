import React, { useState } from 'react';
import AddForm from './addForm';
import { addNotification } from '../../../api';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

const AddNotification = () => {
	const [type, setType] = useState();
	const [title, setTitle] = useState();
	const [description, setDescription] = useState();
	const [error, setError] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);
	const history = useHistory();
	const token = useSelector((state) => state.auth.isSignedIn);

	const handleSubmit = (e) => {
		e.preventDefault();
		const notificationDetails = {
			title: title,
			type: type,
			description: description,
		};

		addNotification(token, notificationDetails)
			.then((resp) => {
				setError(null);
				setSuccessMsg('Notification added successfully');
				setTimeout(() => {
					history.push('/notification');
				}, 1200);
			})
			.catch((error) => {
				let updatedError = error.charAt(0).toUpperCase() + error.slice(1);
				setError(updatedError);
			});
	};
	return (
		<AddForm {...{ handleSubmit, setType, setTitle, setDescription, error, successMsg }} />
	);
};

export default AddNotification;
