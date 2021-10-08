/**
 * The file is covered under Algoworks Work Product License for Design & Development of Mobile Application for “Hotspot”.
 * Please review the license for full details.
 * This program is not free software: You cannot redistribute it for any use under the terms of the Algoworks Work Product License for Design & Development of Mobile Application for “Hotspot”.
 * However the source can be modified and updated for the working of the application Design & Development of Mobile Application for “Hotspot” for which it was licensed.
*/


import React, { useEffect, useState } from 'react';
import ToggleOffIcon from '@material-ui/icons/ToggleOff';
import ToggleOnIcon from '@material-ui/icons/ToggleOn';
import { getDish ,toggleDishStatus, deleteDish} from '../../../../../api';
import {useSelector } from 'react-redux';
import { useHistory, useParams,useLocation } from 'react-router-dom';
import StatusManagement from '../../../../statusManagement/statusManagement';
import DeleteModal from '../../../../deleteModal/deleteModal';
import Loader from '../../../../../globalComponent/layout/loader';

const ViewDish = () => {
	const history = useHistory();
	const params = useParams();
    const location = useLocation();

	const [dishDetails, setDishDetails] = useState(null);
	const token = useSelector((state) => state.auth.isSignedIn);
	const [modalIsOpen, setIsOpen] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);

	useEffect(() => {
		if(params.menuCategoryId && parseInt(params.menuCategoryId))
		{
			fetchData();
		}else{
			history.push('/login')
		}
	}, []);

	async function fetchData() {
		try {
            let data={
				params:{
					dishId:params.dishId,
				}
			}
			const res = await getDish(
				token,
				data
			);

			setDishDetails(res.dish);
		} catch (error) {
			console.log(error);
		}
	};

	const handleStatusChange = async() => {
		try {
				const status = dishDetails.status == 1 ? 0 : 1;
                let data={
                    body:{
                        dishId:params.dishId,
                    }
                }
				const res = await toggleDishStatus(token, data);
				if (res.status == 200) {
					history.push(`/restaurant/${params.restaurantId}/menuCategory/${params.menuCategoryId}/menu`);
				}
			} catch (error) {
				console.log(error);
			}
	};

	const handleDelete = async() =>{
		try {
            let data={
                body:{
                    dishId:params.dishId,
                }
            }
			const res = await deleteDish(token, data);
			if (res.status == 200) {
				history.push(`/restaurant/${params.restaurantId}/menuCategory/${params.menuCategoryId}/menu`);
				setDeleteModal(false);
			}
		} catch (error) {
			console.log(error);
		}
	}
	return (
		<div className='main-content md:pb-5 flex-1 p-8 px-2' style={{ overflowY: 'auto', height: '100vh' }}>
				<div id='recipients' className='p-4 md:p-8 mt-6 lg:mt-0 rounded shadow bg-white'>
					<h1 className='text-xl'>Menu Management</h1>
				{!dishDetails ?
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
									Dish Details
								</button>
								<button
									style={{ height: '3rem' }}
									onClick={() => history.push(`/restaurant/${params.restaurantId}/menuCategory/${params.menuCategoryId}/menu`)}
									className='shadow bg-500 mt-10 ml-3 hover:bg-white-400 focus:shadow-outline focus:outline-none text-black font-bold py-1 px-4 rounded'
									type='button'>
									Menu Management
								</button>
							</div>
							<div>
								<button
									style={{ height: '3rem' }}
									onClick={() => history.push(`/restaurant/${params.restaurantId}/menuCategory/${params.menuCategoryId}/menu`)}
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
								<StatusManagement {...{ setIsOpen, modalIsOpen, details: dishDetails,handleStatusChange, name:'Dish' }} />
							

								<button
									style={{ height: '3rem' }}
									onClick={() => history.push(`/restaurant/${params.restaurantId}/menuCategory/${params.menuCategoryId}/editDish/${params.dishId}`)}
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
								name:'Menu Category'
								
							}}/>
						
						<div className='form-layout text-base border border-gray-200'>


							<div className='flex flex-row items-center border-t border-gray-200'>
								<div className='bg-gray-100 font-semibold py-4 px-6 w-1/3 text-right'>
									Name
								</div>
								<div className='px-8'>{dishDetails.name}</div>
							</div>

							<div className='flex flex-row items-center border-t border-gray-200'>
								<div className='bg-gray-100 font-semibold py-4 px-6 w-1/3 text-right'>
									Actual Price ($)
								</div>
								<div className='px-8'>{dishDetails.price}</div>
							</div>

							<div className='flex flex-row items-center border-t border-gray-200'>
								<div className='bg-gray-100 font-semibold py-4 px-6 w-1/3 text-right'>
									Markup Price ($)
								</div>
								<div className='px-8'>{dishDetails.markup_price?dishDetails.markup_price:0.00}</div>
							</div>

							<div className='flex flex-row items-center border-t border-gray-200'>
								<div className='bg-gray-100 font-semibold py-4 px-6 w-1/3 text-right'>
									Total Price ($)
								</div>
								<div className='px-8'>{dishDetails.markup_price?parseFloat(dishDetails.price)+parseFloat(dishDetails.markup_price):dishDetails.price}</div>
							</div>

							<div className='flex flex-row items-center border-t border-gray-200'>
								<div className='bg-gray-100 font-semibold py-4 px-6 w-1/3 text-right'>
									Quick Filter
								</div>
								<div className='px-8'>
									{dishDetails.is_quick_filter == 1 ? (
										<ToggleOnIcon
											style={{ color: 'green', fontSize: '35' }}
										/>
										) : (
											<ToggleOffIcon
												style={{ color: 'red', fontSize: '35' }}
											/>
									)}
								</div>
							</div>

							<div className='flex flex-row items-center border-t border-gray-200'>
								<div className='bg-gray-100 font-semibold py-4 px-6 w-1/3 text-right'>
									Description
								</div>
								<div style={{overflowWrap:"break-word",width: '65%'}} className='px-8'>{dishDetails.description}</div>
							</div>

						</div>
					</>
				)}
			</div>
		</div>
	);
}

export default ViewDish;
