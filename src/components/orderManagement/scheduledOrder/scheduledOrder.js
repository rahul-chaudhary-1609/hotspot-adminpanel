import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import Pagination from 'react-js-pagination';
import { Link } from 'react-router-dom';
import moment from 'moment';
import SearchBox from '../../../globalComponent/layout/search';
import CustomSelect from '../../../globalComponent/layout/select';
import { getScheduledOrders } from '../../../api';
import { useSelector , useDispatch} from 'react-redux';
import ButtonLayouts from '../buttonLayouts';
import { formatDate,formatTime } from '../../../utils/redableDateTime';

const ScheduledOrder = () => {
	const columns = [
		{
			Header: 'Order Id',
			width: 100,
			id: 1,
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<>
						<div
							className='flex items-center'
							style={{ cursor: 'pointer', textAlign: 'center' }}>
							<div className='text-sm'>
								<Link
									to={`/scheduledOrders/${item.orderId}`}
									style={{color:'#39B7CD	'}}>
									{item.orderId}
								</Link>
							</div>
						</div>
					</>
				);
			},
		},
		{
			id: 2,
			Header: 'Order Date',
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>
						{formatDate(item.createdAt)}
					</div>
				);
			},
		},
		{
			id: 3,
			Header: 'Delivery Date',
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>
						{formatDate(item.delivery_datetime)}
					</div>
				);
			},
		},
		{
			id: 4,
			Header: 'Delivery Time',
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>
						{formatTime(item.delivery_datetime)}
					</div>
				);
			},
		},
		{
			id: 5,
			Header: 'Customer Name',
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>
						{item.customerName}
					</div>
				);
			},
		},
		{
			id: 6,
			Header: 'Hotspot Name',
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>
						{item.hotspotLocation && item.hotspotLocation.name}
					</div>
				);
			},
		},
		{
			id: 7,
			width: 100,
			Header: 'Order Value',
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>$ {item.amount}</div>
				);
			},
		},
		{
			id: 8,
			Header: 'Restaurant',
			width: 100,
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>
						{item.restaurant}
					</div>
				);
			},
		},
		{
			id: 9,
			Header: 'Status',
			width: 150,
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div
						style={{ padding: '6px', cursor: 'pointer' }}
						className={'text-green-600'}>
						{item.status}
					</div>
				);
			},
		}
	];

	const token = useSelector((state) => state.auth.isSignedIn);
	const dispatch = useDispatch();

	const val = useSelector((state) => state.auth.searchText);
	let searchText = val ? val : '';

	// const [searchText, setSearchText] = useState('');
	const [error, setError] = useState(null);

	const [pageSize, setPageSize] = useState(10);
	const [activePage, setCurrentPage] = useState(1);
	const [totalItems, setTotalItems] = useState(null);
	const statusFilter = useSelector((state) => state.auth.status);
	const [scheduledOrders, setScheduleorders] = useState([]);
	// const [statusFilter, setStatusFilter] = useState(null);
	const [loading, setLoading] = useState(false);

	const [startId, setStartId] = useState(0);
	let endId = startId < 0 ? 0 : startId + scheduledOrders.length;


	useEffect(() => {
		getscheduledOrders();
	}, [searchText, statusFilter, activePage]);

	const getscheduledOrders = () => {
		setLoading(true);
		let status = statusFilter ? statusFilter.value : null;
		let currentPage = searchText.length > 0 ? 1 : activePage;

		getScheduledOrders(token, searchText, currentPage, pageSize, status)
			.then((order) => {
				let newStartId = pageSize * (activePage - 1);
				setStartId(newStartId);
				setError(null);
				setTotalItems(order.orderList.count);
				setScheduleorders(order.orderList.rows);
				setLoading(false);
				if (searchText.length) {
					setCurrentPage(1);
				}
			})
			.catch((error) => {
				setError(error);
				setLoading(false)
				let newStartId = startId - 1;
				setStartId(newStartId);
				setTotalItems(0);
				setScheduleorders([]);
			});
	};

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	return (
		<>
			<div className='main-content md:pb-5 flex-1 p-8 px-2' style={{ overflowY: 'auto', height: '100vh' }}>
				<div id='recipients' className='p-4 md:p-8 mt-6 lg:mt-0 rounded shadow bg-white'>
					<h1 className='text-xl'>Order</h1>
              <ButtonLayouts/>
			  		<div className='flex flex-wrap -mx-3 mb-6 mt-5'>
						<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0 search-text'>
						<SearchBox
							placeholder='Search by Name, Order Id'
							setSearchText={(val) =>
								dispatch({
									type: 'SEARCH_TEXT',
									payload: val,
								})
							}
							searchText={searchText}
						/>
					</div>
					<div style={{ width: '20%' }}>
						<CustomSelect
							 value={statusFilter}
							options={[
								{
									label: 'Pickup',
									value: 0,
								},
								{
									label: 'Pending',
									value: 1,
								},

								{
									label: 'Driver Allocated',
									value: 2,
								},
							
								{
									label: 'All',
									value: '',
								},
							]}
							id='order_type'
							placeholder='Select Status'
							 handleChange={(selectedValue) => 
								{
									{
										dispatch({
											type: 'STATUS',
											payload: selectedValue,
										})
									}
								}
								}
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
							marginTop: '10px',
						}}>
						{error}
					</p>
				)}

				<ReactTable
					showPagination={false}
					minRows={0}
					NoDataComponent={() => null}
					defaultPageSize={10}
					data={scheduledOrders}
					className='-highlight'
					columns={columns}
					loading={loading}
				/>
				<br/>
					<p
					style={{
						marginLeft: '20px',
					}}>
					{totalItems > 0 ? `(showing ${startId + 1} - ${endId} of ${totalItems})` : 'showing 0 result'}
				</p>
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
		</>
	);
};

export default ScheduledOrder;