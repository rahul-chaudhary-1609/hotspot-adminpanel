import React, { useEffect, useState } from 'react';
import TableModal from '../../TableModal/index';
import { getRestaurantEarningListById } from '../../../api';
import { useSelector } from 'react-redux';
import moment from 'moment';

const ViewRestaurantPaymentDetails = (props) => {
	const token = useSelector((state) => state.auth.isSignedIn);

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
			Header: 'Delivery Id',
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer', color: '#39B7CD' }}>
						{item.order_delivery_id}
					</div>
				);
			},
		},
		{
			id: 3,
			Header: 'Order Id',
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>
						{item.order_id}
					</div>
				);
			},
		},
		{
			id: 4,
			Header: 'Date',
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>
						{item.delivery_datetime && item.delivery_datetime.split('T')[0]}
					</div>
				);
			},
		},
		{
			id: 5,
			Header: 'Delivery Time',
			width: 100,
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>
						{moment(item.delivery_datetime).format('h:mm A')}
					</div>
				);
			},
		},
		{
			id: 6,
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
			id: 7,
			Header: 'Drop off location',
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
			id: 8,
			Header: 'Customer Name',
			width: 100,
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
			id: 9,
			Header: 'Order amount',
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
		let { restaurantId, startDate, endDate } = props.selectedRestaurant;
		setLoading(true);
		getRestaurantEarningListById(
			token,
			restaurantId,
			startDate,
			endDate,
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
	return (
		<>
			<TableModal
				{...{
					tableModal: props.tableModal,
					columns,
					setTableModal: props.setTableModal,
					data: earningList,
					setCurrentPage,
					totalItems,
					pageSize,
					startId,
					endId,
					loading,
				}}
			/>
		</>
	);
};

export default ViewRestaurantPaymentDetails;
