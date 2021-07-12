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
import { getDriverLists, getDriverById, changeDriverStatus } from '../../api';
import ToggleOffIcon from '@material-ui/icons/ToggleOff';
import ToggleOnIcon from '@material-ui/icons/ToggleOn';
import StatusManagement from '../statusManagement/statusManagement';

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
			width: 400,
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
			width: 200,
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
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>
						{item.signupDate.split('T')[0]}
					</div>
				);
			},
		},
		{
			id: 6,
			Header: 'Status',
			width: 100,
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
							onClick={() => history.push(`/viewDriver/${item.id}`)}
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
			const res = await getDriverLists(
				token,
				searchText,
				currentPage,
				pageSize
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
			<div
				className='main-content pb-16 md:pb-5 flex-1 pt-20 px-2'
				style={{ overflowY: 'scroll', height: '100vh' }}
				>
				<div
					id='recipients'
					className='p-4 md:p-8 mt-6 lg:mt-0 rounded shadow bg-white'>
					<div style={{ display: 'flex' }}>
						<h1 className='text-xl'>Driver Management</h1>
						{/* <button
							style={{ height: '3rem', position: 'absolute', right: '40px' }}
							onClick={() => history.push('/rejectedDrivers')}
							className='shadow bg-red-500 hover:bg-red-400  focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
							type='button'>
							Rejected Drivers
						</button> */}
					</div>
					<div className='flex flex-wrap -mx-3 mb-6 mt-5'>
						<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0 search-text mt-6'>
							<SearchBox
								placeholder='Search by name,email address'
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
						defaultPageSize={10}
						data={driverLists}
						className='-highlight'
						loading={loading}
						columns={columns}
						style={{
							width: '100%',
						}}
					/>
					<br />
					(showing {startId < 0 ? 0 : startId + 1} - {endId} of {totalItems})
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
