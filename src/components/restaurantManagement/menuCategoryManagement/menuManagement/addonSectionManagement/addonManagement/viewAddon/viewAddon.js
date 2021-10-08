/**
 * The file is covered under Algoworks Work Product License for Design & Development of Mobile Application for “Hotspot”.
 * Please review the license for full details.
 * This program is not free software: You cannot redistribute it for any use under the terms of the Algoworks Work Product License for Design & Development of Mobile Application for “Hotspot”.
 * However the source can be modified and updated for the working of the application Design & Development of Mobile Application for “Hotspot” for which it was licensed.
*/


import React, { useEffect, useState } from 'react';
import { getAddon ,toggleAddonStatus, deleteAddon, deleteDishAddon} from '../../../../../../../api';
import {useSelector } from 'react-redux';
import { useHistory, useParams,useLocation } from 'react-router-dom';
import StatusManagement from '../../../../../../statusManagement/statusManagement';
import DeleteModal from '../../../../../../deleteModal/deleteModal';
import Loader from '../../../../../../../globalComponent/layout/loader';

const ViewAddon = () => {
    const history = useHistory();
	const params = useParams();
    const location = useLocation();

	const [addonDetails, setAddonDetails] = useState(null);
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
					dish_addon_id:params.addonId,
				}
			}
			const res = await getAddon(
				token,
				data
			);

			setAddonDetails(res.dishAddon);
		} catch (error) {
			console.log(error);
		}
	};

	const handleStatusChange = async() => {
		try {
				const status = addonDetails.status == 1 ? 0 : 1;
                let data={
                    body:{
                        dish_addon_id:params.addonId,
                    }
                }
				const res = await toggleAddonStatus(token, data);
				if (res.status == 200) {
					history.push(`/restaurant/${params.restaurantId}/menuCategory/${params.menuCategoryId}/menu/${params.dishId}/addonSection/${params.sectionId}/addon`);
				}
			} catch (error) {
				console.log(error);
			}
	};

	const handleDelete = async() =>{
		try {
            let data={
                body:{
                    dish_addon_id:params.addonId,
                }
            }
			const res = await deleteAddon(token, data);
			if (res.status == 200) {
				history.push(`/restaurant/${params.restaurantId}/menuCategory/${params.menuCategoryId}/menu/${params.dishId}/addonSection/${params.sectionId}/addon`);
				setDeleteModal(false);
			}
		} catch (error) {
			console.log(error);
		}
	}
	return (
		<div className='main-content md:pb-5 flex-1 p-8 px-2' style={{ overflowY: 'auto', height: '100vh' }}>
				<div id='recipients' className='p-4 md:p-8 mt-6 lg:mt-0 rounded shadow bg-white'>
					<h1 className='text-xl'>Addon Management</h1>
				{!addonDetails ?
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
									Addon Details
								</button>
								{/* <button
									style={{ height: '3rem' }}
									onClick={() => history.push(`/restaurant/${params.restaurantId}/menuCategory/${params.menuCategoryId}/menu/${params.dishId}/addonSection`)}
									className='shadow bg-500 mt-10 ml-3 hover:bg-white-400 focus:shadow-outline focus:outline-none text-black font-bold py-1 px-4 rounded'
									type='button'>
									Addon Section Management
								</button> */}
							</div>
							<div>
								<button
									style={{ height: '3rem' }}
									onClick={() => history.push(`/restaurant/${params.restaurantId}/menuCategory/${params.menuCategoryId}/menu/${params.dishId}/addonSection/${params.sectionId}/addon`)}
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
								<StatusManagement {...{ setIsOpen, modalIsOpen, details: addonDetails,handleStatusChange, name:'Addon' }} />
							

								<button
									style={{ height: '3rem' }}
									onClick={() => history.push(`/restaurant/${params.restaurantId}/menuCategory/${params.menuCategoryId}/menu/${params.dishId}/addonSection/${params.sectionId}/editAddon/${params.addonId}`)}
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
								name:'Addon'
								
							}}/>
						
						<div className='form-layout text-base border border-gray-200'>


							<div className='flex flex-row items-center border-t border-gray-200'>
								<div className='bg-gray-100 font-semibold py-4 px-6 w-1/3 text-right'>
									Name
								</div>
								<div className='px-8'>{addonDetails.name}</div>
							</div>

							<div className='flex flex-row items-center border-t border-gray-200'>
								<div className='bg-gray-100 font-semibold py-4 px-6 w-1/3 text-right'>
									Actual Price ($)
								</div>
								<div className='px-8'>{addonDetails.price}</div>
							</div>

							<div className='flex flex-row items-center border-t border-gray-200'>
								<div className='bg-gray-100 font-semibold py-4 px-6 w-1/3 text-right'>
									Markup Price ($)
								</div>
								<div className='px-8'>{addonDetails.markup_price?addonDetails.markup_price:0.00}</div>
							</div>

							<div className='flex flex-row items-center border-t border-gray-200'>
								<div className='bg-gray-100 font-semibold py-4 px-6 w-1/3 text-right'>
									Final Price ($)
								</div>
								<div className='px-8'>{addonDetails.markup_price?parseFloat((parseFloat(addonDetails.price)+parseFloat(addonDetails.markup_price)).toFixed(2)):addonDetails.price}</div>
							</div>

						</div>
					</>
				)}
			</div>
		</div>
	);
}

export default ViewAddon;
