/**
 * The file is covered under Algoworks Work Product License for Design & Development of Mobile Application for “Hotspot”.
 * Please review the license for full details.
 * This program is not free software: You cannot redistribute it for any use under the terms of the Algoworks Work Product License for Design & Development of Mobile Application for “Hotspot”.
 * However the source can be modified and updated for the working of the application Design & Development of Mobile Application for “Hotspot” for which it was licensed.
*/

import React, { useEffect, useState } from 'react';
import ReactTable from 'react-table';
import Pagination from 'react-js-pagination';
import { getRestaurantEarningListById } from '../../../api';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { formatDate } from '../../../utils/redableDateTime';
import { Link } from 'react-router-dom';
import { useHistory, useLocation, useParams } from 'react-router';


const RestaurantPaymentDetails = (props) => {
	const token = useSelector((state) => state.auth.isSignedIn);
	const {state} = useLocation();
	const { id } = useParams();
	const history = useHistory();
	const [pageSize, setPageSize] = useState(10);
	const [totalItems, setTotalItems] = useState(null);
	const [activePage, setCurrentPage] = useState(1);
	const [earningList, setEarningList] = useState([]);
	const [loading, setLoading] = useState(false);

	const [startId, setStartId] = useState(0);
	let endId = startId < 0 ? 0 : startId + earningList.length;
	let currentId = startId;

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
			Header: 'Delivery ID',
			width:125,
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px' }}>
						{item.order_delivery_id}
					</div>
				);
			},
		},
		{
			id: 3,
			Header: 'Order ID',
			width: 120,
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<>
						<div
							className='flex items-center'
							style={{ cursor: 'pointer', textAlign: 'center',padding: '6px' }}>
							<div className='text-sm'>
								<Link
									to={`/activeOrder/${item.order_id}`}
									style={{ color: '#39B7CD' }}>
									{item.order_id}
								</Link>
							</div>
						</div>
					</>
				);
			},
		},
		// {
		// 	id: 4,
		// 	Header: 'Date',
		// 	className: 'text-center view-details',
		// 	accessor: (item) => {
		// 		return (
		// 			<div style={{ padding: '6px', cursor: 'pointer' }}>
		// 				{item.delivery_datetime && formatDate(item.delivery_datetime)}
		// 			</div>
		// 		);
		// 	},
		// },
		// {
		// 	id: 5,
		// 	Header: 'Delivery Time',
		// 	width: 100,
		// 	className: 'text-center view-details',
		// 	accessor: (item) => {
		// 		return (
		// 			<div style={{ padding: '6px', cursor: 'pointer' }}>
		// 				{moment(item.delivery_datetime).format('h:mm A')}
		// 			</div>
		// 		);
		// 	},
		// },
		{
			id: 4,
			Header: 'Hotspot',
			width: 100,
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>
						{item.HotspotLocation && item.HotspotLocation.name}
					</div>
				);
			},
		},
		{
			id: 5,
			Header: 'Dropoff',
			width: 100,
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>
						{item.HotspotDropoff && item.HotspotDropoff.dropoff_detail}
					</div>
				);
			},
		},
		{
			id: 6,
			Header: 'Customer Name',
			width: 125,
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>
						{item.order_details.customer.name}
					</div>
				);
			},
		},
		{
			id: 7,
			Header: 'Amount',
			width: 100,
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>
						${item.amount}
					</div>
				);
			},
		},
		{
			id: 8,
			Header: 'Actual Amt',
			width: 120,
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>
						${parseFloat(item.order_details.amount_details.totalActualPrice).toFixed(2)}
					</div>
				);
			},
		},
		{
			id: 9,
			Header: 'Markup Amt',
			width: 120,
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>
						${(parseFloat(item.amount)-parseFloat(item.order_details.amount_details.totalActualPrice)).toFixed(2)}
					</div>
				);
			},
		},
		{
			id: 10,
			Header: 'Restaurant',
			width: 150,
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>
						{item.Restaurant.restaurant_name}
					</div>
				);
			},
		},
	];

	useEffect(() => {
		setLoading(true);
		getRestaurantEarningListById(
			token,
			id,
			activePage,
			pageSize
		)
			.then((res) => {
				setEarningList(res.rows);
				setTotalItems(res.count);
				let newStartId = pageSize * (activePage - 1);
				setStartId(newStartId);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
			});
	}, [activePage]);

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	return (
		<>
			<div
				className='main-content pb-16 md:pb-5 flex-1 pt-20 px-2 '
				style={{ overflowY: 'scroll', height: '100vh' }}>
				<div
					id='recipients'
					className='p-4 md:p-8 lg:mt-0 rounded shadow bg-white'>
					<div className='flex flex-wrap -mx-3' style={{justifyContent: 'space-between' }}>
						<h1 className='text-xl'>Restaurant Payment Management Details</h1>
						<button
							style={{ height: '3rem' }}
							onClick={() => history.push('/restaurantPayment')}
							className='shadow bg-red-500 hover:bg-red-400  focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
							type='button'>
							Back
						</button>
					</div>
					<div
						className='stripe hover'
						style={{
							paddingTop: '1em',
							paddingBottom: '1em',
							width: '100%',
						}}>
						<ReactTable
							showPagination={false}
							minRows={0}
							NoDataComponent={() => null}
							defaultPageSize={pageSize}
							data={earningList}
							className='-highlight'
							columns={columns}
						/>
					</div>
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
		</>
	);
};

export default RestaurantPaymentDetails;
