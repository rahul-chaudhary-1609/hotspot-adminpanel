/**
 * The file is covered under Algoworks Work Product License for Design & Development of Mobile Application for “Hotspot”.
 * Please review the license for full details.
 * This program is not free software: You cannot redistribute it for any use under the terms of the Algoworks Work Product License for Design & Development of Mobile Application for “Hotspot”.
 * However the source can be modified and updated for the working of the application Design & Development of Mobile Application for “Hotspot” for which it was licensed.
*/

import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import Pagination from 'react-js-pagination';
import SearchComponent from '../searchComponent/index';
import { getRestaurantEarningList,
	generateRestaurantEarnings,
	generateRestaurantOrderEmail,
	getDriverListByHotspot,
	bulkAssignDriver } from '../../api';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import {formatDate, formatTime } from '../../utils/redableDateTime';
import { clearData } from '../../actions';
import moment from 'moment';
import BulkAssignModal from './bulkAssignModal';


const RestaurantPayment = () => {
	const token = useSelector((state) => state.auth.isSignedIn);

	const dispatch = useDispatch();
	const history = useHistory();

	const val = useSelector((state) => state.auth.searchText);
	let searchText = val ? val : '';

	const startval = useSelector((state) => state.auth.startDate);
	let startDate = startval ? startval : '';

	const endval = useSelector((state) => state.auth.endDate);
	let endDate = endval ? endval : '';

	const res = useSelector((state) => state.auth.filterBy);
	let filterby = res ? res.value : '';

	const [error, setError] = useState(null);

	const [restaurantPayment, setRestaurantPayment] = useState([]);
	const [startId, setStartId] = useState(0);
	let endId = startId < 0 ? 0 : startId + restaurantPayment.length;
	let currentId = startId;

	const [loading, setLoading] = useState(false);
	const [pageSize, setPageSize] = useState(10);
	const [totalItems, setTotalItems] = useState(null);
	const [activePage, setCurrentPage] = useState(1);
	const [bulkAssignModal,setBulkAssignModal]=useState(false);
	const [bulkAssignModalData,setBulkAssignModalData]=useState(null);

	const [driverList,setDriverList]=useState(null);
	const [selectedDriver,setSelectedDriver]=useState(null);


	const [selectedRestaurant, setSelectedRestaurant] = useState({
		startDate: null,
		endDate: null,
		restaurantPaymentId: null,
	});

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
			Header: 'Payment ID',
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer', color: '#39B7CD' }}>
						<p
							onClick={() => {
								let updatedData = { ...selectedRestaurant };
								updatedData['startDate'] = item.from_date;
								updatedData['endDate'] = item.to_date;
								updatedData['restaurantPaymentId'] = item.payment_id;
								setSelectedRestaurant(updatedData);
								
									history.push({
										pathname: `/restaurantPayment/${item.payment_id}`,
										state: {
											data: updatedData,
											paymentDetails: item.payment_details,
										},
									});
								
							}}>
							{item.payment_id}
						</p>
					</div>
				);
			},
		},
		{
			id: 3,
			Header: 'Restaurant Name',
			width:125,
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>
						{item.restaurant_name}
					</div>
				);
			},
		},
		// {
		// 	id: 4,
		// 	Header: 'Created Date',
		// 	className: 'text-center view-details',
		// 	accessor: (item) => {
		// 		return (
		// 			<div style={{ padding: '6px', cursor: 'pointer' }}>
		// 				{formatDate(item.createdAt)}
		// 			</div>
		// 		);
		// 	},
		// },

		{
			id: 4,
			Header: 'Delivery datetime',
			width:125,
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>
						{moment(item.delivery_datetime,"YYYY-MM-DD HH:mm:ss").format('M/D/YYYY')}<br/>{moment(item.delivery_datetime,"YYYY-MM-DD HH:mm:ss").format('h:mm a')}
					</div>
				);
			},
		},

		// {
		// 	id: 6,
		// 	Header: 'Delivery time',
		// 	width: 100,
		// 	className: 'text-center view-details',
		// 	accessor: (item) => {
		// 		return (
		// 			<div style={{ padding: '6px', cursor: 'pointer' }}>
		// 				{formatTime(item.delivery_datetime)}
		// 			</div>
		// 		);
		// 	},
		// },
		{
			id: 5,
			Header: 'Order Count',
			width: 100,
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
			Header: 'Total Order amt',
			width:125,
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
			id: 7,
			Header: 'Restaurant Fee',
			width: 110,
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>
						${item.restaurant_fee}
					</div>
				);
			},
		},
		{
			id: 8,
			Header: 'Mode',
			width: 50,
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer', color:item.type==0?"red":item.type==1?"green":"#eec600" }}>
						{item.type==0?"-":item.type==1?"Online":"Offline"}
					</div>
				);
			},
		},
		{
			id: 9,
			Header: 'Order Email',
			width: 100,
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div 
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems:"center"
					}}>

					{item.email_count < 2?
						
						<div>
							<button
								style={{ height: '3rem', width:"5rem",color: '#39B7CD' }}
								onClick={() => handleSendOrderEmail(item)}
								className='shadow bg-white-500 hover:bg-white-400 focus:shadow-outline focus:outline-none text-black font-bold py-2 px-4 rounded'
								type='button'
								disabled={item.is_driver_assigned?false:true}>
								{item.email_count < 1 ? 'Send' :'Resend'}
							</button>
						</div>:
						<div style={{padding: '6px',}}>
							Sent
						</div>
						
					}
						
					</div>
				);
			},
		},
		{
			id: 10,
			Header: 'Driver',
			width: 100,
			className: 'text-center view-details text-truncate',
			accessor: (item) => {
				return (
					<div 
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: "center",
						alignItems:"center"
					}}>

						{
							item.is_driver_assigned?
							<div style={{ padding: '6px', cursor: 'pointer', }}>
								{item.Driver?.first_name}<br/> {item.Driver?.last_name}
							</div>:
							<div>
								<button
									style={{ height: '3rem', width:"5rem",color: '#39B7CD' }}
									onClick={() => handleBulkAssignModal(item)}
									className='shadow bg-white-500 hover:bg-white-400 focus:shadow-outline focus:outline-none text-black font-bold py-2 px-4 rounded'
									type='button'>
									Assign
								</button>
							</div>
							
						}
					</div>
				);
			},
		},
		{
			id: 11,
			Header: 'Payment',
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
						onClick={(e) => {item.status == 0 ? history.push({pathname:`/restaurantPayment/resturantPayNow`, state:item}) : e.stopPropagation()}}>
						{item.status == 0?
						<div><button
							style={{ height: '3rem',color: '#39B7CD' }}
							className='shadow bg-white-500 hover:bg-white-400 focus:shadow-outline focus:outline-none text-black font-bold py-2 px-4 rounded'
							type='button'>
							Pay Now
						</button></div>:
						<div style={{padding: '6px',}}>Settled</div>
						}
					</div>
				);
			},
		},
	];

	useEffect(()=>{
		let data={
			body:{
				datetime:moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
			}
		}

		generateRestaurantEarnings(token,data)
		.then((res)=>{
			console.log("Restaurant Payment Generated:",res)
			restaurantEarningList();
		})

	},[])

	useEffect(() => {

		restaurantEarningList();
	}, [activePage]);

	useEffect(() => {
		dispatch(clearSearchAndFilter);
		dispatch(clearData(handleSearch));
	  }, []);

	const restaurantEarningList = async () => {
		try {
			setLoading(true);
			let data={
				query:{
					start_date:startDate.trim()!=""?moment(startDate,"MM/DD/YYYY").format("YYYY-MM-DD"):startDate,
				    end_date:endDate.trim()!=""?moment(endDate,"MM/DD/YYYY").format("YYYY-MM-DD"):endDate,
					filter_key:filterby,
					current_date:moment(new Date()).format("YYYY-MM-DD"),
					page:activePage,
					page_size:pageSize
				}
			}
			if(searchText && searchText.trim()!=""){
				data.query.search_key=searchText;
			}
			let res = await getRestaurantEarningList(
				token,
				// searchText,
				// startDate,
				// endDate,
				// filterby,
				// activePage,
				// pageSize
				data,
			);

			if (res.success) {
				setTotalItems(res.count);
				setRestaurantPayment(res.rows);
				let newStartId = pageSize * (activePage - 1);
				setStartId(newStartId);
				setLoading(false);
				setError(null);
			}
		} catch (error) {
			setError(error);
			setTotalItems(0);
			setLoading(false);
			setRestaurantPayment([]);
		}
	};
	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	const handleSearch = () => {
		restaurantEarningList();
	};

	const handleSendOrderEmail=(item)=>{
		setLoading(true);
		let data={
			body:{
				payment_id:item.payment_id,
			}
		}
		generateRestaurantOrderEmail(token,data)
		.then((res)=>{
			setLoading(false);
			restaurantEarningList();
		})
		.catch((error)=>{
			setError(error);
			setLoading(false);
		})
	}

	const handleBulkAssignModal=(item)=>{
		setDriverList(null);
		setSelectedDriver(null);
		setBulkAssignModalData({...item});
		setBulkAssignModal(true);
		let data={
			query:{
				hotspot_location_id:item.payment_details.hotspot.id,
			}
		}
		getDriverListByHotspot(token, data)
		.then((res)=>{
			let drivers = res.rows.reduce((acc, curr) => {
				return acc.concat([{
					id: curr.id,
					name: `${curr.first_name}  ${curr.last_name}`,
					label: `${curr.first_name}  ${curr.last_name}`,
					value:curr.id,
					first_name:curr.first_name,
					last_name:curr.last_name,
				}]);
			}, []);
			setDriverList(drivers);
		})
		.catch((error)=>{
			setError(error);
			setLoading(false);
		})
		
	}

	const handleBulkAssignDriver = (params) => {
		console.log("params",params);
		setLoading(true);
		let data={
		  body:{
			restaurant_payment_id:params.restaurant_payment_id,
			driverId:params.driver_id
		  }
		}
		bulkAssignDriver(token, data)
		  .then((resp) => {
			setLoading(false);
			setBulkAssignModal(false);
			restaurantEarningList();
		  })
		  .catch((error) => {
			setError(error);
			setLoading(false);
		  });
	  };


	return (
		<>
			<div className='main-content md:pb-5 flex-1 p-8 px-2' style={{ overflowY: 'auto', height: '100vh' }}>
				<div id='recipients' className='p-4 md:p-8 mt-6 lg:mt-0 rounded shadow bg-white'>
					<h1 className='text-xl'>Restaurant Payment Management</h1>
				<SearchComponent
					{...{
						placeholder: 'Search by Payment ID, Restaurant name',
						handleSearch,
						clearSearchAndFilter,
					}}
				/>

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
						data={restaurantPayment}
						className='-highlight'
						columns={columns}
						loading={loading}
						style={{marginTop:20}}
					/>
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
				<BulkAssignModal
					{
						...{
							bulkAssignModal,
							setBulkAssignModal,
							bulkAssignModalData,
							driverList,
							selectedDriver,
							setSelectedDriver,
							handleBulkAssignDriver
						}
					}
				/>
			</div>
		</>
	);
};

export default RestaurantPayment;
