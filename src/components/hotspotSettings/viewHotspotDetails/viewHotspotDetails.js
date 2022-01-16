/**
 * The file is covered under Algoworks Work Product License for Design & Development of Mobile Application for “Hotspot”.
 * Please review the license for full details.
 * This program is not free software: You cannot redistribute it for any use under the terms of the Algoworks Work Product License for Design & Development of Mobile Application for “Hotspot”.
 * However the source can be modified and updated for the working of the application Design & Development of Mobile Application for “Hotspot” for which it was licensed.
*/

import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { getHotspot, deleteHotspot } from '../../../api';
import { useSelector } from 'react-redux';
import moment from 'moment';
import DeleteModal from '../../deleteModal/deleteModal';

const ViewHotspotDetails = () => {
	const history = useHistory();

	const [hotspotDetails, setHotspotDetails] = useState(null);
	const token = useSelector((state) => state.auth.isSignedIn);
	const params = useParams();

	const [deleteModal, setDeleteModal] = useState(false);
	const [error, setError] = useState(null);
	const[restaurants, setRestaurants] = useState(null);

	useEffect(() => {
		if(params.id){
			let data={
				params:{
					hotspotLocationId:params.id
				}
			}
			getHotspot(token, data)
				.then((hotspot) => {
					let updatedData = hotspot.hotspotDetails.restaurants.map(rest =>rest.restaurant.restaurant_name)
					updatedData.join(", ")
					setRestaurants(updatedData.join(", "))
					setHotspotDetails(hotspot.hotspotDetails);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}, []);

	const handleDelete = () => {
		let data={
			body:{
				hotspotLocationId:params.id
			}
		}
		deleteHotspot(token, data)
			.then((res) => {
				history.push('/hotspots');
				setDeleteModal(false);
				setError(null);
			})
			.catch((error) => {
				setDeleteModal(false);
				setError(error);
			});
	};
	return (
		<div
			className='main-content pb-16 md:pb-5 flex-1 pt-20 px-2'
			style={{ overflowY: 'scroll', height: '100vh' }}>
			<div className='p-4 md:p-8 mt-6 lg:mt-0 rounded shadow bg-white'>
				<h3 className='text-2xl text-gray-400 font-bold mb-6'>
					Hotspot Settings Details
				</h3>
				{hotspotDetails && (
					<>
						<div
							style={{
								// right: '60px',
								// position: 'absolute',
								marginTop: '-70px',
								marginLeft: '70%',
							}}>
							<button
								style={{ height: '3rem' }}
								onClick={() => history.push('/hotspots')}
								className='shadow bg-blue-500 ml-3 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
								type='button'>
								Back
							</button>

							<button
								style={{ height: '3rem' }}
								onClick={() => history.push(`/editHotspot/${params.id}`)}
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

						<DeleteModal
							{...{
								setDeleteModal,
								deleteModal,
								name: 'Hotspot',
								handleDelete,
								message: `This Hotspot is linked with the Restaurant ${restaurants}`,
								restaurants
							}}
						/>
<br/>
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
						<div style={{ marginTop: '50px' }}>
							<div className='form-layout text-base border border-gray-200 '>
								<div className='flex flex-row items-center '>
									<div
										style={{ backgroundColor: 'lightgray' }}
										className=' font-semibold py-4 px-6 w-1/3 text-right'>
										Hotspot Name
									</div>
									<div className='px-8 '>{hotspotDetails.name}</div>
								</div>
								<div className='flex flex-row  items-center border-t border-gray-200 '>
									<div
										style={{ backgroundColor: 'lightgray' }}
										className=' font-semibold py-4 px-6 w-1/3 text-right '>
										Address
									</div>
									<div className='px-8' style={{ width: '65%' }}>
										{hotspotDetails.location_detail}
									</div>
								</div>
								<div className='flex flex-row border-t border-gray-200'>
									<div
										style={{ backgroundColor: 'lightgray' }}
										className=' font-semibold py-4 px-6 w-1/3 text-right'>
										Drop off
									</div>
									<div className='px-8'>
										{hotspotDetails.dropoffs &&
											hotspotDetails.dropoffs.map((dropoff) => {
												return (
													<>
														<div style={{ marginTop: '5px' }}> {dropoff}</div>
													</>
												);
											})}
									</div>
								</div>
								<div className='flex flex-row  border-t border-gray-200'>
									<div
										style={{ backgroundColor: 'lightgray' }}
										className='font-semibold py-4 px-6 w-1/3 text-right'>
										Delivery Shifts
									</div>
									<div className='px-8'>
										{hotspotDetails.delivery_shifts.map((shifts) => {
											return (
												<div style={{ marginTop: '5px' }}>
													{moment(shifts, 'hh:mm:ss').format('hh:mm a')}
												</div>
											);
										})}
									</div>
								</div>
								<div className='flex flex-row items-center border-t border-gray-200'>
									<div
										className='bg-gray-100 font-semibold py-4 px-6  w-1/3 text-right '
										style={{ backgroundColor: 'lightgray' }}>
										Restaurants
									</div>
									<div className='px-8 ' style={{ width: '65%' }}>
										{hotspotDetails.restaurants.map((restaurant, index) => {
												
											return (
												<div style={{ marginTop: '5px' }}>
													{++index}. {restaurant.restaurant.restaurant_name} 
													(<strong>Pickup Time:</strong> {restaurant.pickup_time} minutes) 
													(<strong>Shifts:</strong> {restaurant.available_for_shifts.map(ele=>{
														if(ele==hotspotDetails.delivery_shifts.length){
															return (<span>{moment(hotspotDetails.delivery_shifts[ele-1], 'hh:mm:ss').format('hh:mm a')}</span>)
														}else{
															return (<span>{moment(hotspotDetails.delivery_shifts[ele-1], 'hh:mm:ss').format('hh:mm a')}, </span>)
														}
													})})
												</div>
											) 
										})}
									</div>
								</div>
								<div className='flex flex-row border-t  items-center border-gray-200'>
									<div
										style={{ backgroundColor: 'lightgray' }}
										className='bg-gray-100 font-semibold py-4 px-6 w-1/3 text-right'>
										Driver
									</div>
									<div className='px-8' style={{ width: '65%' }}>
										{hotspotDetails.drivers.map((driver, idx) => {
											let res = '';
											if (idx > 0) {
												res += '  ,  ';
											}
											return res + driver.first_name + ' ' + driver.last_name;
										})}
									</div>
								</div>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default ViewHotspotDetails;
