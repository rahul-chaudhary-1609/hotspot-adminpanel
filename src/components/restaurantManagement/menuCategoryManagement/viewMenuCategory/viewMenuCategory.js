/**
 * The file is covered under Algoworks Work Product License for Design & Development of Mobile Application for “Hotspot”.
 * Please review the license for full details.
 * This program is not free software: You cannot redistribute it for any use under the terms of the Algoworks Work Product License for Design & Development of Mobile Application for “Hotspot”.
 * However the source can be modified and updated for the working of the application Design & Development of Mobile Application for “Hotspot” for which it was licensed.
*/


import React, { useEffect, useState } from 'react';
import { getMenuCategory ,toggleMenuCategoryStatus, deleteMenuCategory} from '../../../../api';
import {useSelector } from 'react-redux';
import { useHistory, useParams,useLocation } from 'react-router-dom';
import StatusManagement from '../../../statusManagement/statusManagement';
import DeleteModal from '../../../deleteModal/deleteModal';
import Loader from '../../../../globalComponent/layout/loader';

const ViewMenuCategory = () => {
	const history = useHistory();
	const params = useParams();
    const location = useLocation();

	const [menuCategoryDetails, setMenuCategoryDetails] = useState(null);
	const token = useSelector((state) => state.auth.isSignedIn);
	const [modalIsOpen, setIsOpen] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);

	useEffect(() => {
		if(params.id && parseInt(params.id))
		{
			getMenuCategoryDetails();
		}else{
			history.push('/login')
		}
	}, []);

	const getMenuCategoryDetails = async () => {
		try {
            let data={
				params:{
					category_id:params.id,
				}
			}
            console.log("location",location)
			const res = await getMenuCategory(
				token,
				data
			);
            console.log("res",res)

			setMenuCategoryDetails(res.category);
		} catch (error) {
			console.log(error);
		}
	};

	const handleStatusChange = async() => {
		try {
				const status = menuCategoryDetails.status == 1 ? 0 : 1;
                let data={
                    body:{
                        category_id:params.id,
                    }
                }
				const res = await toggleMenuCategoryStatus(token, data);
				if (res.status == 200) {
					history.goBack();
				}
			} catch (error) {
				console.log(error);
			}
	};

	const handleDelete = async() =>{
		try {
            let data={
                body:{
                    category_id:params.id,
                }
            }
			const res = await deleteMenuCategory(token, data);
			if (res.status == 200) {
				history.goBack();
				setDeleteModal(false);
				getMenuCategoryDetails();
			}
		} catch (error) {
			console.log(error);
		}
	}
	return (
		<div className='main-content md:pb-5 flex-1 p-8 px-2' style={{ overflowY: 'auto', height: '100vh' }}>
				<div id='recipients' className='p-4 md:p-8 mt-6 lg:mt-0 rounded shadow bg-white'>
					<h1 className='text-xl'>Menu Category Management</h1>
				{!menuCategoryDetails ?
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
									Menu Category Details
								</button>
								<button
									style={{ height: '3rem' }}
									onClick={() => history.push(`/restaurant/${params.id}/menuCategory`)}
									className='shadow bg-500 mt-10 ml-3 hover:bg-white-400 focus:shadow-outline focus:outline-none text-black font-bold py-1 px-4 rounded'
									type='button'>
									Menu Management
								</button>
							</div>
							<div>
								<button
									style={{ height: '3rem' }}
									onClick={() => history.goBack()}
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
								<StatusManagement {...{ setIsOpen, modalIsOpen, details: menuCategoryDetails,handleStatusChange, name:'Menu Category' }} />
							

								<button
									style={{ height: '3rem' }}
									onClick={() => history.push(`/restro/${params.id}`)}
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


							<div className='flex flex-row items-center '>
								<div className='bg-gray-100 font-semibold py-4 px-6 w-1/3 text-right'>
									Name
								</div>
								<div className='px-8'>{menuCategoryDetails.name}</div>
							</div>

						</div>
					</>
				)}
			</div>
		</div>
	);
}

export default ViewMenuCategory;
