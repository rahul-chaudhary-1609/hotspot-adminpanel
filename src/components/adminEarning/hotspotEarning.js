import React, { useEffect, useState } from 'react';
import ReactTable from 'react-table';
import Pagination from 'react-js-pagination';
import CommonComponent from './commonComponent';
import { getOrderDeliveiesList } from '../../api';
import { useSelector } from 'react-redux';

const HotspotEarning = (props) => {
	const deliveryColums = [
		{
			Header: '#',
			width: 30,
			id: 1,
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<>
						<div
							className='flex items-center'
							style={{ cursor: 'pointer', display: 'column' }}>
							<div className='text-sm '>
								<p className='text-gray-300 leading-none'>
								
									{`${item.idx}as`}
								</p>
							</div>
						</div>
					</>
				);
			},
		},
		{
			id: 2,
			Header: 'Hotspot',
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>{item.id}</div>
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
						{/* {`(${item.owner_phone.slice(0, 3)}) ${item.owner_phone.slice(
							3,
							6
						)}-${item.owner_phone.slice(6)}`} */}{' '}
						170
					</div>
				);
			},
		},
		{
			id: 4,
			Header: 'Delivery Time',
			width: 100,
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div
						className={item.status == 1 ? 'text-green-600' : 'text-red-600'}
						style={{ padding: '6px', cursor: 'pointer' }}>
						${item.amount}
					</div>
				);
			},
		},
		{
			id: 5,
			Header: 'Number of orders',
			width: 100,
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div
						className={item.status == 1 ? 'text-green-600' : 'text-red-600'}
						style={{ padding: '6px', cursor: 'pointer' }}>
						{/* {item.status == 1 ? 'Active' : 'Inactive'} */}
						10
					</div>
				);
			},
		},
		{
			id: 6,
			Header: 'Total order amount ',
			width: 100,
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div
						className={item.status == 1 ? 'text-green-600' : 'text-red-600'}
						style={{ padding: '6px', cursor: 'pointer' }}>
						{/* {item.status == 1 ? 'Active' : 'Inactive'} */}
						$500
					</div>
				);
			},
		},
		{
			id: 7,
			Header: 'Tip amt.',
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
						onClick={(e) => e.stopPropagation()}></div>
				);
			},
		},
		{
			id: 8,
			Header: 'Restaurant Fee',
			width: 100,
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div
						className={item.status == 1 ? 'text-green-600' : 'text-red-600'}
						style={{ padding: '6px', cursor: 'pointer' }}>
						{/* {item.status == 1 ? 'Active' : 'Inactive'} */}
						$500
					</div>
				);
			},
		},
		{
			id: 9,
			Header: 'Driver Fee',
			width: 100,
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div
						className={item.status == 1 ? 'text-green-600' : 'text-red-600'}
						style={{ padding: '6px', cursor: 'pointer' }}>
						{/* {item.status == 1 ? 'Active' : 'Inactive'} */}
						$500
					</div>
				);
			},
		}
	];
	const token = useSelector((state) => state.auth.isSignedIn);

	const [error, setError] = useState(null);

	const [loading, setLoading] = useState(false);
	const [pageSize, setPageSize] = useState(10);
	const [totalItems, setTotalItems] = useState(null);
	const [activePage, setCurrentPage] = useState(1);

	const [hotspotEarning, setHotspotEarning] = useState([]);
	useEffect(() => {
		hotspotEarningList();
	}, []);

	const hotspotEarningList = () => {
		setLoading(true);
		getOrderDeliveiesList(token,"","","","","","","")
			.then((res) => {
				//  setTotalItems(res.orderDeliveries.count);
				// let rows = res.orderDeliveries.rows
				// 	rows.map((row,id)=>{
				// 		row.idx = id+1;
				// 	})
				// 	setHotspotEarning(res.orderDeliveries.rows);
				// let newStartId = pageSize * (activePage - 1);
				// setStartId(newStartId);
				setLoading(false);
				setError(null);
			})
			.catch((error) => {
				setError(error);
				setLoading(false);
			});
	};
	return (
		<>
			<div
				id='recipients'
				 className='p-4 md:p-8 mt-6  lg:mt-10 rounded shadow bg-white '
				// style={{ overflowY: 'scroll', height: '90vh', marginTop: '10px' }}
				>
				<CommonComponent />
				<div className='stripe hover mt-5'>
					<ReactTable
						showPagination={false}
						minRows={0}
						NoDataComponent={() => null}
						defaultPageSize={10}
						data={hotspotEarning}
						className='-highlight'
						columns={deliveryColums}
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

export default HotspotEarning;
