import React, { useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router';
import ReactTable from 'react-table';
import Pagination from 'react-js-pagination';
import 'react-table/react-table.css';
import { getDriverEarningListById, getDriverById, getOrgersByDriverId } from '../../../api';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { formatDate,formatTime } from "../../../utils/redableDateTime"

const DriverPaymentDetails = (props) => {
	const history = useHistory();
	const {state} = useLocation();


	const { id } = useParams();
	const token = useSelector((state) => state.auth.isSignedIn);

	const [activePage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [totalItems, setTotalItems] = useState(null);

	const [driverEarningDetails, setDriverEarningDetails] = useState([]);
	const [driverDetails, setDriverDetails] = useState(null);

	const {account_holder_name, bank_name, account_number} = state.paymentDetails.driver.DriverBankDetail
	
	const [startId, setStartId] = useState(0);
	let endId = startId < 0 ? 0 : startId + driverEarningDetails.length;
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
			Header: 'Delivery datetime',
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>
						{/* {item.delivery_datetime && item.delivery_datetime.split('T')[0]} */}
						{moment(item.delivery_datetime,"YYYY-MM-DD HH:mm:ss").format('M/D/YYYY')}<br/>{moment(item.delivery_datetime,"YYYY-MM-DD HH:mm:ss").format('h:mm a')}
					</div>
				);
			},
		},
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
			id: 5,
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
			id: 6,
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
			id: 7,
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
			id: 8,
			Header: 'Total order amount',
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>
						${parseFloat(item.amount)+parseFloat(item.tip_amount)}
					</div>
				);
			},
		},
		{
			id: 9,
			Header: 'Tip',
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>
						${item.tip_amount}
					</div>
				);
			},
		},
		{
			id: 10,
			Header: 'Actual amount',
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
			id: 11,
			Header: 'Markup amount',
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
			id: 12,
			Header: 'Driver',
			width: 150,
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>
						{item.order_details.driver?.first_name} 	{item.order_details.driver?.last_name}
					</div>
				);
			},
		},
	];
	useEffect(() => {
		driverEarning();
		getDriverDetails();
	}, [activePage]);

	const driverEarning = () => {
		const data = {
			driver_payment_id:id,
			pageNumber:activePage,
			pageSize:pageSize
		}
		 getOrgersByDriverId(token,data)
			.then((resp) => {
				let newStartId = pageSize * (activePage - 1);
				setStartId(newStartId);
				setTotalItems(resp.count);
				setDriverEarningDetails(resp.rows);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const getDriverDetails = async () => {
		try {
			const res = await getDriverById(token, id);
			if (res.status == 200) {
				setDriverDetails(res.personalDetails);
			}
		} catch (error) {
			console.log(error);
		}
	};

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
						<h1 className='text-xl'>Driver Payment Management Details</h1>
						<button
							style={{ height: '3rem' }}
							onClick={() => history.push('/driverPayment')}
							className='shadow bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
							type='button'>
							Back
						</button>
					</div>
					{driverDetails && (
						<div className='flex'>
							<div className='flex flex-col items-center '>
								<div className='flex flex -row '>
									<div className=' font-semibold px-3  text-right'>
										Driver Name
									</div>
									<div className='px-8'>
										{driverDetails.first_name} {driverDetails.last_name}
									</div>
								</div>
								<div className='flex flex -row'>
									<div
										className=' font-semibold  px-3  text-right'
										style={{ marginLeft: '-10px' }}>
										Total Earnings
									</div>
									<div className='px-8'>$ {driverDetails.total_earnings}</div>
								</div>
								<div className='flex flex-row items-center '>
									<div
										className=' font-semibold  px-3  text-right'
										style={{ marginLeft: '-12px' }}>
										Joined on
									</div>
									<div className='ml-12'>
										{driverDetails.createdAt.split('T')[0]}
									</div>
								</div>
								<div className='flex flex-row items-center '>
									<div
										className=' font-semibold  text-right'
										style={{ marginLeft: '-28px' }}>
										Total Deliveries
									</div>
									<div className='px-8'>{driverDetails.total_deliveries}</div>
								</div>
							</div>
							{ state.paymentDetails && <div>
								<div className='flex flex-row items-center '>
									<div className=' font-semibold  px-3  text-right'>
										Account Holder Name
									</div>
									<div className='px-8'>
										{account_holder_name}
									</div>
								</div>
								<div className='flex flex-row items-center '>
									<div className=' font-semibold  px-3  text-right'>
										Bank Name
									</div>
									<div className='px-8'>
										{bank_name}
									</div>
								</div>
								<div className='flex flex-row items-center '>
									<div className=' font-semibold  px-3  text-right'>
										Account No
									</div>
									<div className='px-8'>
										{account_number}
									</div>
								</div>
							</div>}
						</div>
					)}
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
							defaultPageSize={10}
							data={driverEarningDetails}
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

export default DriverPaymentDetails;
