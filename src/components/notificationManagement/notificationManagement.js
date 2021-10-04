/**
 * The file is covered under Algoworks Work Product License for Design & Development of Mobile Application for “Hotspot”.
 * Please review the license for full details.
 * This program is not free software: You cannot redistribute it for any use under the terms of the Algoworks Work Product License for Design & Development of Mobile Application for “Hotspot”.
 * However the source can be modified and updated for the working of the application Design & Development of Mobile Application for “Hotspot” for which it was licensed.
*/

import React, { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import ReactTable from 'react-table';
import Pagination from 'react-js-pagination';
import { getNotifications , deleteNotification} from '../../api';
import { useSelector } from 'react-redux';
import 'react-table/react-table.css';
import DeleteModal from '../deleteModal/deleteModal';

const NotificationManagement = () => {
	const history = useHistory();
	const token = useSelector((state) => state.auth.isSignedIn);
	const [activePage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [totalItems, setTotalItems] = useState(null);

	const [notificationDetails, setNotificationDetails] = useState([]);
	const [deleteModal, setDeleteModal] = useState(false);

	const [id, setId] = useState();

	const [startId, setStartId] = useState(0);

	let endId = startId < 0 ? 0 : startId + notificationDetails.length;
	let currentId = startId;
	const [error, setError] = useState();
	const [loading, setLoading] = useState(false);

	const columns = [
		{
			Header: '#',
			width: 30,
			id: 1,
			className: 'text-center view-details',
			accessor: (item) => {
				currentId++;
				return (
					<>
						<div className='flex items-center' style={{ cursor: 'pointer' }}>
							<div className='text-sm'>
								<p className='text-gray-300 leading-none'>{currentId}</p>
							</div>
						</div>
					</>
				);
			},
		},
		{
			id: 2,
			Header: 'Title',
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>
						{item.title}
					</div>
				);
			},
		},
		{
			id: 3,
			Header: 'Description',
			className: 'text-center view-details',
			accessor: (item) => {
				return (					
					<div style={{ padding: '6px', cursor: 'pointer' }}>
						{item.description.length < 35
						? `${item.description}`
						: `${item.description.substring(0, 34)}....`}
					</div>
				);
			},
		},
		{
			id: 4,
			Header: 'Action',
			className: 'text-center view-details',
			accessor: (item) => {
				//menumanagement
				return (
					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-around',
						}}
						className='text-center'
						onClick={(e) => e.stopPropagation()}>
						<FontAwesomeIcon
							style={{ cursor: 'pointer' }}
							onClick={() => history.push({pathname:`/notification/${item.id}`, state:item})}
							className='text-red-600 trash w-5 h-5'
							color='red'
							icon={faEye}
						// />
						// <FontAwesomeIcon
						// 	className='text-red-600 trash w-1 h-5'
						// 	onClick={() => {
						// 		setDeleteModal(true);
		                //           setId(item.id);
						// 	}}
						// 	color='red'
						// 	icon={faTrashAlt}
						 />
					</div>
				);
			},
		},
	]

	useEffect(() => {
			getNotification();
		},
		[activePage]
	);

	const getNotification = () => {
		setLoading(true);
		
		getNotifications(token, activePage, pageSize)
			.then((resp) => {
				setLoading(false);
				let newStartId = pageSize * (activePage - 1);
				setStartId(newStartId);
				setError(null);
				setNotificationDetails(resp.notifications.rows);
				setTotalItems(resp.notifications.count);
			})
			.catch((error) => {
				setLoading(false);
				setError(error);
				let newStartId = startId - 1;
				setStartId(newStartId);
				setTotalItems(0);
				setNotificationDetails([]);
			});
	};
	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	const handleDelete=()=>{
		deleteNotification(token, id)
			.then((resp) => {
				setDeleteModal(false);
                getNotification();
			})
			.catch((error) => {
				console.log(error);
			});
	}
	return (
		<>
			<div className='main-content md:pb-5 flex-1 p-8 px-2' style={{ overflowY: 'auto', height: '100vh' }}>
				<div id='recipients' className='p-4 md:p-8 mt-6 lg:mt-0 rounded shadow bg-white'>
					<h1 className='text-xl'>Notification Management</h1>
					<div className='flex flex-wrap -mx-3 mb-6 mt-5' style={{justifyContent: 'space-between' }}>
							<div style={{position: "relative",left: "89%"}}>
						<button
							style={{ height: '3rem' }}
							onClick={() => history.push('/addNotification')}
							className='shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
							type='button'>
							Add New
						</button>
					</div>
					</div>
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
					<ReactTable
						showPagination={false}
						minRows={0}
						loading={loading}
						NoDataComponent={() => null}
						defaultPageSize={10}
						data={notificationDetails}
						className='-highlight'
						columns={columns}
					/>
					<br/>
					{totalItems > 0 ? `(showing ${startId + 1} - ${endId} of ${totalItems})` : 'showing 0 result'}
					<div style={{ textAlign: 'right' }}>
						<Pagination
							activePage={activePage}
							itemsCountPerPage={pageSize}
							totalItemsCount={totalItems}
							pageRangeDisplayed={3}
							onChange={handlePageChange}
						/>
					</div>
				</div>
			</div>
			
			<DeleteModal 	{...{ deleteModal, setDeleteModal, name:'Notification', handleDelete }}/>
		</>
	);
};

export default NotificationManagement;
