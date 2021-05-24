import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import CustomTimePicker from '../../../globalComponent/layout/timePicker';

import { useHistory, useParams, useLocation } from 'react-router';
import {
	uploadImage,
	getHotspotsLists,
	getRestaurantCategoryList,
	changeRestaurantStatus,
	deleteRestaurant,
} from '../../../api';
import { useSelector } from 'react-redux';
import moment from 'moment';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import './restaurantForm.css';
import InfoIcon from '@material-ui/icons/Info';
import Loader from '../../../globalComponent/layout/loader';
import StatusManagement from '../../statusManagement/statusManagement';
import DeleteModal from '../../deleteModal/deleteModal';

const RestaurantForm = (props) => {
	const history = useHistory();
	const { id } = useParams();

	const token = useSelector((state) => state.auth.isSignedIn);
	const { pathname } = useLocation();

	const customStyles = {
		control: (provided, state) => ({
			...provided,
			width: '100%',
			backgroundColor: '#fafafa',
			borderColor: 'grey',
			// borderRadius: '9999px',
		}),
		container: (provided, state) => ({
			...provided,
			width: '100%',
			borderRadius: '1.75rem',
			backgroundColor: '#fafafa',
			borderColor: 'grey',
		}),
	};
	const restaurant = props.restaurantDetails;

	const [modalIsOpen, setIsOpen] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);

	const [showLoader, setShowLoader] = useState(false);

	const [imageLoader, setImageLoader] = useState(false);

	const handleImageChange = (e) => {
		let data = {
			image: e.target.files[0],
			folderName: 'restaurant',
		};
		setImageLoader(true);
		uploadImage(token, data)
			.then((res) => {
				let updatedRestaurant = { ...restaurant };
				updatedRestaurant.restaurant_image_url = res.image_url;
				props.setRestaurantDetails(updatedRestaurant);
				setImageLoader(false);
			})
			.catch((error) => {
				setImageLoader(false);
				console.log(error);
			});
	};

	let location = props.location;
	useEffect(() => {
		getRestaurantCategories();
		getHotspots();
	}, []);

	const getRestaurantCategories = async () => {
		try {
			setShowLoader(true);
			let res = await getRestaurantCategoryList(token);
			if (res.success) {
				let categoryList = res.restaurantCategoryList.rows;
				let resp = categoryList.reduce((acc, curr) => {
					return acc.concat({ id: curr.id, name: curr.name });
				}, []);
				props.setRestaurantCategoryList(resp);
				setShowLoader(false);
			}
		} catch (error) {
			setShowLoader(false);
			console.log(error);
		}
	};

	const getHotspots = async () => {
		try {
			setShowLoader(true);

			let { hotspotList } = await getHotspotsLists(token);
			let resp = hotspotList.rows.reduce((acc, curr) => {
				return acc.concat({ id: curr.id, name: curr.name });
			}, []);
			props.setHotspotList(resp);
			setShowLoader(false);
			props.setLoading(false);
		} catch (error) {
			setShowLoader(false);
			console.log(error);
		}
	};

	const handleLocation = (location) => {
		var service = new window.google.maps.places.PlacesService(
			document.getElementById('map')
		);
		service.getDetails(
			{
				placeId: location.value.place_id,
				fields: ['geometry', 'formatted_address'],
			},
			function (place, status) {
				let locations = [];
				locations.push(place.geometry.location.lat());
				locations.push(place.geometry.location.lng());

				let newRestaurantDetails = { ...restaurant };
				newRestaurantDetails['address'] = place.formatted_address;
				newRestaurantDetails['location'] = locations;
				props.setRestaurantDetails(newRestaurantDetails);
				// props.setLocation(locations);
			}
		);
	};

	const handleInputChange = (e) => {
		let updatedDetails = { ...restaurant };
		updatedDetails[e.target.id] = e.target.value;
		props.setRestaurantDetails(updatedDetails);
	};

	const normalizeInput = (value) => {
		let previousValue = restaurant['owner_phone'];
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

	const handleStatusChange = async () => {
		try {
			const status = restaurant.status == 1 ? 0 : 1;
			const res = await changeRestaurantStatus(token, id, status);
			if (res.status == 200) {
				history.push('/restaurant');
			}
		} catch (error) {
			console.log(error);
		}
	};
	const handleDelete = async () => {
		try {
			const res = await deleteRestaurant(token, id);
			if (res.status == 200) {
				history.push('/restaurant');
				setDeleteModal(false);
				// getRestaurantDetails();
			}
		} catch (error) {
			console.log(error);
		}
	};
	const handleDocUpload = (e) =>{
		let data = {
			image: e.target.files[0],
			folderName: 'others',
		};
		uploadImage(token, data)
			.then((res) => {
				let updatedRestaurant = { ...restaurant };
				updatedRestaurant.agreement_doc_url = res.image_url;
				props.setRestaurantDetails(updatedRestaurant);
			})
			.catch((error) => {
			    console.log(error);
			});
	}
	return (
		<>
			<div
				className='main-content pb-16 md:pb-5 flex-1 pt-20 px-2'
				style={{ overflowY: 'scroll', height: '100vh' }}>
				<div className='p-4 md:p-8 mt-6 lg:mt-0 rounded shadow bg-white w-3/4 mx-auto'>
					<h3 className='text-lg font-bold mb-4'>{props.title}</h3>

					<button
						style={{ height: '3rem' }}
						onClick={() => history.push('/restaurant')}
						className='shadow bg-blue-500 ml-3 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
						type='button'>
						Back
					</button>
					{props.title === 'Edit Restaurant Details' && (
						<button
							style={{ height: '3rem' }}
							onClick={() => {
								setIsOpen(true);
							}}
							className='shadow bg-blue-500 ml-3 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
							type='button'>
							Active/Deactive
						</button>
					)}

					{modalIsOpen && (
						<StatusManagement
							{...{
								setIsOpen,
								modalIsOpen,
								details: restaurant,
								name: 'Restaurant',
								handleStatusChange,
							}}
						/>
					)}
					<button
						style={{ height: '3rem' }}
						form='myForm'
						type='submit'
						className='shadow bg-red-500 ml-3 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'>
						Save
					</button>
					{props.title === 'Edit Restaurant Details' && (
						<button
							style={{ height: '3rem' }}
							onClick={() => {
								setDeleteModal(true);
							}}
							className='shadow bg-blue-500 ml-3 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
							type='button'>
							Delete
						</button>
					)}

					{deleteModal && (
						<DeleteModal
							{...{
								setDeleteModal,
								deleteModal,
								name: 'Restaurant',
								handleDelete,
							}}
						/>
					)}

					<br />

					{props.error && (
						<p
							style={{
								color: 'red',
								fontSize: '20px',
								textAlign: 'center',
								width: '100%',
								marginTop: '12px',
							}}>
							{props.error}
						</p>
					)}
					{props.successMsg && (
						<div
							style={{
								backgroundColor: '#9ACD32',
								padding: '10px',
								marginLeft: 'auto',
								marginRight: 'auto',
								marginTop: '24px',
								width: 'fit-content',
							}}>
							{props.successMsg}
						</div>
					)}
					{showLoader ? (
						<Loader />
					) : (
						restaurant && (
							<form
								id='myForm'
								onSubmit={props.handleRestaurant}
								className='w-full mt-50 max-w-full text-base text-gray-200'
								style={{
									marginTop: '40px',
								}}>
								<div className=' d-flex flex-column -mx-3 '>
									<div className='w-full flex  px-3 justify-content-around'>
										<label
											className=' w-1/2 block tracking-wide py-3 px-6 mb-3 text-gray-300'
											for='name'>
											Name
										</label>
										<input
											className='appearance-none block w-1/2 bg-gray-100 border border-gray-200 rounded-half py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200'
											id='owner_name'
											type='text'
											required
											value={restaurant.owner_name}
											onChange={handleInputChange}
											// defaultValue={restaurant.owner_name}
										/>
									</div>
									<div className='w-full flex  px-3 mb-6 md:mb-0'>
										<label
											className='w-1/2 block tracking-wide py-3 px-6 mb-3 text-gray-300'
											for='email'>
											Email Address
										</label>
										<input
											className='appearance-none  block w-1/2  bg-gray-100 border border-gray-200 rounded-half py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200'
											id='owner_email'
											type='email'
											required
											value={restaurant.owner_email}
											onChange={handleInputChange}
											// defaultValue={restaurant.owner_email}
										/>
									</div>
								</div>

								<div className='d-flex flex-column -mx-3 '>
									<div className='w-full flex px-3  justify-content-around'>
										<label
											className='w-1/2 block tracking-wide py-3 px-6 mb-3 text-gray-300 mb-2'
											for='mob'>
											Phone Number
										</label>
										<div
											id='restaurant'
											style={{ width: '50%', marginBottom: '10px' }}>
											<input
												type='text'
												// pattern='[0-9]*'
												value={
													restaurant.owner_phone
														? normalizeInput(restaurant.owner_phone)
														: null
												}
												// maxLength='14'
												className='appearance-none  block w-full  bg-gray-100 border border-gray-200 rounded-half py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200'
												onChange={(e) => {
													let data = e.target.value;
													let res = normalizeInput(data);
													let updatedDetails = { ...restaurant };
													updatedDetails['owner_phone'] = res;
													props.setRestaurantDetails(updatedDetails);
												}}
											/>
										</div>
									</div>
									<div className='w-full flex px-3 mb-6 md:mb-0'>
										<label
											className='block w-1/2 tracking-wide py-3 px-6 mb-3 text-gray-300'
											for='role'>
											Role
										</label>
										<input
											className='appearance-none block w-1/2 bg-gray-100 border border-gray-200 rounded-half py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200'
											id='role'
											type='text'
											required
											value={restaurant.role}
											onChange={handleInputChange}
										/>
									</div>
								</div>
								<div className=' d-flex flex-column -mx-3 '>
									<div className='w-full flex px-3 mb-6 md:mb-0 d-inline-flex'>
										<label
											className='block w-1/2 tracking-wide text-gray-300 py-3 px-6 mb-3'
											for='restaurant_name'>
											Restaurant Name
										</label>
										<input
											className='appearance-none block w-1/2 bg-gray-100 border border-gray-200 rounded-half py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200'
											id='restaurant_name'
											type='text'
											required
											onChange={handleInputChange}
											value={restaurant.restaurant_name}
											// defaultValue={restaurant.restaurant_name}
										/>
									</div>
									<div className='w-full flex px-3 mb-6 md:mb-0'>
										<label
											className='block w-1/2 tracking-wide py-3 px-6 mb-3 text-gray-300'
											for='image'>
											Restaurant Image
										</label>
										{imageLoader ? (
											<label
												className='block w-1/2 tracking-wide  mb-2 text-gray-300 h-50  w-1/2'
												for='images'>
												<div
													style={{
														minHeight: '200px',
														minWidth: '100%',
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
													className='block w-1/2 tracking-wide  mb-2 text-gray-300 h-50  w-1/2'
													for='images'>
													{restaurant.restaurant_image_url ? (
														<img
															alt='Upload Restaurant Image'
															style={{
																minHeight: '200px',
																minWidth: '100%',
																backgroundColor: 'lightgray',
																textAlign: 'center',
																lineHeight: '190px',
															}}
															src={restaurant.restaurant_image_url}
														/>
													) : (
														<div
															style={{
																minHeight: '200px',
																minWidth: '100%',
																backgroundColor: 'lightgray',
																textAlign: 'center',
																lineHeight: '190px',
															}}>
															{' '}
															Upload Restaurant Image
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
								</div>

								<div className='d-flex flex-column -mx-3 mt-2'>
									<div className='w-full flex px-3  justify-content-around'>
										<label
											className='w-1/2 block tracking-wide text-gray-300 py-3 px-6 '
											for='covering_hotspot'>
											Covering Hotspots
										</label>
										<div style={{ display: 'inline-grid', width: '50%' }}>
											<Select
												value={props.hotspot}
												styles={customStyles}
												style={{ width: '100%' }}
												isMulti={true}
												options={props.hotspotList}
												getOptionLabel={(option) => option.name}
												getOptionValue={(option) => option.id}
												inputId='hotspots'
												placeholder='Select the hotspot '
												onChange={(selectedValue) =>
													props.setHotspot(selectedValue)
												}
											/>
										</div>
									</div>

									<div className='w-full flex  mb-6 md:mb-0'>
										<div className='w-full flex px-3  justify-content-around'>
											<label
												className='w-1/2 block tracking-wide text-gray-300 py-3 px-6 '
												for='covering_hotspot'>
												Restaurant Address
											</label>
											<div style={{ display: 'inline-grid', width: '50%' }}>
												<div style={{ display: 'flex' }}>
													<div style={{ marginTop: '10px', width: '100%' }}>
														<GooglePlacesAutocomplete
															inputStyle={{
																height: 40,
																fontSize: 28,
															}}
															components={{
																DropdownIndicator: () => null,
																IndicatorSeparator: () => null,
															}}
															suggestionsStyles={{
																container: {
																	padding: 16,
																	background: '#efefef',
																},
																suggestion: {
																	background: '#eee',
																	cursor: 'pointer',
																},
																suggestionActive: {
																	background: '#bbb',
																},
															}}
															selectProps={{
																placeholder: 'Search the restaurant address...',
																location,
																onChange: handleLocation,
																styles: {
																	indicatorsContainer: (prevStyle, state) => ({
																		...prevStyle,
																		display: 'none',
																	}),
																},
															}}
															apiKey={'AIzaSyCqeKge8JYCJdvyt77p0QEqIr0dMyA8BOM'}
														
														/>
													</div>
													<button
														type='button'
														className='btn btn-lg btn-danger ml-2'
														data-toggle='popover'
														title='Either enter address or paste '>
														<InfoIcon style={{ color: 'black' }} />
													</button>
												</div>
												<div
													style={{
														display: 'inline-column',
														marginTop: '10px',
													}}>
													<input
														className='appearance-none not-allowed block w-full bg-gray-100 border border-gray-200 rounded-half py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200'
														id='address'
														type='text'
														disabled
														value={restaurant.address}
													/>
													<input
														className='appearance-none not-allowed block w-full bg-gray-100 border border-gray-200 rounded-half py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200'
														id='location'
														type='text'
														disabled
														value={restaurant.location}
													/>

													<div id='map' style={{ display: 'none' }}></div>
												</div>
											</div>
										</div>
									</div>
									<div className='w-full flex px-3 mb-6 md:mb-0'>
										<label
											className='w-1/2 block tracking-wide py-3 px-6 mb-3 text-gray-300'
											for='deliveries_per_shift'>
											Deliveries per shift
										</label>
										<input
											className='appearance-none block w-1/2  bg-gray-100 border border-gray-200 rounded-half py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200'
											id='deliveries_per_shift'
											type='number'
											min='0'
											required
											onChange={handleInputChange}
											value={restaurant.deliveries_per_shift}
										/>
									</div>
								</div>
								<div className='d-flex flex-column -mx-3 '>
									<div className='w-full flex px-3 mb-6 md:mb-0 d-inline-flex'>
										<label
											className='block w-1/2 tracking-wide text-gray-300 py-3 px-6 mb-3'
											for='cut_off_time'>
											Cut Off time
										</label>
										<input
											className='appearance-none block w-1/6 bg-gray-100 border border-gray-200 rounded-half py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200'
											id='cut_off_time'
											type='text'
											required
											onChange={handleInputChange}
											value={restaurant.cut_off_time}
										/>
										<p
											style={{
												fontSize: '17px',
												marginTop: '10px',
												marginLeft: '10px',
											}}>
											minutes before shift ending
										</p>
									</div>
									<div className='w-full flex px-3 mb-6 md:mb-0 d-inline-flex'>
										<label
											className='block w-1/2 tracking-wide py-3 px-6 mb-3 text-gray-300'
											for='working_hours'>
											Working hours
										</label>
										{/* {restaurant.working_hours_from && ( */}
										<div style={{ display: 'inline-flex' }}>
											<CustomTimePicker
												use12Hours
												format='h:mm A'
												value={
													restaurant.working_hours_from &&
													moment(restaurant.working_hours_from, 'HH:mm:ss')
												}
												onChange={(val) => {
													debugger;
													let updatedDetails = { ...restaurant };
													if (val == null) {
														updatedDetails['working_hours_from'] = '';
													} else {
														updatedDetails['working_hours_from'] =
															moment(val).format('HH:mm:ss');
													}

													props.setRestaurantDetails(updatedDetails);
												}}
												className='appearance-none block w-1/2 bg-gray-100 border border-gray-200 rounded-half py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200'
												id='working_hours_from'
											/>

											<CustomTimePicker
												use12Hours
												format='h:mm A'
												id='working_hours_to'
												value={
													restaurant.working_hours_to &&
													moment(restaurant.working_hours_to, 'HH:mm:ss')
												}
												onChange={(val) => {
													let updatedDetails = { ...restaurant };
													updatedDetails['working_hours_to'] =
														moment(val).format('HH:mm:ss');
													props.setRestaurantDetails(updatedDetails);
												}}
												className='appearance-none block w-1/2 bg-gray-100 border border-gray-200 rounded-half py-3 px-6 mb-3 ml-5 leading-tight focus:outline-none focus:bg-white focus:border-gray-200'
											/>
										</div>
										{/* )} */}
									</div>
								</div>
								<div className='d-flex flex-column -mx-3 '>
									<div className='w-full flex px-3'>
										<label
											className='block w-1/2 tracking-wide text-gray-300 py-3 px-6 '
											for='orderTypes'>
											Available order types
										</label>
										<div style={{ width: '50%' }}>
											<Select
												value={props.orderType}
												// isMulti={true}
												styles={customStyles}
												menuPlacement='auto'
												options={[
													{ label: 'Hotspot Delivery ', value: 1 },
													{ label: 'Pickup ', value: 2 },
													{ label: 'Both Delivery and Pickup', value: 3 },
												]}
												inputId='order_type'
												placeholder='Select the order type'
												onChange={(selectedValue) =>
													props.setOrderType(selectedValue)
												}
											/>
										</div>
									</div>
									<div className='w-full  flex px-3'>
										<label
											className='block w-1/2 tracking-wide text-gray-300py-3 px-6 mb-3'
											for='category'>
											Category
										</label>
										<div style={{ width: '50%' }}>
											<Select
												value={props.category}
												styles={customStyles}
												options={props.restaurantCategoryList}
												getOptionLabel={(option) => option.name}
												getOptionValue={(option) => option.id}
												inputId='restaurant_category_id'
												menuPlacement='auto'
												isMulti={true}
												placeholder='Select the category type'
												onChange={(selectedValue) =>
													props.setCategory(selectedValue)
												}
											/>
										</div>
									</div>
									<div className='w-full mt-2 flex px-3'>
										<div
											className='block w-1/2 tracking-wide text-gray-300py-3 px-6 mb-3'
											>
											Agreement Doc
											
										</div>
										<label
												style={{ height: '3rem' }}
												for='docAgr'
												className='shadow bg-white-500 ml-3 hover:bg-white-400 focus:shadow-outline focus:outline-black text-black  py-2 px-4 rounded'>
												Upload Doc
											</label>
										<input
											type='file'
											 onChange={handleDocUpload}
											id='docAgr'
											// accept='application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
											style={{ display: 'none' }}
										/>
									</div>
								</div>
							</form>
						)
					)}
				</div>
			</div>
		</>
	);
};

export default RestaurantForm;
