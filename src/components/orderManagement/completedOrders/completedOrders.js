import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import Pagination from 'react-js-pagination';
import { Link } from 'react-router-dom';
import moment from 'moment';
import SearchBox from '../../../globalComponent/layout/search';
import { getCompletedOrders } from '../../../api';
import { useSelector, useDispatch } from 'react-redux';
import ButtonLayouts from '../buttonLayouts';

const CompletedOrder = () => {
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
									to={`/completedOrders/orderDetails/${item.orderId}`}
									style={{color:'#39B7CD'}}>
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
						{item.delivery_datetime.split('T')[0]}
					</div>
				);
			},
		},
		{
			id: 3,
			Header: 'Delivery Time',
			className: 'text-center view-details',
			accessor: (item) => {
				//  console.log(item.id);
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>
						{moment(item.delivery_datetime).format(
							'h:mm A'
						)}
					</div>
				);
			},
		},
		{
			id: 4,
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
			id: 5,
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
			id: 6,
			width: 100,
			Header: 'Order Value',
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}> $ {item.amount}</div>
				);
			},
		},
		{
			id: 7,
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
			id: 8,
			Header: 'Status',
			width: 100,
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
		},
		{
			id: 9,
			Header: 'Delivered by',
			width: 100,
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>{item.driver}</div>
				);
			},
		},
	];
	const token = useSelector((state) => state.auth.isSignedIn);
	const dispatch = useDispatch();

	const val = useSelector((state) => state.auth.searchText);
	let searchText = val ? val : '';
	const [error, setError] = useState(null);

	const [pageSize, setPageSize] = useState(10);
	const [activePage, setCurrentPage] = useState(1);
	const [totalItems, setTotalItems] = useState(null);

	const [completedOrder, setCompletedOrders] = useState([]);
	const [statusFilter, setStatusFilter] = useState(null);
	const [loading, setLoading] = useState(false);

	const [startId, setStartId] = useState(0);
	let endId = startId < 0 ? 0 : startId + completedOrder.length;


	useEffect(() => {
		getcompletedOrders();
	}, [searchText, statusFilter, activePage]);

	const getcompletedOrders = () => {
		setLoading(true);
		getCompletedOrders(token, searchText, activePage, pageSize)
			.then((order) => {
				let newStartId = pageSize * (activePage - 1);
				setStartId(newStartId);
				
				setError(null);
				setTotalItems(order.orderList.count);
				setCompletedOrders(order.orderList.rows);
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
				setCompletedOrders([]);
			});
	};

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	return (
		<>
			<div
				className='main-content pb-16 md:pb-5 flex-1 pt-20 px-2'
				style={{ overflowY: 'unset', height: '100vh' }}
				>
				<div style={{ marginLeft: '1rem', fontSize: '2rem' }}>Orders</div>
				<ButtonLayouts />
				<div className='flex mt-10 ml-3'>
					<div className='w-full  md:w-1/2 px-3  mb-6 md:mb-0 search-text'>
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
					data={completedOrder}
					className='-highlight'
					columns={columns}
					style={{
						width: '96%',
						marginTop: '30px',
						marginLeft: '20px',
					}}
					loading={loading}
				/>
				<br />
				<p
					style={{
						marginLeft: '20px',
					}}>
					(Showing {startId < 0 ? 0 : startId + 1} - {endId} of {totalItems})
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
		</>
	);
};

export default CompletedOrder;
