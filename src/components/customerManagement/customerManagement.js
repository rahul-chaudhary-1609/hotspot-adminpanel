import React, { useEffect, useState } from 'react';
import ReactTable from 'react-table';
import Pagination from 'react-js-pagination';
import 'react-table/react-table.css';
import SearchBox from '../../globalComponent/layout/search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import {
	getCustomerLists,
	getCustomerById,
	changeCustomerStatus,
} from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import ToggleOffIcon from '@material-ui/icons/ToggleOff';
import ToggleOnIcon from '@material-ui/icons/ToggleOn';
import StatusManagement from '../statusManagement/statusManagement';
import {formatDate} from '../../utils/redableDateTime'

const CustomerManagement = () => {
	const history = useHistory();

	const token = useSelector((state) => state.auth.isSignedIn);
	const dispatch = useDispatch();
	const val = useSelector((state) => state.auth.searchText);
	let searchText = val ? val : '';

	const [customerLists, setCustomerLists] = useState([]);
	const [activePage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [totalItems, setTotalItems] = useState(null);
	const [id, setId] = useState(null);
	const [modalIsOpen, setIsOpen] = useState(false);

	const [startId, setStartId] = useState(0);
	const [customerDetails, setCustomerDetails] = useState(null);

	const [showStatus, setShowStatus] = useState(false);

	let endId = startId < 0 ? 0 : startId + customerLists.length;

	let currentId = startId;
	const [error, setError] = useState(false);

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
								<p className='text-gray-300 leading-none '>{currentId}</p>
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
			className: 'text-center view-details',
			width: 400,
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
			className: 'text-center view-details ',
			resizable: true,
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>
						{item.phone &&
							`(${item.phone.slice(0, 3)}) ${item.phone.slice(
								3,
								6
							)}-${item.phone.slice(6)}`}

						{/* {item.phone} */}
					</div>
				);
			},
		},
		{
			id: 5,
			Header: 'City',
			width: 150,
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>{item.city}</div>
				);
			},
		},
		{
			id: 6,
			Header: 'State',
			width: 150,
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>{item.state}</div>
				);
			},
		},
		{
			id: 7,
			Header: 'Signup date',
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
			id: 8,
			Header: 'Status',
			width: 100,
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div
						className={item.status == 1 ? 'text-green-600' : 'text-red-600'}
						style={{ padding: '6px', cursor: 'pointer' }}>
						{item.status == 1 ? 'Active' : 'Inactive'}
					</div>
				);
			},
		},
		{
			id: 9,
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
							onClick={() => history.push(`/customer/${item.id}`)}
							// className='text-red-600 trash w-5 h-5'
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
	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	useEffect(() => {
		if (id) {
			getCustomer();
		}
	}, [id, showStatus]);

	useEffect(() => {
		getCustomerList();
	}, [searchText, activePage]);

	const getCustomerList = async () => {
		let currentPage = searchText.length > 0 ? 1 : activePage;
		try {
			const res = await getCustomerLists(
				token,
				searchText,
				currentPage,
				pageSize
			);
			if (res.success) {
				let newStartId = pageSize * (activePage - 1);
				setStartId(newStartId);
				setError(null);

				setTotalItems(res.customerList.count);
				setCustomerLists(res.customerList.rows);
				if (searchText.length) {
					setCurrentPage(1);
				}
			}
		} catch (error) {
			setError(error);
			let newStartId = startId - 1;
			setStartId(newStartId);
			setTotalItems(0);
			setCustomerLists([]);
		}
	};

	const getCustomer = async () => {
		try {
			const res = await getCustomerById(token, id);
			if (res.status == 200) {
				setCustomerDetails(res.customer);
				setIsOpen(true);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleStatusChange = async () => {
		try {
			const status = customerDetails.status == 1 ? 0 : 1;
			const res = await changeCustomerStatus(token, id, status);
			if (res.status == 200) {
				history.push('/customer');
				setIsOpen(false);
				getCustomerList();
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<>
			<div className='main-content md:pb-5 flex-1 p-8 px-2' style={{ overflowY: 'auto', height: '100vh' }}>
				<div id='recipients' className='p-4 md:p-8 mt-6 lg:mt-0 rounded shadow bg-white'>
					<h1 className='text-xl'>Customer Management</h1>
					<div className='flex flex-wrap -mx-3 mb-6 mt-5'>
						<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0 search-text'>
							<SearchBox
								placeholder='Search by name, email address, city,state'
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
						data={customerLists}
						className='-highlight'
						columns={columns}
						style={{
							width: '100%',
						}}
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
						details: customerDetails,
						handleStatusChange,
						name: 'Customer',
					}}
				/>
			)}
		</>
	);
};

export default CustomerManagement;
