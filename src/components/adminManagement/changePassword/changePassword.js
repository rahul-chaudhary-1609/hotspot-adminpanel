import React, { useState } from 'react';
import { updateAdminPassword, logout } from '../../../api';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import PasswordField from 'material-ui-password-field';
import '../../../css/disableField.css';

const ChangePassword = () => {
	const token = useSelector((state) => state.auth.isSignedIn);
	const history = useHistory();

	const dispatch = useDispatch();

	const [data, setData] = useState({
		old_password: '',
		new_password: '',
		confirm_password: '',
	});
	const [error, setError] = useState(null);
	const [successMsg, setSuccessMsg] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		let adminData = {
			old_password: data.old_password,
			new_password: data.new_password,
		};
		if (data.new_password === data.confirm_password) {
			try {
				const res = await updateAdminPassword(token, adminData);
				if (res.status == 200) {
					setSuccessMsg('Password updated sucessfully');
					setError(null);
					setTimeout(() => {
						logout(token)
							.then((res) => {
								dispatch({
									type: 'SIGN_OUT',
									payload: null,
								});
								history.push('/login');
							})
							.catch((error) => {
								setError(error);
							});
					}, 1200);
				}
			} catch (error) {
				setError(error);
			}
		} else {
			setError('The password and confirmation password do not match');
		}
	};

	const handleInputChange = (e) => {
		let updatedData = { ...data };
		updatedData[e.target.id] = e.target.value;
		setData(updatedData);
	};
	return (
		<>
			<div className='main-content pb-16 md:pb-5 flex-1 pt-20 px-2'>
				<div>
					<div style={{ marginLeft: '1rem', fontSize: '2rem' }}>
						Change Password
					</div>
					<div style={{ marginLeft: '20px', marginTop: '20px' }}>
						<button
							style={{ height: '3rem' }}
							onClick={() => history.push('/profile')}
							className='shadow bg-blue-500 ml-3 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'>
							Back
						</button>
						<button
							style={{ height: '3rem' }}
							form='myForm'
							type='submit'
							className='shadow bg-red-500 ml-3 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
							// value="Save"
						>
							Update
						</button>
					</div>

					<br />
					{error && (
						<p
							style={{
								color: 'red',
								fontSize: '20px',
								textAlign: 'center',
								width: '100%',
								marginTop: '10px',
							}}>
							{error}
						</p>
					)}
					{successMsg && (
						<div
							style={{
								backgroundColor: '#9ACD32',
								padding: '10px',
								width: 'fit-content',
								marginLeft: 'auto',
								marginRight: 'auto',
								marginTop: '12px',
							}}>
							{successMsg}
						</div>
					)}
					<br />
					<form
						id='myForm'
						style={{
							backgroundColor: 'lightgrey',
							padding: '50px',
							marginTop: '30px',
							marginLeft: '30px',
							marginRight: '30px',
						}}
						onSubmit={handleSubmit}
						className=' max-w-full text-base text-gray-200'>
						<PasswordField
							style={{ marginLeft: '30%' }}
							id='old_password'
							required
							placeholder='Enter Old password'
							onChange={handleInputChange}
							className='appearance-none  MuiInput-underline:before block w-1/2 bg-gray-100 bg-100 border  rounded-full py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200'
						/>
						<PasswordField
							style={{ marginLeft: '30%' }}
							id='new_password'
							required
							placeholder='Enter New password'
							onChange={handleInputChange}
							className='appearance-none  MuiInput-underline:before block w-1/2 bg-gray-100 bg-100 border  rounded-full py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200'
						/>
						<PasswordField
							style={{ marginLeft: '30%' }}
							id='confirm_password'
							required
							placeholder='Confirm New password'
							onChange={handleInputChange}
							className='appearance-none  MuiInput-underline:before block w-1/2 bg-gray-100 bg-100 border  rounded-full py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200'
						/>
					</form>
				</div>
			</div>
		</>
	);
};

export default ChangePassword;
