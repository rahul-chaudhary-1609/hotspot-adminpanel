/**
 * The file is covered under Algoworks Work Product License for Design & Development of Mobile Application for “Hotspot”.
 * Please review the license for full details.
 * This program is not free software: You cannot redistribute it for any use under the terms of the Algoworks Work Product License for Design & Development of Mobile Application for “Hotspot”.
 * However the source can be modified and updated for the working of the application Design & Development of Mobile Application for “Hotspot” for which it was licensed.
*/


import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-toastify/dist/ReactToastify.css';
import Pagination from 'react-js-pagination';
import 'react-table/react-table.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import SearchBox from '../../../../../../globalComponent/layout/search';
import { useHistory,useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye,faTrash,faEdit } from '@fortawesome/free-solid-svg-icons';
import {getAddonSection, listAddon,toggleAddonStatus, deleteAddon, } from '../../../../../../api';
import { useDispatch, useSelector } from 'react-redux';
import StatusManagement from '../../../../../statusManagement/statusManagement';
import DeleteModal from '../../../../../deleteModal/deleteModal';
import ToggleOffIcon from '@material-ui/icons/ToggleOff';
import ToggleOnIcon from '@material-ui/icons/ToggleOn';
import ReactTooltip from 'react-tooltip';


function AddonManagement() {
	const dispatch = useDispatch();
	const history = useHistory();
	let params=useParams();
	const token = useSelector((state) => state.auth.isSignedIn);

	let [titleName, setTitleName]=useState(null);
	
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
			Header: 'Name',
			className: 'text-center view-details',
			accessor: 'name',
		},
		{
			id: 3,
			Header: 'Actual Price ($)',
			className: 'text-center view-details',
			accessor: 'price',
		},
		{
			id: 4,
			Header: 'Markup Price ($)',
			className: 'text-center view-details',
			accessor:(item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>
						{item.markup_price?item.markup_price:0.00}
					</div>
				);
			},
		},
		{
			id: 5,
			Header: 'Final Price ($)',
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>
						{item.markup_price?parseFloat((parseFloat(item.price)+parseFloat(item.markup_price)).toFixed(2)):parseFloat(item.price).toFixed(2)}
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
						onClick={(e) => e.stopPropagation()}>
						<p data-tip='' data-for='view-addon-tool-tip'>
							<FontAwesomeIcon
								style={{ cursor: 'pointer', marginTop: '6px',fontSize:"15" }}
								onClick={() => history.push(`/restaurant/${params.restaurantId}/menuCategory/${params.menuCategoryId}/menu/${params.dishId}/addonSection/${params.sectionId}/addon/${item.id}`)}
								className='text-red-600 trash w-5 h-5'
								color='red'
								icon={faEye}
							/>
							<ReactTooltip id="view-addon-tool-tip">View Addon Details</ReactTooltip>
						</p>
						{item.status == 1 ? (
							<p data-tip='' data-for='toggle-addon-status-tool-tip'>
								<ToggleOnIcon
									onClick={() => handleStatusModal(item)}
									style={{ color: 'green', fontSize: '35' }}
								/>
							</p>
						) : (
							<p data-tip='' data-for='toggle-addon-status-tool-tip'>
								<ToggleOffIcon
									onClick={() => handleStatusModal(item)}
									style={{ color: 'red', fontSize: '35' }}
								/>
							</p>
						)}
						
						<ReactTooltip id="toggle-addon-status-tool-tip">Toggle Addon Status</ReactTooltip>
						
						<p data-tip='' data-for='edit-addon-tool-tip'>
							<FontAwesomeIcon
								style={{ cursor: 'pointer', marginTop: '6px', fontSize:"15" }}
								onClick={() => history.push(`/restaurant/${params.restaurantId}/menuCategory/${params.menuCategoryId}/menu/${params.dishId}/addonSection/${params.sectionId}/editAddon/${item.id}`)}
								className='text-red-600 trash w-5 h-5'
								color='red'
								icon={faEdit}
							/>
							<ReactTooltip id="edit-addon-tool-tip">Edit Addon</ReactTooltip>
						</p>
						<p data-tip='' data-for='delete-addon-tool-tip'>
							<FontAwesomeIcon
								style={{ cursor: 'pointer', marginTop: '6px', fontSize:"15" }}
								onClick={() => handleDeleteModal(item)}
								className='text-red-600 trash w-5 h-5'
								color='red'
								icon={faTrash}
							/>
							<ReactTooltip id="delete-addon-tool-tip">Delete Addon</ReactTooltip>
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
        fetchData();
	}, [searchText, activePage]);

	async function fetchData(){
		try {
			setLoading(true);
			let sectionRes=await getAddonSection(token,{params:{dish_add_on_section_id:params.sectionId,}})
			setTitleName(sectionRes.section.name)
			let currentPage = searchText.length > 0 ? 1 : activePage;
			let data={
				query:{
					dish_add_on_section_id:params.sectionId,
					page:currentPage,
					page_size:pageSize,
				}
			}
			if(searchText && searchText.trim()!=""){
				data.query.search_key=searchText;
			}
			const res = await listAddon(
				token,
				data
			);
			console.log("res",res)
			if (res.success) {
				let newStartId = pageSize * (activePage - 1);
				setStartId(newStartId);
				setError(null);
				setTableData(res.dishAddons.rows);
				setTotalItems(res.dishAddons.count);
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
                        dish_addon_id:id,
                    }
                }
				console.log("data",data)
				const res = await toggleAddonStatus(token, data);
				if (res.status == 200) {
					setStatusModal(false)
					fetchData();
				}
			} catch (error) {
				console.log(error);
			}
	};

	const handleDelete = async(id) =>{
		try {
            let data={
                body:{
                    dish_addon_id:id,
                }
            }
			console.log("data",data,id)
			const res = await deleteAddon(token, data);
			if (res.status == 200) {
				setDeleteModal(false);
				fetchData();
			}
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<>
			<div className='main-content md:pb-5 flex-1 p-8 px-2' style={{ overflowY: 'auto', height: '100vh' }}>
				<div id='recipients' className='p-4 md:p-8 mt-6 lg:mt-0 rounded shadow bg-white'>
					<h1 className='text-xl'>{titleName}: Addon Management</h1>
					<div className='flex flex-wrap -mx-3 mb-6 mt-5' style={{justifyContent:"space-between" }}>
						<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0 search-text' style={{width:"50%" }}>
							<SearchBox
								placeholder='Search by name'
								setSearchText={(val) =>
									dispatch({
										type: 'SEARCH_TEXT',
										payload: val,
									})
								}
								searchText={searchText}
							/>
						</div>
					
					
					    <div style={{display:"flex", justifyContent:"flex-end",width:"25%"  }}>
						<button
							style={{ height: '3rem',marginRight:"1rem" }}
							onClick={() => history.push(`/restaurant/${params.restaurantId}/menuCategory/${params.menuCategoryId}/menu/${params.dishId}/addonSection/${params.sectionId}/addAddon`)}
							className='shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
							type='button'>
							Add New
						</button>
						<button
							style={{ height: '3rem' }}
							onClick={() => history.push(`/restaurant/${params.restaurantId}/menuCategory/${params.menuCategoryId}/menu/${params.dishId}/addonSection`)}
							className='shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
							type='button'>
							Back
						</button>
						</div>
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
							name:'Addon' 
						}} 
					/>}
					{deleteModal && <DeleteModal {...{
								setDeleteModal,
								deleteModal,
								itemId:item.id,
								handleDelete,
								name:'Addon'
								
					}}/>}
				</div>
			</div>
		</>
	);
}

export default AddonManagement;
