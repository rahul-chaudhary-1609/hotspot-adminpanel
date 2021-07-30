import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import Loader from '../../../globalComponent/layout/loader';
import { uploadImage, getBannerList } from '../../../api';
import { useSelector } from 'react-redux';
import Select from 'react-select';

const BannerForm = (props) => {
	const history = useHistory();
	const token = useSelector((state) => state.auth.isSignedIn);

	const banner = props.bannerData;
	const [imageLoader, setImageLoader] = useState(false);
	const [orderList, setOrderList] = useState(null);

	useEffect(() => {
		getBannerList(token, '', '')
			.then((res) => {
				let count = res.banners.count;
				let list = [];
				if (count == 0) {
					list.push({
						label: 1,
						value: 1,
					});
				} else {
					for (let i = 0; i <= count; i++) {
						list.push({
							label: i+1,
							value: i+1,
						});
					}
				}
				list.push({
					label: 'Select a place for banner',
					value: 0,
				});
				setOrderList(list);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);


	const handleInputChange = (e) => {
		let updatedData = { ...props.bannerData };
		updatedData[e.target.id] = e.target.value;
		props.setBannerData(updatedData);
	};
	const handleImageChange = (e) => {
		if(e.target.files[0])
		{
			var imageArray = e.target.files[0].name.split('.');
			if(imageArray.length > 2  && imageArray.length < 2 )
			{
				props.setError("Double extension files are not allowed.");
			}else if(imageArray[1] !== "jpeg" && imageArray[1] !== "jpg" && imageArray[1] !== "png" ){
				props.setError("Only jpeg, jpg or png images are allowed.");
			}else{
		let data = {
			file: e.target.files[0],
			mimeType:e.target.files[0].type,
			folderName: 'other',
		};
		setImageLoader(true);
		uploadImage(token, data)
			.then((res) => {
				let updatedData = { ...props.bannerData };
				updatedData.image_url = res.image_url;
				props.setBannerData(updatedData);
				setImageLoader(false);
			})
			.catch((error) => {
				setImageLoader(false);
				console.log(error);
			});
		}
	}
	};
	return (
		<>
			<div
				className='main-content pb-16 md:pb-5 flex-1 pt-20 px-2'
				style={{ overflowY: 'scroll', height: '100vh' }}>
				<div className='p-4 md:p-8 mt-6 lg:mt-0 rounded shadow bg-white w-3/4 mx-auto'>
					<h3 className='text-lg font-bold mb-4'>{props.title}</h3>

					<button
						style={{ height: '3rem' }}
						onClick={() => {
							history.push(`/banners`);
						}}
						className='shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
						type='button'>
						Back
					</button>

					<button
						style={{ height: '3rem' }}
						form='myForm'
						type='submit'
						className='shadow bg-red-500 ml-3 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'>
						Save
					</button>
					{props.error && (
						<p
							style={{
								color: 'red',
								fontSize: '20px',
								textAlign: 'center',
								width: '100%',
							}}>
							{props.error}
						</p>
					)}
					{props.successMsg && (
						<div
							style={{
								backgroundColor: '#9ACD32',
								padding: '10px',
								width: 'fit-content',
								marginLeft: 'auto',
								marginRight: 'auto',
								marginTop: '12px',
							}}>
							{props.successMsg}
						</div>
					)}
					{props.loading || !banner ? (
						<Loader />
					) : (
						<form
							id='myForm'
							onSubmit={props.handleSubmit}
							className='w-full mt-6 max-w-full text-base text-gray-200'>
							<div className='flex flex-wrap -mx-3 mb-3'>
								<div className='w-full flex  px-3 mb-3 md:mb-0'>
									<label
										className='block w-1/2 tracking-wide py-3 px-6 mb-3 text-gray-300'
										for='name'>
										Title
									</label>
									<input
										className='appearance-none block w-1/2 bg-gray-100 bg-100 border  rounded-half py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200'
										id='name'
										type='text'
										required
										onChange={handleInputChange}
										value={banner.name}
									/>
								</div>
							</div>
							<div className='w-full flex px-3 mb-3 -mx-3 md:mb-0'>
								<label
									className='block w-1/2 tracking-wide py-3 px-6 mb-3 text-gray-300'
									for='image'>
									Image
								</label>
								{imageLoader ? (
									<label
										className='block w-1/2 tracking-wide  mb-2 text-gray-300 h-50  w-1/2'
										for='images'>
										<div
											style={{
												minHeight: '200px',
												minWidth: '107%',
												backgroundColor: 'lightgray',
												textAlign: 'center',
												lineHeight: '190px',
											}}>
											{' '}
											Loading............
										</div>
									</label>
								) : (
									<>
										<label
											className='block w-1/2 tracking-wide ml-6  mb-2 text-gray-300 h-50 '
											for='images'>
											{banner.image_url ? (
												<img
													style={{
														minHeight: '200px',
														minWidth: '107%',
														backgroundColor: 'lightgray',
														textAlign: 'center',
														lineHeight: '190px',
													}}
													src={banner.image_url}
												/>
											) : (
												<div
													style={{
														minHeight: '200px',
														minWidth: '107%',
														backgroundColor: 'lightgray',
														textAlign: 'center',
														lineHeight: '190px',
													}}>
													{' '}
													Upload Banner Image
												</div>
											)}
										</label>
										<input
											type='file'
											onChange={handleImageChange}
											id='images'
											style={{ display: 'none' }}
										/>
									</>
								)}
							</div>
							{/* <div className='flex flex-wrap -mx-3 mb-3 mt-3'>
								<div className='w-full flex  px-3 mb-3 md:mb-0'>
									<label
										className='block w-1/2 tracking-wide py-3 px-6 mb-3 text-gray-300'
										for='order'>
										Order
									</label>

									<div style={{ width: '50%' }}>
										<Select
											value={banner.order}
											options={orderList}
											id='order'
											menuPlacement='auto'
											placeholder='Select a place for banner'
											onChange={(selectedValue) =>{
												let updatedData = { ...props.bannerData };
												updatedData['order'] = selectedValue;
												props.setBannerData(updatedData);
											}
											}
										/>
									</div>
								</div>
							</div> */}
						</form>
					)}
				</div>
			</div>
		</>
	);
};

export default BannerForm;
