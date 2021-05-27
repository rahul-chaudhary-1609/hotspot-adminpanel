import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import Pagination from 'react-js-pagination';
import CommonComponent from './commonComponent';
import SearchComponent from '../searchComponent/index';
import { getOrderDeliveiesList } from '../../api';
import { useSelector } from 'react-redux';
import moment from 'moment'
import HotspotEarningDetails from './hotspotEarningDetails/hotspotEarningDetails';

const HotspotEarning = () => {
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

	const [earningLists, setEarningLists] = useState([]);
	const [startId, setStartId] = useState(0);
	let endId = startId < 0 ? 0 : startId + earningLists.length;
	let currentId = startId;

	const [loading, setLoading] = useState(false);
	const [pageSize, setPageSize] = useState(10);
	const [totalItems, setTotalItems] = useState(null);
	const [activePage, setCurrentPage] = useState(1);

	const [tableModal, setTableModal] = useState(false);

	const [selectedEarning, setSelectedEarning] = useState({
		startDate: null,
		endDate: null,
		order_delivery_id: null,
	});
	const columns = [
		{
			Header: '#',
			id: 1,
			width: 25,
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
			id: 2,
			Header: 'Delivery Id',
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer', color: '#39B7CD' }}>
						<p
							onClick={() => {
								let updatedData = { ...selectedEarning };
								updatedData['startDate'] = item.from_date;
								updatedData['endDate'] = item.to_date;
								updatedData['order_delivery_id'] = item.delivery_id;
								setSelectedEarning(updatedData);
								setTableModal(true);
							}}>
							{item.delivery_id}
						</p>
					</div>
				);
			},
		},
		{
			id: 3,
			Header: 'Hotspot',
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>

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
						{item.createdAt.split('T')[0]}
					</div>
				);
			},
		},
		{
			id: 5,
			Header: 'Delivery Time',
			width: 80,
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>
						{moment(item.delivery_datetime).format('LT')}
					</div>
				);
			},
		},
		{
			id: 6,
			Header: 'Number of orders ',
			width: 80,
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>
						{item.order_count}
					</div>
				);
			},
		},
		{
			id: 7,
			Header: 'Total order amount',
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>
						{item.order_amount}
					</div>
				);
			},
		},
		{
			id: 8,
			Header: 'Tip amt.',
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
			id: 9,
			Header: 'Restaurant Fee',
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>

					</div>
				);
			},
		},
		{
			id: 10,
			Header: 'Driver Fee',
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>
						${item.driver_fee}
					</div>
				);
			},
		}
	];

	useEffect(() => {
		hotspotEarningList();
	}, [activePage]);

	const hotspotEarningList = async () => {
		setLoading(true);
		try {
			let res = await getOrderDeliveiesList(
				token,
				searchText,
				startDate,
				endDate,
				filterby,
				activePage,
				pageSize
			);

			if (res.success) {
				setTotalItems(res.orderDeliveries.count);
				setEarningLists(res.orderDeliveries.rows);
				let newStartId = pageSize * (activePage - 1);
				setStartId(newStartId);
				setLoading(false);
				setError(null);
			}
		} catch (error) {
			setError(error);
			setLoading(false);
			setEarningLists([]);
		}
	};
	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	const handleSearch = () => {
		hotspotEarningList();
	};


	return (
		<>
			<div
				className='main-content pb-16 md:pb-5 flex-1 pt-20 px-2'
				style={{ overflowY: 'scroll', height: '90vh', marginTop: '30px' }}>

				<div
					id='recipients'
					className='p-4 md:p-8 mt-6 lg:mt-0 rounded shadow bg-white'>
					<div>
						<CommonComponent /></div>
					<div className='mt-5'>
						<SearchComponent
							{...{
								placeholder: 'Search by delivery id,hotspot',
								handleSearch,
								adminEarningPage:true
							}}
						/>
					</div>
					{error && (
						<p
							style={{
								color: 'red',
								fontSize: '20px',
								textAlign: 'center',
								width: '100%',
							}}>
							{error}
						</p>
					)}
					<ReactTable
						showPagination={false}
						minRows={0}
						NoDataComponent={() => null}
						defaultPageSize={10}
						data={earningLists}
						className='-highlight'
						columns={columns}
						style={{
							width: '100%',
							marginTop: '0px',
						}}
						loading={loading}
					/>
					<br />
					(showing {startId < 0 ? 0 : startId + 1} - {endId} of {totalItems})
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
			{tableModal && (
				<HotspotEarningDetails
					{...{ tableModal, setTableModal, selectedEarning }}
				/>
			)}
		</>
	);
};

export default HotspotEarning;
