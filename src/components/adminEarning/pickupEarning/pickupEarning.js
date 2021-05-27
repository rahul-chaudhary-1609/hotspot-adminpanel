import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import Pagination from 'react-js-pagination';
import CommonComponent from '../commonComponent';
import { useSelector } from 'react-redux';
import SearchComponent from '../../searchComponent/index';
import { getPickupOrdersList } from '../../../api'

const PickupEarning = (props) => {
	const token = useSelector((state) => state.auth.isSignedIn);

	const val = useSelector((state) => state.auth.searchText);
	let searchText = val ? val : '';

	const startval = useSelector((state) => state.auth.startDate);
	let startDate = startval ? startval : '';

	const endval = useSelector((state) => state.auth.endDate);
	let endDate = endval ? endval : '';

	const res = useSelector((state) => state.auth.filterBy);
	let filterby = res ? res.value : '';

	const [error, setError] = useState(null);

	const [pickupLists, setPickupLists] = useState([]);
	const [startId, setStartId] = useState(0);
	let endId = startId < 0 ? 0 : startId + pickupLists.length;
	let currentId = startId;

	const [loading, setLoading] = useState(false);
	const [pageSize, setPageSize] = useState(10);
	const [totalItems, setTotalItems] = useState(null);
	const [activePage, setCurrentPage] = useState(1);

	const pickupColumn = [
		{
			id: 1,
			Header: '#',
			width: 30,
			className: 'text-center view-details',
			accessor: (item) => {
				currentId++;
				return (
					<>
						<div className='flex items-center' style={{ cursor: 'pointer' }}>
							<div className='text-sm'>
								<p className='text-gray-300 '>{currentId}</p>
							</div>
						</div>
					</>
				);
			},
		},
		{
			Header: 'order Id ',
			id: 2,
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<>
						<div
							className='flex items-center'
							style={{ cursor: 'pointer', textAlign: 'center' }}>
							<div className='text-sm'>
								{item.order_id}
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
						{item.delivery_datetime.split('T')[0]}
					</div>
				);
			},
		},
		{
			id: 4,
			Header: 'Total delivery amount',
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
			id: 5,
			Header: 'Total order count',
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>
						{item.ordered_items && item.ordered_items.itemCount}
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
						{item.tip_amount}
					</div>
				);
			},
		},
		{
			id: 7,
			Header: 'Restaurant Fee',
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>${item.restaurant_fee}</div>
				);
			},
		},
		{
			id: 8,
			Header: 'Hotspot Comission',
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>
						{item.hotspot_fee}
					</div>
				);
			},
		},
	];

	useEffect(() => {
		pickupList();
	}, [activePage]);

	const pickupList = async () => {
		setLoading(true);
		try {
			let res = await getPickupOrdersList(
				token,
				searchText,
				startDate,
				endDate,
				filterby,
				activePage,
				pageSize
			);

			if (res.success) {
				setTotalItems(res.orders.count);
				setPickupLists(res.orders.rows);
				let newStartId = pageSize * (activePage - 1);
				setStartId(newStartId);
				setLoading(false);
				setError(null);
			}
		} catch (error) {
			setError(error);
			setLoading(false);
			setPickupLists([]);
			setTotalItems(null)
		}
	};
	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};


	const handleSearch = () => {
		pickupList();
	};

	return (
		<>
			<div
				id='recipient'
				className='p-4  md:p-8 mt-6 lg:mt-12 rounded shadow bg-white '
				style={{ width: '75%', marginTop: "100px" }}
			>
				<div>
					<CommonComponent /></div>
				<div className='mt-5'>
					<SearchComponent
						{...{
							placeholder: 'Search by Order number,Restaurant',
							handleSearch,
							adminEarningPage:true
						}}
					/></div>
				<div className='stripe hover mt-5'>
					<ReactTable
						showPagination={false}
						minRows={0}
						NoDataComponent={() => null}
						defaultPageSize={10}
						data={pickupLists}
						className='-highlight'
						columns={pickupColumn}
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
		</>
	);
};

export default PickupEarning;
