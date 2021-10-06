import React, { useEffect, useState } from 'react';

import { useHistory, useParams } from 'react-router';
import {
	uploadImage,
	getHotspotsLists,
	getRestaurantCategoryList,
	changeRestaurantStatus,
	deleteRestaurant,
} from '../../../api';
import { useSelector } from 'react-redux';
import './restaurantForm.css';
import Loader from '../../../globalComponent/layout/loader';

const RestaurantForm = (props) => {
	const history = useHistory();
	const { id } = useParams();
	const token = useSelector((state) => state.auth.isSignedIn);

	const restaurant = props.restaurantDetails;

	const [showLoader, setShowLoader] = useState(false);

	useEffect(() => {
		getRestaurantCategories();
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


	const handleInputChange = (e) => {
		let updatedDetails = { ...restaurant };
		updatedDetails[e.target.id] = e.target.value;
		props.setRestaurantDetails(updatedDetails);
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
						onClick={() => history.goBack()}
						className='shadow bg-blue-500 ml-3 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
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
