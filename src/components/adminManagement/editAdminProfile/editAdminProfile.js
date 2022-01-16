import React, { useState } from 'react';
import { getAdminProfile, uploadImage, editAdminProfile } from '../../../api';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Loader from "../../../globalComponent/layout/loader";

const EditAdminProfile = () => {
	const token = useSelector((state) => state.auth.isSignedIn);
	const history = useHistory();
	const dispatch = useDispatch();

	const adminDetails = useSelector((state) => state.auth.adminData);

	const [data, setData] = useState({
		name: adminDetails.name,
		phone: adminDetails.phone,
		email: adminDetails.email,
		profile_picture_url: adminDetails.profile_picture_url,
	});

	const [error, setError] = useState(null);
	const [successMsg, setSuccessMsg] = useState(null);
	const [loader,setLoader]=useState(false);


	const handleAdminDataUpdate = () => {
		setLoader(true);
		getAdminProfile(token)
			.then((res) => {
				setLoader(false)
				dispatch({
					type: 'ADMIN_DATA',
					payload: res,
				});
			})
			.catch((error) => {
				setLoader(false)
				console.log(error);
			});
	};
	const handleProfileChange = async (e) => {
		setLoader(true)
		console.log("e.target.files[0]",e.target.files[0])
		let payload = {
			file: e.target.files[0],
			folderName: 'other',
			mimeType:e.target.files[0].type,
		};

		try {
			const res = await uploadImage(token, payload);
			if (res.status == 200) {
				setLoader(false);
				let updatedData = { ...data };
				updatedData['profile_picture_url'] = res.image_url;
				setData(updatedData);
			}else{
				setLoader(false);
			}
		} catch (error) {
			setLoader(false);
			console.log(error);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!data['profile_picture_url']) {
			delete data['profile_picture_url'];
		}
		delete data['image'];

		if(data.phone.length == 14){
			try {
				setLoader(true);
				const res = await editAdminProfile(token, data);
				if (res.status == 200) {
					setLoader(false);
					setError(null);
					setSuccessMsg("Profile update successfully");
					setTimeout(() => {
						handleAdminDataUpdate();
						history.push('/profile');
					}, 1200);
				}else{
					setLoader(false);
				}
			} catch (error) {
				setLoader(false);
				let updatedError = error.charAt(0).toUpperCase() + error.slice(1);
				setError(updatedError);
				setSuccessMsg(null);
			}
		}else{
			setError("Please enter the valid contact number")									
		}
		
		
	};

	const normalizeInput = (value) => {
		if (!value) return '';
		const currentValue = value.replace(/[^\d]/g, '');

		const cvLength = currentValue.length;
		if (cvLength < 4) return currentValue;
		if (cvLength < 7)
			return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`;

		return `(${currentValue.slice(0, 3)}) ${currentValue.slice(
			3,
			6
		)}-${currentValue.slice(6, 10)}`;
	};

	const handleInput = (e) => {
		let updatedDetails = { ...data };
		updatedDetails[e.target.id] = e.target.value;
		setData(updatedDetails);
	};
	return (
		<>
			<div
				className='w-full pb-16  mt-5 md:pb-5 flex-1 pt-20 px-2'
				 style={{ overflowY: 'scroll', height: '100vh' }}
				>
				   <div style={{display:"flex", justifyContent:"space-between"}}>
						<div style={{ marginLeft: '1rem', fontSize: '2rem' }}>
							Admin Profile
						</div>
						<div id='recipients'>
							<button
								style={{ height: '3rem' ,}}
								onClick={() => history.push('/changePassword')}
								className='shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
								type='button'>
								Change Password
							</button>
						</div>
				   </div>
					
					<div
						id='recipients'
						className='p-4 md:p-8 mt-6 lg:mt-0 rounded '
						style={{ marginTop: '-20px' }}>
						<button
							style={{ height: '3rem' }}
							type='submit'
							onClick={() => history.push('/profile')}
							className='shadow bg-blue-500 ml-3 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'>
							Back
						</button>
						<button
							style={{ height: '3rem' }}
							form='myForm'
							type='submit'
							className='shadow bg-red-500 ml-3 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'>
							Save
						</button>
					
					</div>
					{error && (
						<p
							style={{
								color: 'red',
								fontSize: '20px',
								textAlign: 'center',
								width: '100%',
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
								
							}}>
							{successMsg}
						</div>
					)}
					<br/>
					{adminDetails && !loader ? (
						<form
							id='myForm'
							style={{ backgroundColor: 'lightgrey', padding: '20px', marginLeft:'25px', marginRight:'25px' }}
							onSubmit={handleSubmit}
							className=' text-base text-gray-200'>
							<div class='flex flex-wrap -mx-3 mb-6 justify-center'>
								<div class='w-40 px-3 mb-6 flex justify-center flex-wrap'>
									<div class='border rounded-full overflow-hidden w-24 h-24'>
										<img
											id='avtar'
											class='rounded-full h-full w-full'
											alt='profile-img'
											src={
												data.profile_picture_url
													? data.profile_picture_url
													: require('../../../assets/img/icon-user.png')
											}
											accept='image/*'
										/>
									</div>
									<label for='upload' class='w-24 block '>
										<div
											class='w-full px-2 py-1 my-2 flex justify-around items-center bg-gray-400 rounded-lg text-white'
											title='Upload a photo...'>
											<svg
												class='w-4 h-4'
												fill='none'
												stroke='currentColor'
												viewBox='0 0 24 24'
												xmlns='http://www.w3.org/2000/svg'>
												<path
													stroke-linecap='round'
													stroke-linejoin='round'
													stroke-width='2'
													d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'></path>
											</svg>{' '}
											Upload
											<input
												type='file'
												onChange={handleProfileChange}
												id='upload'
												style={{ display: 'none' }}
												accept='image/x-png,image/gif,image/jpeg'
											/>
										</div>
									</label>
									<span
										class='text-red-500 text-xs italic'
										id='uploadError'></span>
								</div>
							</div>

							<div style={{marginLeft:'60px'}}>
								<div className='  flex flex-wrap w-full '>
									<label
										className='block tracking-wide w-1/3  text-center mb-2 text-gray-300'
										for='name'>
										Name
									</label>
									<input
										className='appearance-none block w-1/2 bg-gray-100 bg-100 border  rounded-full py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200'
										id='name'
										required
										type='text'
										onChange={handleInput}
										value={data.name}
									/>
								</div>
								<div className=' flex flex-wrap w-full '>
									<label
									
										className='block tracking-wide w-1/3 mb-2 text-center text-gray-300'
										for='email'>
										Email Address
									</label>
									<input
										className='appearance-none block w-1/2  bg-gray-100 border border-100 rounded-full py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200'
										id='email'
										type='email'
										// disabled
										onChange={handleInput}
										value={data.email}
									/>
								</div>
								<div className='w-full flex px-3  justify-content-around'>
									<label
										className='w-1/3 block tracking-wide text-center text-gray-300 mb-2'
										for='mob'>
										Contact Number
									</label>
									<div style={{ width: '50%', marginBottom: '10px' }}>
										<input
											type='text'
											id='phone'
											required
											value={data.phone ? normalizeInput(data.phone) : null}
											className='appearance-none  block w-full  bg-gray-100 border border-gray-200 rounded-full py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200'
											onChange={(e) => {
												let targetVal = e.target.value;
												let res = normalizeInput(targetVal);
													let updatedDetails = { ...data };
													updatedDetails['phone'] = res;
													setData(updatedDetails);								
											
											}}
										/>
									</div>
								</div>
							</div>
						</form>
					):<Loader/>}
				</div>
			
		</>
	);
};

export default EditAdminProfile;
