/**
 * The file is covered under Algoworks Work Product License for Design & Development of Mobile Application for “Hotspot”.
 * Please review the license for full details.
 * This program is not free software: You cannot redistribute it for any use under the terms of the Algoworks Work Product License for Design & Development of Mobile Application for “Hotspot”.
 * However the source can be modified and updated for the working of the application Design & Development of Mobile Application for “Hotspot” for which it was licensed.
*/


import React, { useEffect, useState } from 'react';
import { getRestaurantById, getRestaurantCategoryList ,changeRestaurantStatus, deleteRestaurant} from '../../../api';
import {useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import moment from 'moment';
import StatusManagement from '../../statusManagement/statusManagement';
import DeleteModal from '../../deleteModal/deleteModal';
import Loader from '../../../globalComponent/layout/loader';

const ViewRestaurant = () => {
	const history = useHistory();
	const { id } = useParams();
	const { pathname } = useLocation();
	let path = pathname.split('/')[1];

	const [restaurantDetails, setRestaurantDetails] = useState(null);
	const [coveringHotspots, setCoveringHotspots] = useState(null);
	const token = useSelector((state) => state.auth.isSignedIn);
	const [modalIsOpen, setIsOpen] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);
	const [restaurantCategoryList, setRestaurantCategoryList] = useState(null);

	const [category, setCategory] = useState([]);

	useEffect(() => {
		if(id && parseInt(id))
		{
			getRestaurantDetails();
		}else{
			history.push('/login')
		}
	}, []);

	const getRestaurantDetails = async () => {
		try {
			const { restaurant, coveringHotspots } = await getRestaurantById(
				token,
				id
			);
			
			let { restaurantCategoryList } = await getRestaurantCategoryList(token);

			let phone = restaurant.owner_phone;

			restaurant['owner_phone'] = `(${phone.slice(0, 3)}) ${phone.slice(
				3,
				6
			)}-${phone.slice(6)}`;

			let categoryLists = restaurantCategoryList.rows;
			
			
			let category = restaurant.restaurant_category_ids.map((restaurantId) => {
				let rs = categoryLists.filter((h) => {
					if (h.id === restaurantId) {
						return true;
					}
				})[0];
				return rs;
			});
          
			setRestaurantCategoryList(categoryLists);

			setRestaurantDetails(restaurant);
			setCategory(category);

			setCoveringHotspots(coveringHotspots);
		} catch (error) {
			console.log(error);
		}
	};

	const handleStatusChange = async() => {
		try {
				const status = restaurantDetails.status == 1 ? 0 : 1;
				const res = await changeRestaurantStatus(token, id, status);
				if (res.status == 200) {
					history.push('/restaurant');
				}
			} catch (error) {
				console.log(error);
			}
	};

	const handleDelete = async() =>{
		try {
			const res = await deleteRestaurant(token, id);
			if (res.status == 200) {
				history.push('/restaurant');
				setDeleteModal(false);
				getRestaurantDetails();
			}
		} catch (error) {
			console.log(error);
		}
	}
	return (
		<div className='main-content md:pb-5 flex-1 p-8 px-2' style={{ overflowY: 'auto', height: '100vh' }}>
				<div id='recipients' className='p-4 md:p-8 mt-6 lg:mt-0 rounded shadow bg-white'>
					<h1 className='text-xl'>Restaurant Details</h1>
				{!restaurantDetails ?
				<Loader />
				:(
					<>
						<div className='flex flex-wrap -mx-3 mb-6 mt-5' style={{justifyContent: 'space-between' }}>
							<div style={{ marginTop: '-40px' }}>
								<button
									style={{ height: '3rem' }}
									className='shadow mt-10 bg-blue-500 ml-3 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-1 px-4 rounded'
									type='button'
									disabled>
									Restaurant Details
								</button>
								<button
									style={{ height: '3rem' }}
									onClick={() => history.push(`/${path}/${id}/menu`)}
									className='shadow bg-500 mt-10 ml-3 hover:bg-white-400 focus:shadow-outline focus:outline-none text-black font-bold py-1 px-4 rounded'
									type='button'>
									Menu Management
								</button>
							</div>
							<div>
								<button
									style={{ height: '3rem' }}
									onClick={() => history.push('/restaurant')}
									className='shadow bg-blue-500 ml-3 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
									type='button'>
									Back
								</button>
								<button
									style={{ height: '3rem' }}
									onClick={() => {
										setIsOpen(true);
									}}
									className='shadow bg-blue-500 ml-3 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
									type='button'>
									Active/Deactive
								</button>
								<StatusManagement {...{ setIsOpen, modalIsOpen, details: restaurantDetails,handleStatusChange, name:'Restaurant' }} />
							

								<button
									style={{ height: '3rem' }}
									onClick={() => history.push(`/restro/${id}`)}
									className='shadow bg-blue-500 ml-3 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
									type='button'>
									Edit
								</button>
								<button
									style={{ height: '3rem' }}
									onClick={() => {
										setDeleteModal(true);
									}}
									className='shadow bg-blue-500 ml-3 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
									type='button'>
									Delete
								</button>
							</div>
						</div>
						<DeleteModal {...{
								setDeleteModal,
								deleteModal,
								handleDelete,
								name:'Restaurant'
								
							}}/>

						<div className='flex flex-wrap -mx-3 mt-10 justify-center'>
							<div className='w-40 px-3 mb-6 flex justify-center flex-wrap'>
								<div className='border  overflow-hidden w-30 h-30'>
									<img
										id='avtar'
										// className='h-full w-full'
										alt='profile-img'
										src={
											restaurantDetails.restaurant_image_url
												? restaurantDetails.restaurant_image_url
												: require('../../../assets/img/icon-user.png')
										}
										accept='image/*'
									/>
								</div>
							</div>
						</div>
						
						<div className='form-layout text-base border border-gray-200'>


							<div className='flex flex-row items-center '>
								<div className='bg-gray-100 font-semibold py-4 px-6 w-1/3 text-right'>
									Restaurant Name
								</div>
								<div className='px-8'>{restaurantDetails.restaurant_name}</div>
							</div>

							<div className='flex flex-row items-center border-t border-gray-200'>
								<div className='bg-gray-100 font-semibold py-4 px-6 w-1/3 text-right'>
									Owner Name
								</div>
								<div className='px-8' style={{ maxWidth: '50%' }}>
									{restaurantDetails.owner_name}
								</div>
							</div>
							<div className='flex flex-row items-center border-t border-gray-200'>
								<div className='bg-gray-100 font-semibold py-4 px-6 w-1/3 text-right'>
									Role
								</div>
								<div className='px-8'>{restaurantDetails.role}</div>
							</div>
							<div className='flex flex-row items-center border-t border-gray-200'>
								<div className='bg-gray-100 font-semibold py-4 px-6 w-1/3 text-right'>
									Email Address
								</div>
								<div className='px-8'>{restaurantDetails.owner_email}</div>
							</div>
							<div className='flex flex-row items-center border-t border-gray-200'>
								<div className='bg-gray-100 font-semibold py-4 px-6 w-1/3 text-right'>
									Phone Number
								</div>
								<div className='px-8'>{restaurantDetails.owner_phone}</div>
							</div>
							
							
							<div className='flex flex-row items-center border-t border-gray-200'>
								<div className='bg-gray-100 font-semibold py-4 px-6 w-1/3 text-right'>
									Category
								</div>
								<div className='px-8' style={{width: '65%'}}>
								{category.map((category, idx) => {
											let res ="";
											if(idx > 0 ){
												res += "  ,  ";
											}
											return res + category.name;
											
										}
								)}
								
								</div>
							</div>
							<div className='flex flex-row items-center border-t border-gray-200'>
								<div className='bg-gray-100 font-semibold py-4 px-6 w-1/3 text-right'>
									Covering Hotspots
								</div>
								<div className='px-8' style={{width: '65%'}}>
									{coveringHotspots &&
										coveringHotspots.map((hotspot, idx) => {
											let res ="";
											if(idx > 0 ){
												res += "  ,  ";
											}
											return res + hotspot ;
										})}
										
								</div>
							</div>
							<div className='flex flex-row items-center border-t border-gray-200'>
								<div className='bg-gray-100 font-semibold py-4 px-6 w-1/3 text-right'>
									Primary Location
								</div>
								<div className='px-8' style={{width: '65%'}}>{restaurantDetails.address}</div>
							</div>
							<div className='flex flex-row items-center border-t border-gray-200'>
								<div className='bg-gray-100 font-semibold py-4 px-6 w-1/3 text-right'>
									Deliveries per shift
								</div>
								<div className='px-8'>
									{restaurantDetails.deliveries_per_shift}
								</div>
							</div>
							<div className='flex flex-row items-center border-t border-gray-200'>
								<div className='bg-gray-100 font-semibold py-4 px-6 w-1/3 text-right'>
									Cut Off time
								</div>
								<div className='px-8'>
								
									{restaurantDetails.cut_off_time} minutes before shift ending
								</div>
							</div>
							<div className='flex flex-row items-center border-t border-gray-200'>
								<div className='bg-gray-100 font-semibold py-4 px-6 w-1/3 text-right'>
									Available order types
								</div>
								<div className='px-8'>
									{(function () {
										if (restaurantDetails.order_type == 1) {
											return ' Hotspot Delivery';
										} else if (restaurantDetails.order_type == 2) {
											return '  Pickup';
										} else {
											return '  Hotspot Delivery , Pickup';
										}
									})()}
								</div>
							</div>
							<div className='flex flex-row items-center border-t border-gray-200'>
								<div className='bg-gray-100 font-semibold py-4 px-6 w-1/3 text-right'>
									Working hours
								</div>
								<div className='px-8'>
									{moment(
										restaurantDetails.working_hours_from,
										'HH:mm:ss'
									).format('h:mm A')}{' '}
									-
									{moment(
										restaurantDetails.working_hours_to,
										'HH:mm:ss'
									).format('h:mm A')}
								</div>
							</div>
							<div className='flex flex-row items-center border-t border-gray-200'>
								<div className='bg-gray-100 font-semibold py-4 px-6 w-1/3 text-right'>
								Stripe publishable key 
								</div>
								<div style={{overflowWrap:"break-word",width: '65%'}} className='px-8'>
									<p>{restaurantDetails.stripe_publishable_key}</p>
								</div>
							</div>
							<div className='flex flex-row items-center border-t border-gray-200'>
								<div className='bg-gray-100 font-semibold py-4 px-6 w-1/3 text-right'>
								Stripe secret key
								</div>
								<div style={{overflowWrap:"break-word",width: '65%'}} className='px-8'>
									<p >{restaurantDetails.stripe_secret_key}</p>
								</div>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
}

export default ViewRestaurant;
