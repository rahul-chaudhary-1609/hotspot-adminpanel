/**
 * The file is covered under Algoworks Work Product License for Design & Development of Mobile Application for “Hotspot”.
 * Please review the license for full details.
 * This program is not free software: You cannot redistribute it for any use under the terms of the Algoworks Work Product License for Design & Development of Mobile Application for “Hotspot”.
 * However the source can be modified and updated for the working of the application Design & Development of Mobile Application for “Hotspot” for which it was licensed.
*/


import React, { useEffect, useState } from 'react';
import ToggleOffIcon from '@material-ui/icons/ToggleOff';
import ToggleOnIcon from '@material-ui/icons/ToggleOn';
import { getAddonSection ,toggleAddonSectionStatus, deleteAddonSection} from '../../../../../../api';
import {useSelector } from 'react-redux';
import { useHistory, useParams,useLocation } from 'react-router-dom';
import StatusManagement from '../../../../../statusManagement/statusManagement';
import DeleteModal from '../../../../../deleteModal/deleteModal';
import Loader from '../../../../../../globalComponent/layout/loader';

const ViewAddonSection = () => {
	const history = useHistory();
	const params = useParams();
    const location = useLocation();

	const [addonSectionDetails, setAddonSectionDetails] = useState(null);
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
					section_id:params.sectionId,
				}
			}
			const res = await getAddonSection(
				token,
				data
			);

			setAddonSectionDetails(res.section);
		} catch (error) {
			console.log(error);
		}
	};

	const handleStatusChange = async() => {
		try {
				const status = addonSectionDetails.status == 1 ? 0 : 1;
                let data={
                    body:{
                        section_id:params.sectionId,
                    }
                }
				const res = await toggleAddonSectionStatus(token, data);
				if (res.status == 200) {
					history.push(`/restaurant/${params.restaurantId}/menuCategory/${params.menuCategoryId}/menu/${params.dishId}/addonSection`);
				}
			} catch (error) {
				console.log(error);
			}
	};

	const handleDelete = async() =>{
		try {
            let data={
                body:{
                    section_id:params.sectionId,
                }
            }
			const res = await deleteAddonSection(token, data);
			if (res.status == 200) {
				history.push(`/restaurant/${params.restaurantId}/menuCategory/${params.menuCategoryId}/menu/${params.dishId}/addonSection`);
				setDeleteModal(false);
			}
		} catch (error) {
			console.log(error);
		}
	}
	return (
		<div className='main-content md:pb-5 flex-1 p-8 px-2' style={{ overflowY: 'auto', height: '100vh' }}>
				<div id='recipients' className='p-4 md:p-8 mt-6 lg:mt-0 rounded shadow bg-white'>
					<h1 className='text-xl'>Addon Section Management</h1>
				{!addonSectionDetails ?
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
									Section Details
								</button>
								<button
									style={{ height: '3rem' }}
									onClick={() => history.push(`/restaurant/${params.restaurantId}/menuCategory/${params.menuCategoryId}/menu/${params.dishId}/addonSection/${params.sectionId}/addon`)}
									className='shadow bg-500 mt-10 ml-3 hover:bg-white-400 focus:shadow-outline focus:outline-none text-black font-bold py-1 px-4 rounded'
									type='button'>
									Addon Management
								</button>
							</div>
							<div>
								<button
									style={{ height: '3rem' }}
									onClick={() => history.push(`/restaurant/${params.restaurantId}/menuCategory/${params.menuCategoryId}/menu/${params.dishId}/addonSection`)}
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
								<StatusManagement {...{ setIsOpen, modalIsOpen, details: addonSectionDetails,handleStatusChange, name:'Addon Section' }} />
							

								<button
									style={{ height: '3rem' }}
									onClick={() => history.push(`/restaurant/${params.restaurantId}/menuCategory/${params.menuCategoryId}/menu/${params.dishId}/editAddonSection/${params.sectionId}`)}
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
								name:'Addon Section'
								
							}}/>
						
						<div className='form-layout text-base border border-gray-200'>


							<div className='flex flex-row items-center border-t border-gray-200'>
								<div className='bg-gray-100 font-semibold py-4 px-6 w-1/3 text-right'>
									Name
								</div>
								<div className='px-8'>{addonSectionDetails.name}</div>
							</div>

							<div className='flex flex-row items-center border-t border-gray-200'>
								<div className='bg-gray-100 font-semibold py-4 px-6 w-1/3 text-right'>
									Required
								</div>
								<div className='px-8'>
									{addonSectionDetails.is_required == 1 ? (
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
									Multiple Choice
								</div>
								<div className='px-8'>
									{addonSectionDetails.is_multiple_choice == 1 ? (
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

						</div>
					</>
				)}
			</div>
		</div>
	);
}

export default ViewAddonSection;
