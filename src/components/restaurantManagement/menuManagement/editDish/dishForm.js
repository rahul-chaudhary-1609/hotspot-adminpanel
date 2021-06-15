import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Select from 'react-select';
import { getCategoryList, uploadImage, getDishById } from '../../../../api';
import { useSelector } from 'react-redux';
import Loader from '../../../../globalComponent/layout/loader';
import ToggleOffIcon from '@material-ui/icons/ToggleOff';
import ToggleOnIcon from '@material-ui/icons/ToggleOn';

const DishForm = (props) => {
	const history = useHistory();
	const token = useSelector((state) => state.auth.isSignedIn);
	const { id } = useParams();

	const [imageLoader, setImageLoader] = useState(false);

	const customStyles = {
		control: (provided, state) => ({
			...provided,
			width: '100%',
			backgroundColor: '#fafafa',
			borderColor: 'grey',
		}),
	};

	const handleImageChange = (e) => {
		let data = {
			image: e.target.files[0],
			folderName: 'dish',
		};
		setImageLoader(true);
		uploadImage(token, data)
			.then((res) => {
				let updatedDish = { ...dish };
				updatedDish.image_url = res.image_url;
				props.setDish(updatedDish);
				setImageLoader(false);
			})
			.catch((error) => {
				setImageLoader(false);
				props.setError(error);
			});
	};
	let dish = props.dish;

	const handleDishChange = (e) => {
		let updatedDish = { ...dish };
		updatedDish[e.target.id] = e.target.value;
		props.setDish(updatedDish);
	};

	const handleStatus = (e) => {
		props.setIsrecommended(props.is_recommended?0:1);
		debugger
	};

	const handleQuickFilter = () => {
		props.setIsquick_filter(props.is_quick_filter?0:1);
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
							if (props.restaurantId) {
								history.push(`/viewRestaurant/${props.restaurantId}/menu`);
							} else {
								history.push(`/viewRestaurant/${id}/menu`);
							}
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
					{props.loading || !dish ? (
						<Loader />
					) : (
							<form
								id='myForm'
								onSubmit={props.handleDishes}
								className='w-full mt-6 max-w-full text-base text-gray-200'>
								<div className='flex flex-wrap -mx-3 mb-3'>
									<div className='w-full  px-3 mb-3 md:mb-0'>
										<label
											className='block tracking-wide mb-2 text-gray-300'
											for='name'>
											Name
									</label>
										<input
											className='appearance-none block w-full bg-gray-100 bg-100 border  rounded-half py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200'
											id='name'
											type='text'
											onChange={handleDishChange}
											value={dish.name}
										/>
									</div>
									<div className='w-full  px-3 mb-3 md:mb-0'>
										<label
											className='block tracking-wide mb-2 text-gray-300'
											for='price'>
											Price
									</label>
										<input
											className='appearance-none block w-full bg-gray-100 border border-100 rounded-half py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200'
											id='price'
											onChange={handleDishChange}
											type='price'
											value={dish.price}
										/>
									</div>
								</div>
								<div className='flex flex-wrap -mx-3 mb-3'>
									<div className='w-full  px-3 mb-3 md:mb-0'>
										<label
											className='block tracking-wide text-gray-300 mb-2'
											for='category'>
											Category
									</label>

										<Select
											// value={categoryLists.filter(({id}) =>id ===dish.dish_category_id )[0]}
											value={props.category}
											styles={customStyles}
											getOptionLabel={(option) => option.name}
											getOptionValue={(option) => option.id}
											options={props.categoryLists}
											// inputId='dish_category_id'
											id='dish_category_id'
											onChange={(selectedValue) =>
												props.setCategory(selectedValue)
											}
										/>
									</div>
									<div className='w-full mt-3 px-3 mb-2  md:mb-0'>
										<label className='block tracking-wide mb-2 text-gray-300'>
											Images
									</label>
										{imageLoader ? (
											<label
												className='block tracking-wide  mb-2 text-gray-300  w-1/2'
												for='images'>
												<div
													style={{
														minHeight: '200px',
														minWidth: '100%',
														backgroundColor: 'lightgray',
														textAlign: 'center',
														lineHeight: '190px',
													}}>
													Loading..........
											</div>
											</label>
										) : (
												<>
													<label
														className='block tracking-wide  mb-2 text-gray-300  w-1/2'
														for='images'>
														{dish.image_url ? (
															<img
																style={{
																	minHeight: '200px',
																	minWidth: '100%',
																	backgroundColor: 'lightgray',
																	textAlign: 'center',
																}}
																src={dish.image_url}
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
														Upload Dish Image
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
								<div className='flex flex-wrap -mx-3 mb-6'>
									<div className='w-full  px-3'>
										<label
											className='block tracking-wide text-gray-300 mb-2'
											for='description'>
											Short description
									</label>
										<textarea
											id='description'
											value={dish.description}
											onChange={handleDishChange}
											className='appearance-none block w-full bg-gray-100 border border-100 rounded-half py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200'
										/>
									</div>
								</div>
								<div className='flex flex-wrap -mx-3 mb-6'>
									<div className='w-full  px-3'>
										<label
											className='block tracking-wide text-gray-300 mb-2'
											for='recommended'>
											Dish As Recommended
									</label>
										<div style={{ padding: '6px', cursor: 'pointer' }}>
											{props.is_recommended == 1 ? (
												<ToggleOnIcon
													onClick={handleStatus}
													id='recommended'
													style={{ color: 'green', fontSize: '45' }}
												/>
											) : (
													<ToggleOffIcon
														onClick={handleStatus}
														style={{ color: 'red', fontSize: '45' }}
													/>
												)}
										</div>
									</div>
								</div>
								<div className='flex flex-wrap -mx-3 mb-6'>
									<div className='w-full  px-3'>
										<label
											className='block tracking-wide text-gray-300 mb-2'
											for='filter'>
											Dish As Quick Filter
									</label>
										<div style={{ padding: '6px', cursor: 'pointer' }}>
											{props.is_quick_filter == 1 ? (
												<ToggleOnIcon
													onClick={handleQuickFilter}
													style={{ color: 'green', fontSize: '45' }}
												/>
											) : (
													<ToggleOffIcon
														onClick={handleQuickFilter}
														style={{ color: 'red', fontSize: '45' }}
													/>
												)}
										</div>
									</div>
								</div>
							</form>
						)}
				</div>
			</div>
		</>
	);
};
export default DishForm;
