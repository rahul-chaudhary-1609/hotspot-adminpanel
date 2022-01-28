/**
 * The file is covered under Algoworks Work Product License for Design & Development of Mobile Application for “Hotspot”.
 * Please review the license for full details.
 * This program is not free software: You cannot redistribute it for any use under the terms of the Algoworks Work Product License for Design & Development of Mobile Application for “Hotspot”.
 * However the source can be modified and updated for the working of the application Design & Development of Mobile Application for “Hotspot” for which it was licensed.
*/

import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import Pagination from 'react-js-pagination';
import { Link } from 'react-router-dom';
import moment from 'moment';
import SearchBox from '../../globalComponent/layout/search';
import CustomSelect from '../../globalComponent/layout/select';
import { listDisputes } from '../../api';
import { useSelector , useDispatch} from 'react-redux';
import { formatDate,formatTime } from '../../utils/redableDateTime';
import StatusModal from './statusModal';

const DisputeManagement = () => {
	const token = useSelector((state) => state.auth.isSignedIn);
	const dispatch = useDispatch();

	const val = useSelector((state) => state.auth.searchText);
	let searchText = val ? val : '';

	// const [searchText, setSearchText] = useState('');
	const [error, setError] = useState(null);

	const [pageSize, setPageSize] = useState(10);
	const [activePage, setCurrentPage] = useState(1);
	const [totalItems, setTotalItems] = useState(null);
	const statusFilter = useSelector((state) => state.auth.status);
	const [disputes, setDisputes] = useState([]);
	// const [statusFilter, setStatusFilter] = useState(null);
	const [loading, setLoading] = useState(false);

	const [statusModal, setStatusModal]=useState(false);
	const [disputeDetails,setDisputeDetails]=useState(null);
	const [selectedStatus,setSelectedStatus]=useState(null);
	const [selectedResult,setSelectedResult]=useState(null);
	const [adminComment,setAdminComment]=useState(null);

	const [startId, setStartId] = useState(0);
	let endId = startId < 0 ? 0 : startId + disputes.length;

	let disputeResult=[
        {
            label:"None",
            color:"Black",
            value:0,
        },
        {
            label:"Partially Accepted",
            color:"Blue",
            value:1,
        },
        {
            label:"Accepted",
            color:"Green",
            value:2,
        },
        {
            label:"Rejected",
            color:"Red",
            value:3,
        },
    ]

	let disputeStatus=[
        {
            label:"NEW",
            color:"Blue",
            value:1,
        },
        {
            label:"UNDER REVIEW",
            color:"Green",
            value:2,
        },
        {
            label:"CLOSED",
            color:"Red",
            value:3,
        },
    ]


	const columns = [
		{
			Header: 'Dispute ID',
			id: 1,
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<>
						<div
							className='flex items-center'
							style={{ cursor: 'pointer', textAlign: 'center' }}>
							<div className='text-sm'>
								<Link
									to={`/disputes/${item.dispute_id}`}
									style={{color:'#39B7CD	'}}>
									{item.dispute_id}
								</Link>
							</div>
						</div>
					</>
				);
			},
		},
		{
			Header: 'Order ID',
			id: 2,
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<>
						<div
							className='flex items-center'
							style={{ cursor: 'pointer', textAlign: 'center' }}>
							<div className='text-sm'>
								<Link
									to={`/orderDetails/${item.order_id}`}
									style={{color:'#39B7CD	'}}>
									{item.order_id}
								</Link>
							</div>
						</div>
					</>
				);
			},
		},
		{
			Header: 'Delivery ID',
			id: 3,
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>
						{item.Order.order_delivery_id}
					</div>
				);
			},
		},
		{
			id: 4,
			Header: 'Customer Name',
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>
						{item.Order.order_details.customer.name}
					</div>
				);
			},
		},
		{
			id: 5,
			Header: 'Restaurant',
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>
						{item.Order.order_details.restaurant.restaurant_name}
					</div>
				);
			},
		},
		{
			id: 6,
			Header: 'Order Datetime',
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>
						{moment(item.Order.delivery_datetime,"YYYY-MM-DD HH:mm:ss").format("M/D/YYYY H:mma")}
					</div>
				);
			},
		},
		{
			id: 7,
			Header: 'Dispute Datetime',
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>
						{moment(item.raised_at,"YYYY-MM-DD HH:mm:ss").format("M/D/YYYY H:mma")}
					</div>
				);
			},
		},
		{
			id: 8,
			Header: 'Status',
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer', color:disputeStatus[item.status-1].color }}>
						{disputeStatus[item.status-1].label}
					</div>
				);
			},
		},
		{
			id: 9,
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
						>
						{item.status<3?
						<div><button
							style={{ height: '3rem',color: '#39B7CD' }}
							className='shadow bg-white-500 hover:bg-white-400 focus:shadow-outline focus:outline-none text-black font-bold py-2 px-4 rounded'
							type='button'
							onClick={()=>handleStatusModal(item)}>
							Resolve
						</button></div>:
						<div style={{padding: '6px',}}>Resolved</div>
						}
					</div>
				);
			},
		}
	];

	useEffect(() => {
		loadList();
	}, [searchText, statusFilter, activePage]);

	const loadList = () => {
		setLoading(true);
		let currentPage = searchText.length > 0 ? 1 : activePage;

		let data={
			query:{
				page:currentPage,
				page_size:pageSize,
			}
		}

		if(searchText && searchText.trim()!=""){
			data.query.search_key=searchText;
		}

		listDisputes(token, data)
			.then((response) => {
				console.log("response",response)
				let newStartId = pageSize * (activePage - 1);
				setStartId(newStartId);
				setError(null);
				setTotalItems(response.disputes.count);
				setDisputes(response.disputes.rows);
				setLoading(false);
				if (searchText.length) {
					setCurrentPage(1);
				}
			})
			.catch((error) => {
				setError(error);
				setLoading(false)
				let newStartId = startId - 1;
				setStartId(newStartId);
				setTotalItems(0);
				setDisputes([]);
			});
	};

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	const handleStatusModal=(item)=>{
		setDisputeDetails(item);
		setAdminComment(item.admin_comment);
		setSelectedResult(disputeResult.find((result)=>result.value==item.result));
		setSelectedStatus(disputeStatus.find((status)=>status.value==item.status));
		setStatusModal(true);
	}

	const handleReload=()=>{
		loadList();
	}

	return (
		<>
			<div className='main-content md:pb-5 flex-1 p-8 px-2' style={{ overflowY: 'auto', height: '100vh' }}>
				<div id='recipients' className='p-4 md:p-8 mt-6 lg:mt-0 rounded shadow bg-white'>
					<h1 className='text-xl'>Dispute Management</h1>
			  		<div className='flex flex-wrap -mx-3 mb-6 mt-5'>
						<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0 search-text'>
						<SearchBox
							placeholder='Search by Order Id'
							setSearchText={(val) =>
								dispatch({
									type: 'SEARCH_TEXT',
									payload: val,
								})
							}
							searchText={searchText}
						/>
					</div>
					
				</div>

				{error && (
					<p
						style={{
							color: 'red',
							fontSize: '20px',
							textAlign: 'center',
							width: '100%',
							marginTop: '10px',
						}}>
						{error}
					</p>
				)}

				<ReactTable
					showPagination={false}
					minRows={0}
					NoDataComponent={() => null}
					defaultPageSize={pageSize}
					data={disputes}
					className='-highlight'
					columns={columns}
					loading={loading}
				/>
				<br/>
					<p
					style={{
						marginLeft: '20px',
					}}>
						{console.log("startId",startId,endId,disputes.length)}
					{totalItems > 0 ? `(showing ${startId + 1} - ${endId} of ${totalItems})` : 'showing 0 result'}
				</p>
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
				<StatusModal 
					{
						...{
							statusModal,
							setStatusModal,
							disputeDetails,
							disputeStatus,
							disputeResult,
							selectedResult,
							setSelectedResult,
							selectedStatus,
							setSelectedStatus,
							adminComment,
							setAdminComment,
							handleReload
						}
					}
						
				/>
			</div>
		</>
	);
};

export default DisputeManagement;
