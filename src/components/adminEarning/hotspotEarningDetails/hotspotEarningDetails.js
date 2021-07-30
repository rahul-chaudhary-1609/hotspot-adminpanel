import React, { useEffect, useState } from 'react';
import TableModal from '../../TableModal/index';
import { getOrderDeliveryDetailById } from '../../../api';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { formatDate ,formatTime} from '../../../utils/redableDateTime';

const HotspotEarningDetails = (props) => {
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
		{
			id: 4,
			Header: 'Date',
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>
						{item.delivery_datetime && formatDate(item.delivery_datetime)}
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
						{formatTime(item.delivery_datetime)}
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
			Header: 'Total amount',
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
			Header: 'Tip',
			width: 50,
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>
						{item.tip_amount}
					</div>
				);
			},
		},

		{
			id: 11,
			Header: 'Order amount',
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>
						${parseFloat(item.amount)- parseFloat(item.tip_amount)}
					</div>
				);
			},
		},
		{
			id: 12,
			Header: 'Restaurant Fee (% Fee)',
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>
						${item.order_details.restaurant.fee + "(" + parseFloat(item.order_details.restaurant.percentage_fee) + "%)"} 
					</div>
				);
			},
		},
	];

	useEffect(() => {
		let { order_delivery_id, startDate, endDate } = props.selectedEarning;
		setLoading(true);
		getOrderDeliveryDetailById(
			token,
			order_delivery_id,
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

export default HotspotEarningDetails;
