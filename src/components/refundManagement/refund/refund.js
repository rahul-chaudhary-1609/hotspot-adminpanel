/**
 * The file is covered under Algoworks Work Product License for Design & Development of Mobile Application for “Hotspot”.
 * Please review the license for full details.
 * This program is not free software: You cannot redistribute it for any use under the terms of the Algoworks Work Product License for Design & Development of Mobile Application for “Hotspot”.
 * However the source can be modified and updated for the working of the application Design & Development of Mobile Application for “Hotspot” for which it was licensed.
*/

import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import Pagination from 'react-js-pagination';
import { Link } from 'react-router-dom';
import moment from 'moment';
import SearchBox from '../../../globalComponent/layout/search';
import CustomSelect from '../../../globalComponent/layout/select';
import { listRefunds } from '../../../api';
import { useSelector , useDispatch} from 'react-redux';
import ButtonLayouts from '../buttonLayouts';
import { formatDate,formatTime } from '../../../utils/redableDateTime';

const RefundManagement = () => {
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
	const [refunds, setRefunds] = useState([]);
	// const [statusFilter, setStatusFilter] = useState(null);
	const [loading, setLoading] = useState(false);

	const [startId, setStartId] = useState(0);
	let endId = startId < 0 ? 0 : startId + refunds.length;


	const columns = [
		{
			Header: 'Refund ID',
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
									to={`/refunds/${item.refund_id}`}
									style={{color:'#39B7CD	'}}>
									{item.refund_id}
								</Link>
							</div>
						</div>
					</>
				);
			},
		},
		{
			Header: 'Order ID',
			width: 100,
			id: 2,
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<>
						<div
							className='flex items-center'
							style={{ cursor: 'pointer', textAlign: 'center' }}>
							<div className='text-sm'>
								<Link
									to={`/orderDetails/${item.order_id}`}
									style={{color:'#39B7CD	'}}>
									{item.order_id}
								</Link>
							</div>
						</div>
					</>
				);
			},
		},
		{
			id: 3,
			Header: 'Customer Name',
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>
						{item.refund_details.order_details.customer.name}
					</div>
				);
			},
		},
		{
			id: 4,
			Header: 'Restaurant Name',
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>
						{item.refund_details.order_details.restaurant.restaurant_name}
					</div>
				);
			},
		},
		{
			id: 5,
			Header: 'Hostpot Name',
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>
						{item.refund_details.order_details.hotspot.name}
					</div>
				);
			},
		},
		{
			id: 6,
			Header: 'Refund Value($)',
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>
						${item.refund_value}
					</div>
				);
			},
		},
		{
			id: 7,
			Header: 'Refund Type',
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>
						{item.type==1?"Hotspot Credit":"Card Refund"}
					</div>
				);
			},
		},
	];

	useEffect(() => {
		getscheduledOrders();
	}, [searchText, statusFilter, activePage]);

	const getscheduledOrders = () => {
		setLoading(true);
		let currentPage = searchText.length > 0 ? 1 : activePage;

		let data={
			query:{
				page:currentPage,
				page_size:pageSize,
			}
		}

		if(searchText && searchText.trim()!=""){
			data.query.search_key=searchText;
		}

		listRefunds(token, data)
			.then((response) => {
				console.log("response",response)
				let newStartId = pageSize * (activePage - 1);
				setStartId(newStartId);
				setError(null);
				setTotalItems(response.refunds.count);
				setRefunds(response.refunds.rows);
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
				setRefunds([]);
			});
	};

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	return (
		<>
			<div className='main-content md:pb-5 flex-1 p-8 px-2' style={{ overflowY: 'auto', height: '100vh' }}>
				<div id='recipients' className='p-4 md:p-8 mt-6 lg:mt-0 rounded shadow bg-white'>
					<h1 className='text-xl'>Refund Management</h1>
              	<ButtonLayouts/>
			  		<div className='flex flex-wrap -mx-3 mb-6 mt-5'>
						<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0 search-text'>
						<SearchBox
							placeholder='Search by Order ID'
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
					defaultPageSize={pageSize}
					data={refunds}
					className='-highlight'
					columns={columns}
					loading={loading}
				/>
				<br/>
					<p
					style={{
						marginLeft: '20px',
					}}>
						{console.log("startId",startId,endId,refunds.length)}
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

export default RefundManagement;
