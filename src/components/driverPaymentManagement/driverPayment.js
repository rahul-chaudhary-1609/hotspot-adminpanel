import React, { useEffect, useState } from 'react';
import ReactTable from 'react-table';
import Pagination from 'react-js-pagination';
import 'react-table/react-table.css';
import { getDriverEarningList } from '../../api';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import SearchComponent from '../searchComponent';
import { formatDate } from '../../utils/redableDateTime';

const DriverPayment = () => {
	const history = useHistory();

	const token = useSelector((state) => state.auth.isSignedIn);

	const val = useSelector((state) => state.auth.searchText);
	let searchText = val ? val : '';

	const startval = useSelector((state) => state.auth.startDate);
	let startDate = startval ? startval : '';

	const endval = useSelector((state) => state.auth.endDate);
	let endDate = endval ? endval : '';

	const res = useSelector((state) => state.auth.filterBy);
	let filterby = res ? res.value : '';

	const [driverLists, setDriverLists] = useState([]);
	const [activePage, setCurrentPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const[error, setError] = useState(null);
	const [pageSize, setPageSize] = useState(10);
	const [totalItems, setTotalItems] = useState(null);

	const [selectedDriver, setSelectedDriver] = useState({
		startDate: null,
		endDate: null,
		driverPaymentId: null,
	});
	const [startId, setStartId] = useState(0);
	let endId = startId < 0 ? 0 : startId + driverLists.length;
	let currentId = startId;

	let clearSearchAndFilter = () => {
		searchText = "";
		startDate = "";
		endDate = "";
		filterby = "";
	}

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
			Header: 'Payment Id',
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer', color: '#39B7CD' }}>
						<p
							onClick={() => {
								let updatedData = { ...selectedDriver };
								updatedData['startDate'] = item.from_date;
								updatedData['endDate'] = item.to_date;
								updatedData['driverPaymentId'] = item.payment_id;
								setSelectedDriver(updatedData);
								setTimeout(() => {
									history.push({
										pathname: `/driverPayment/${item.payment_id}`,
										state: {
											data: updatedData,
											paymentDetails: item.payment_details,
										},
									});
								}, 1000);
							}}>
							{item.payment_id}
						</p>
					</div>
				);
			},
		},
		{
			id: 3,
			Header: 'Driver Name',
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>
						{item.driver_name}
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
						{formatDate(item.from_date)} to {formatDate(item.to_date)}
					</div>
				);
			},
		},
		{
			id: 5,
			Header: 'Number Of Orders',
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
			id: 6,
			Header: 'Driver fees',
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>
						${item.driver_fee}
					</div>
				);
			},
		},
		{
			id: 7,
			Header: 'Action',
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
						onClick={(e) => {item.status == 0 ? history.push({pathname:`/driverPayment/driverPaymentNow`, state:item}) : e.stopPropagation()}}>
						<button
							style={{ height: '3rem' }}
							className='shadow bg-white-500 hover:bg-white-400 focus:shadow-outline focus:outline-none text-black font-bold py-2 px-4 rounded'
							type='button'>
							{item.status == 0 ? 'Pay Now' : 'Settled'}
						</button>
					</div>
				);
			},
		},
	];

	useEffect(() => {
		getDriverList();
	}, [activePage]);

	const getDriverList = async () => {
		try {
			setLoading(true);
			const res = await getDriverEarningList(
				token,
				searchText,
				startDate,
				endDate,
				filterby,
				activePage,
				pageSize
			);
			if (res.status == 200) {
				let newStartId = pageSize * (activePage - 1);
				setStartId(newStartId);
				setTotalItems(res.count);
				setDriverLists(res.rows);
				setLoading(false);
				setError(null)
			}
		} catch (error) {
			setLoading(false);
			setError(error);
			setDriverLists([]);
		}
	};

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	const handleSearch = () => {
		getDriverList();
	};

	return (
		<>
			<div className='main-content md:pb-5 flex-1 p-8 px-2' style={{ overflowY: 'auto', height: '100vh' }}>
				<div id='recipients' className='p-4 md:p-8 mt-6 lg:mt-0 rounded shadow bg-white'>
					<h1 className='text-xl'>Driver Payment Management</h1>
					
					<SearchComponent
						{...{ placeholder: 'Search by driver name', handleSearch,clearSearchAndFilter, }}
					/>
					<div
						className='stripe hover'
						style={{
							paddingTop: '1em',
							paddingBottom: '1em',
							width: '100%',
							marginTop: '10px',
						}}>
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
							data={driverLists}
							className='-highlight'
							loading={loading}
							columns={columns}
						/>
					</div>
					<br />
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

export default DriverPayment;