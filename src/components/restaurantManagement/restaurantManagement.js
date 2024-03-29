/**
 * The file is covered under Algoworks Work Product License for Design & Development of Mobile Application for “Hotspot”.
 * Please review the license for full details.
 * This program is not free software: You cannot redistribute it for any use under the terms of the Algoworks Work Product License for Design & Development of Mobile Application for “Hotspot”.
 * However the source can be modified and updated for the working of the application Design & Development of Mobile Application for “Hotspot” for which it was licensed.
*/


import React, { useState, useMemo, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-toastify/dist/ReactToastify.css';
import Pagination from 'react-js-pagination';
import 'react-table/react-table.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import SearchBox from '../../globalComponent/layout/search';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { listRestaurant,toggleRestaurantStatus, deleteRestaurant } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import {formatDate} from '../../utils/redableDateTime'
import Description from '@material-ui/icons/Description';
import Category from '@material-ui/icons/Category';
import StatusManagement from '../statusManagement/statusManagement';
import { faEye,faTrash,faEdit } from '@fortawesome/free-solid-svg-icons';
import DeleteModal from '../deleteModal/deleteModal';
import ToggleOffIcon from '@material-ui/icons/ToggleOff';
import ToggleOnIcon from '@material-ui/icons/ToggleOn';
import ReactTooltip from 'react-tooltip';

function RestaurantManagement({ ...props }) {
	const dispatch = useDispatch();
	const history = useHistory();
	const token = useSelector((state) => state.auth.isSignedIn);
	
	const [tableData, setTableData] = useState([]);
	const [activePage, setCurrentPage] = useState(1);
	
	const[loading,setLoading] = useState(false);

	const [pageSize, setPageSize] = useState(10);
	const [totalItems, setTotalItems] = useState(null);

	const [startId, setStartId] = useState(0);

	let [item,setItem]=useState(null);
	const [statusModal, setStatusModal] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);

	let endId = startId < 0 ? 0 : startId + tableData.length;
	let currentId = startId;
	const [error, setError] = useState();
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
			Header: 'Restaurant Name',
			className: 'text-center view-details',
			accessor: 'restaurant_name',
		},
		{
			id: 3,
			Header: 'Owner Name',
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>
						{item.owner_name}
					</div>
				);
			},
		},
		{
			id: 4,
			Header: 'Email Address',
			className: 'text-center view-details',
			accessor: (item) => {
				//  console.log(item.id);
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>
						{item.owner_email}
					</div>
				);
			},
		},
		// {
		// 	id: 5,
		// 	Header: 'Phone Number',
		// 	className: 'text-center view-details',
		// 	accessor: (item) => {
		// 		return (
		// 			<div style={{ padding: '6px', cursor: 'pointer' }}>
		// 				 {`(${item.owner_phone.slice(0,3)}) ${item.owner_phone.slice(3,6)}-${item.owner_phone.slice(6)}`}

		// 			</div>
		// 		);
		// 	},
		// },
		//createdAt
		{
			id: 5,
			width: 100,
			Header: 'Added on',
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>
						{item.createdAt ? formatDate(item.createdAt) : ''}
					</div>
				);
			},
		},
		{
			id: 6,
			Header: 'Status',
			width: 100,
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div
						className={item.status == 1 ? 'text-green-600' : 'text-red-600'}
						style={{ padding: '6px', cursor: 'pointer' }}>
						{item.status == 1 ? 'Active' : 'Inactive'}
					</div>
				);
			},
		},
		{
			id: 7,
			Header: 'Agrement Doc',
			width: 100,
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div onClick={(e) => {e.stopPropagation(); window.open(item.agreement_documents && item.agreement_documents[0].url,'_blank')}}
						className="text-green-600"
						style={{ padding: '6px', cursor: 'pointer' }}>
						{item.agreement_documents && item.agreement_documents[0].url && <Description style={{ color: '#667eea',fontSize:"2rem" }} />}
					</div>
				);
			},
		},
		{
			id: 8,
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
						onClick={(e) => e.stopPropagation()}>
						<p data-tip='' data-for='restaurant-view-tool-tip'>
							<FontAwesomeIcon
								style={{ cursor: 'pointer', marginTop: '6px',fontSize:"15" }}
								onClick={() => history.push(`/restaurant/${item.id}`)}
								className='text-red-600 trash w-5 h-5'
								color='red'
								icon={faEye}								
							/>
							<ReactTooltip id="restaurant-view-tool-tip">View Restaurant Details</ReactTooltip>
						</p>
						
						<p data-tip='' data-for='restaurant-menu-category-view-tool-tip'>
							<Category 
								style={{color:"red",cursor: 'pointer',marginTop: '6px',fontSize:"20"}}
								onClick={() => history.push(`/restaurant/${item.id}/menuCategory`)}
							/>
							<ReactTooltip id="restaurant-menu-category-view-tool-tip">View Restaurant Menu Category</ReactTooltip>
						</p>

						{item.status == 1 ? (
							<p data-tip='' data-for='restaurant-status-tool-tip'>
								<ToggleOnIcon
									onClick={() => handleStatusModal(item)}
									style={{ color: 'green', fontSize: '35',cursor:"pointer" }}
								/>
							</p>
						) : (
							<p data-tip='' data-for='restaurant-status-tool-tip'>
								<ToggleOffIcon
									onClick={() => handleStatusModal(item)}
									style={{ color: 'red', fontSize: '35',cursor:"pointer" }}
								/>
							</p>
						)}
						<ReactTooltip id="restaurant-status-tool-tip">Toggle Restaurant Status</ReactTooltip>
						<p data-tip='' data-for='edit-restaurant-tool-tip'>
							<FontAwesomeIcon
								style={{ cursor: 'pointer', marginTop: '6px', fontSize:"15" }}
								onClick={() => history.push(`/editRestaurant/${item.id}`)}
								className='text-red-600 trash w-5 h-5'
								color='red'
								icon={faEdit}
							/>
							<ReactTooltip id="edit-restaurant-tool-tip">Edit Restaurant</ReactTooltip>
						</p>
						<p data-tip='' data-for='delete-restaurant-tool-tip'>
							<FontAwesomeIcon
								style={{ cursor: 'pointer', marginTop: '6px', fontSize:"15" }}
								onClick={() => handleDeleteModal(item)}
								className='text-red-600 trash w-5 h-5'
								color='red'
								icon={faTrash}
							/>
							<ReactTooltip id="delete-restaurant-tool-tip">Delete Restaurant</ReactTooltip>
						</p>
						
					</div>
				);
			},
		},
	];

	const val = useSelector((state) => state.auth.searchText);
	let searchText = val ? val : '';

	useEffect(()=>{

		return ()=>{
			dispatch({
				type: 'SEARCH_TEXT',
				payload: "",
			})
		}
		
	},[])
	
	useEffect(() => {
		getRestaurantList();
	}, [searchText, activePage]);

	const getRestaurantList = async () => {
		try {
			setLoading(true);
			let currentPage = searchText.length > 0 ? 1 : activePage;
			let data={
				query:{
					is_pagination:1,
					page:currentPage,
					page_size:pageSize,
				}
			}
			if(searchText && searchText.trim()!=""){
				data.query.searchKey=searchText;
			}
			const res = await listRestaurant(
				token,
				data
			);
			if (res.success) {
				let newStartId = pageSize * (activePage - 1);
				setStartId(newStartId);
				setError(null);
				setTableData(res.restaurantList.rows);
				setTotalItems(res.restaurantList.count);
				if (searchText.length) {
					setCurrentPage(1);
				}
				setLoading(false);
			}
		} catch (error) {
			setError(error);
			let newStartId = startId - 1;
			setStartId(newStartId);
			setTotalItems(0);
			setTableData([]);
			setLoading(false)
		}
	};

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	const handleStatusModal=(item)=>{
		setItem(item)
		setStatusModal(!statusModal)
	}

	const handleDeleteModal=(item)=>{
		setItem(item)
		console.log(item)
		setDeleteModal(!deleteModal)
	}

	const handleStatusChange = async(id) => {
		try {
                let data={
                    body:{
                        restaurantId:id,
                    }
                }
				console.log("data",data)
				const res = await toggleRestaurantStatus(token, data);
				if (res.status == 200) {
					setStatusModal(false)
					getRestaurantList();
				}
			} catch (error) {
				console.log(error);
			}
	};

	const handleDelete = async(id) =>{
		try {
            let data={
                body:{
                    restaurantId:id,
                }
            }
			console.log("data",data,id)
			const res = await deleteRestaurant(token, data);
			if (res.status == 200) {
				setDeleteModal(false);
				getRestaurantList();
			}
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<>
			<div className='main-content md:pb-5 flex-1 p-8 px-2' style={{ overflowY: 'auto', height: '100vh' }}>
				<div id='recipients' className='p-4 md:p-8 mt-6 lg:mt-0 rounded shadow bg-white'>
					<h1 className='text-xl'>Restaurant Management</h1>
					<div className='flex flex-wrap -mx-3 mb-6 mt-5' style={{justifyContent: 'space-between' }}>
						<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0 search-text'>
							<SearchBox
								placeholder='Search by Restaurant name, Owner name, email address'
								setSearchText={(val) =>
									dispatch({
										type: 'SEARCH_TEXT',
										payload: val,
									})
								}
								searchText={searchText}
							/>
						</div>	
						<button
							style={{ height: '3rem' }}
							onClick={() => history.push('/addRestaurant')}
							className='shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
							type='button'>
							Add New
						</button>
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
						defaultPageSize={pageSize}
						data={tableData}
						className='-highlight'
						columns={columns}
						style={{
							width: '100%',
						}}
						loading={loading}
					/>
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
					{statusModal && <StatusManagement 
						{...{ 
							setIsOpen:setStatusModal, 
							modalIsOpen:statusModal, 
							details: item,
							itemId:item.id,
							handleStatusChange, 
							name:'Restaurant' 
						}} 
					/>}
					{deleteModal && <DeleteModal {...{
								setDeleteModal,
								deleteModal,
								itemId:item.id,
								handleDelete,
								name:'Restaurant'
								
					}}/>}
				</div>
			</div>
		</>
	);
}

export default RestaurantManagement;
