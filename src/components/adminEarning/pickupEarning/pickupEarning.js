import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import Pagination from 'react-js-pagination';
import CommonComponent from '../commonComponent';
import { useSelector, useDispatch } from 'react-redux';
import SearchComponent from '../../searchComponent/index';
import { getPickupOrdersList } from '../../../api'
import { Link } from 'react-router-dom';
import { formatDate } from '../../../utils/redableDateTime';
import { clearData } from '../../../actions';

const PickupEarning = (props) => {
	const token = useSelector((state) => state.auth.isSignedIn);
	const dispatch = useDispatch();

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

	let clearSearchAndFilter = () => {
		searchText = "";
		startDate = "";
		endDate = "";
		filterby = "";
	}

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
			Header: 'Order Id ',
			id: 2,
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
			id: 3,
			Header: 'Delivery date',
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
			Header: 'Order amt.',
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
			Header: 'Tip amt.',
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
			id: 6,
			Header: 'Restaurant fee',
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>${item.restaurant_fee+ "(" + item.order_details.restaurant.percentage_fee + "%)"}</div>
				);
			},
		},
		{
			id: 7,
			Header: 'Hotspot earning',
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

	useEffect(() => {
		dispatch(clearSearchAndFilter);
		dispatch(clearData(handleSearch));
	}, []);

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
			<div className='main-content md:pb-5 flex-1 p-8 px-2' style={{ overflowY: 'auto', height: '100vh' }}>
				<div id='recipients' className='p-4 md:p-8 mt-6 lg:mt-0 rounded shadow bg-white'>
					<h1 className='text-xl'>Admin Earning</h1>
				<div>
					<CommonComponent /></div>
				<div className='mt-5'>
					<SearchComponent
						{...{
							placeholder: 'Search by Order number',
								handleSearch,
							clearSearchAndFilter,
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
			</div>
			
		</>
	);
};

export default PickupEarning;
