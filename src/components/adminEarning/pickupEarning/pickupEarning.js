import React from 'react';
import ReactTable from 'react-table';
import Pagination from 'react-js-pagination';
import CommonComponent from '../commonComponent';

const PickupEarning = (props) => {
	const pickupColumn = [
		{
			id: 1,
			Header: '#',
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>
						{/* {item.delivery_datetime.split('T')[0]} */}
					</div>
				);
			},
		},
		{
			Header: 'order Id ',
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
								{/* <Link
									to={`/orderDetails/${item.orderId}`}
									className='text-blue-600 leading-none '>
									{item.orderId}
								</Link> */}
							</div>
						</div>
					</>
				);
			},
		},
		{
			id: 3,
			Header: 'Date',
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>
						{/* {item.delivery_datetime.split('T')[0]} */}
					</div>
				);
			},
		},
		{
			id: 4,
			Header: 'Total delivery amount',
			className: 'text-center view-details',
			accessor: (item) => {
				//  console.log(item.id);
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>
						{/* {moment(item.delivery_datetime, 'YYYY-MM-DD T hh:mm:ss').format(
							'h:mm A'
						)} */}
					</div>
				);
			},
		},
		{
			id: 5,
			Header: 'Total order count',
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
			Header: 'Tip amount',
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>
						{item.hotspotLocation && item.hotspotLocation.details}
					</div>
				);
			},
		},
		{
			id: 7,
			width: 100,
			Header: 'Restaurant Fee',
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>{item.amount}</div>
				);
			},
		},
		{
			id: 8,
			Header: 'Hotspot Comission',
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
	];
	return (
		<>
			<div
				id='recipient'
				className='p-4  md:p-8 mt-6 lg:mt-10 rounded shadow bg-white '
				// style={{ overflowY: 'scroll', height: '90vh', marginTop: '10px' }}
				>
				<CommonComponent />
				<div className='stripe hover mt-5'>
					<ReactTable
						showPagination={false}
						minRows={0}
						NoDataComponent={() => null}
						defaultPageSize={10}
						// data={
						// 	props.activeOrders || props.scheduledOrders || props.completedOrder
						// }
						className='-highlight'
						columns={pickupColumn}
					/>
				</div>
				(showing 1-10 of 500)
				<div style={{ textAlign: 'right' }}>
					<Pagination
						activePage={props.activePage}
						itemsCountPerPage={props.pageSize}
						totalItemsCount={props.totalItems}
						pageRangeDisplayed={3}
						onChange={props.handlePageChange}
					/>
				</div>
			</div>
		</>
	);
};

export default PickupEarning;
