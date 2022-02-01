/**
 * The file is covered under Algoworks Work Product License for Design & Development of Mobile Application for “Hotspot”.
 * Please review the license for full details.
 * This program is not free software: You cannot redistribute it for any use under the terms of the Algoworks Work Product License for Design & Development of Mobile Application for “Hotspot”.
 * However the source can be modified and updated for the working of the application Design & Development of Mobile Application for “Hotspot” for which it was licensed.
*/


import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import Pagination from 'react-js-pagination';
import 'react-table/react-table.css';
import SearchBox from '../../globalComponent/layout/search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faEye
} from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listDriver, getDriverById, changeDriverStatus } from '../../api';
import ToggleOffIcon from '@material-ui/icons/ToggleOff';
import ToggleOnIcon from '@material-ui/icons/ToggleOn';
import StatusManagement from '../statusManagement/statusManagement';
import { formatDate } from '../../utils/redableDateTime';

const DriverManagement = () => {
	const history = useHistory();
	const token = useSelector((state) => state.auth.isSignedIn);
	const dispatch = useDispatch();
	const val = useSelector((state) => state.auth.searchText);
	let searchText = val ? val : '';

	const [driverLists, setDriverLists] = useState([]);
	const [activePage, setCurrentPage] = useState(1);
	const [loading, setLoading] = useState(false);

	const [pageSize, setPageSize] = useState(10);
	const [totalItems, setTotalItems] = useState(null);
	const [driverDetails, setDriverDetails] = useState(null);

	const [id, setId] = useState(null);
	const [modalIsOpen, setIsOpen] = useState(false);

	const [showStatus, setShowStatus] = useState(false);
	const [startId, setStartId] = useState(0);

	let endId = startId < 0 ? 0 : startId + driverLists.length;
	let currentId = startId;
	const [error, setError] = useState();

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
			Header: 'Full Name',
			width: 200,
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>{item.name}</div>
				);
			},
		},
		{
			id: 3,
			Header: 'Email Address',
			width: 250,
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>{item.email}</div>
				);
			},
		},
		{
			id: 4,
			Header: 'Phone Number',
			width: 150,
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>
						{' '}
						{item.phone &&
							`(${item.phone.slice(0, 3)}) ${item.phone.slice(
								3,
								6
							)}-${item.phone.slice(6)}`}
					</div>
				);
			},
		},
		{
			id: 5,
			Header: 'Signup Date',
			width: 100,
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>
						{formatDate(item.signupDate)}
					</div>
				);
			},
		},
		{
			id: 6,
			Header: 'Status',
			width: 80,
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div
						className={(function () {
							if (item.approval_status == 0) {
								return 'text-black-600';
							} else {
								if (item.status == 0) {
									return 'text-red-600';
								} else if (item.status == 1) {
									return 'text-green-600';
								}
							}
						})()}
						style={{ padding: '6px', cursor: 'pointer' }}>
						{(function () {
							if (item.approval_status == 0) {
								return 'Pending';
							} else {
								if (item.status == 0) {
									return 'Inactive';
								} else if (item.status == 1) {
									return 'Active';
								}
							}
						})()}
					</div>
				);
			},
		},
		{
			id: 7,
			Header: 'Action',
			className: 'text-center view-details',
			accessor: (item) => {
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
							style={{
								cursor: 'pointer',
								fontSize: '20',
								color: 'red',
								marginTop: '6px',
							}}
							onClick={() => history.push(`/driver/${item.id}`)}
							className='text-red-600 trash w-5 h-5'
							color='red'
							icon={faEye}
						/>
						

						{item.status == 1 ? (
							<ToggleOnIcon
								onClick={() => handleStatus(item.id)}
								style={{ color: 'green', fontSize: '35' }}
							/>
						) : (
							<ToggleOffIcon
								onClick={() => handleStatus(item.id)}
								style={{ color: 'red', fontSize: '35' }}
							/>
						)}
					</div>
				);
			},
		},
	];

	const handleStatus = (id) => {
		setId(id);
		setShowStatus(!showStatus);
	};

	useEffect(() => {
		if (id) {
			getDriverDetails();
		}
	}, [id, showStatus]);

	const getDriverDetails = async () => {
		try {
			const res = await getDriverById(token, id);
			console.log(res);
			if (res.status == 200) {
				setDriverDetails(res);
				setIsOpen(true);
			}
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getDriverList();
	}, [searchText, activePage]);

	const getDriverList = async () => {
		try {
			setLoading(true);
			let currentPage = searchText.length > 0 ? 1 : activePage;
			let data={
				query:{
					is_pagination:1,
					page:currentPage,
					page_size:pageSize,
				}
			}
			if(searchText && searchText.trim()!=""){
				data.query.searchKey=searchText;
			}
			const res = await listDriver(
				token,
				data
			);
			if (res.status == 200) {
				setLoading(false);
				let newStartId = pageSize * (activePage - 1);
				setStartId(newStartId);
				setError(null);
				setTotalItems(res.driverList.count);
				setDriverLists(res.driverList.rows);
				if (searchText.length) {
					setCurrentPage(1);
				}
			}
		} catch (error) {
			setLoading(false);
			setError(error);
			let newStartId = startId - 1;
			setStartId(newStartId);
			setTotalItems(0);
			setDriverLists([]);
		}
	};

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	const handleStatusChange = async () => {
		try {
			const status = driverDetails.personalDetails.status == 1 ? 0 : 1;
			const res = await changeDriverStatus(token, id, status);
			if (res.status == 200) {
				history.push('/driver');
				setIsOpen(false);
				getDriverList();
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<>
			<div className='main-content md:pb-5 flex-1 p-8 px-2' style={{ overflowY: 'auto', height: '100vh' }}>
				<div id='recipients' className='p-4 md:p-8 mt-6 lg:mt-0 rounded shadow bg-white'>
					<h1 className='text-xl'>Driver Management</h1>
					<div className='flex flex-wrap -mx-3 mb-6 mt-5'>
						<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0 search-text'>
							<SearchBox
								placeholder='Search by Name, Email address'
								setSearchText={(val) =>
									dispatch({
										type: 'SEARCH_TEXT',
										payload: val,
									})
								}
								searchText={searchText}
							/>
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
						NoDataComponent={() => null}
						defaultPageSize={pageSize}
						data={driverLists}
						className='-highlight'
						loading={loading}
						columns={columns}
					/>
					<br />
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
			{modalIsOpen && (
				<StatusManagement
					{...{
						setIsOpen,
						modalIsOpen,
						details: driverDetails.personalDetails,
						handleStatusChange,
						name: 'Driver',
					}}
				/>
			)}
		</>
	);
};

export default DriverManagement;
