import React, { useEffect, useState } from 'react';
import ReactTable from 'react-table';
import Pagination from 'react-js-pagination';
import { useHistory } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import DeleteModal from '../deleteModal/deleteModal';
import {getBannerList, deleteBanner, updateBannerOrder} from '../../api';
import { useSelector } from 'react-redux';

const BannerManagement = () => {
	const history = useHistory();
	const token = useSelector((state) => state.auth.isSignedIn);
	const [error, setError] = useState(null);
     
    const[bannerData, setBannerData] = useState([])
	const [startId, setStartId] = useState(0);
	let endId = startId < 0 ? 0 : startId + bannerData.length;
    let currentId = startId;
    
	const [loading, setLoading] = useState(false);
	const [pageSize, setPageSize] = useState(20);
	const [totalItems, setTotalItems] = useState(null);
	const [activePage, setCurrentPage] = useState(1);


    const[bannerId, setBannerId] = useState(null);
    const[deleteModal,setDeleteModal]= useState(false);

	function handleOrderChange(id,order,newOrder) {
		let data = {"banner_id" : id, "current_order":order,"new_order":newOrder }
		console.log(data)
		updateBannerOrder(token,data).then(res=>{
			getBannerLists()
		}).catch(error =>{
			console.log(data)
		})
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
								<p className='text-gray-300 leading-none'>
                                    {currentId} 
                                    </p>
							</div>
						</div>
					</>
				);
			},
		},
		{
			id: 2,
			Header: 'Title',
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>
						{item.name}
					</div>
				);
			},
		},
		{
			id: 3,
			Header: 'Image',
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>
						<img style={{height:80}} src={item.image_url}/>
					</div>
				);
			},
		},
		{
			id: 4,
			Header: 'Order',
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>
						{item.order} 
					</div>
				);
			},
		},
		// {
		// 	id: 5,
		// 	Header: 'Status',
		// 	width: 100,
		// 	className: 'text-center view-details',
		// 	accessor: (item) => {
		// 		return (
		// 			<div
		// 				className={item.status == 1 ? 'text-green-600' : 'text-red-600'}
		// 				style={{ padding: '6px', cursor: 'pointer' }}>
		// 				{item.status == 1 ? 'Active' : 'Inactive'}
                        
		// 			</div>
		// 		);
		// 	},
		// },
		{
			id: 5,
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
						<FontAwesomeIcon
							style={{ cursor: 'pointer' }}
							 onClick={() => history.push(`/banners/banner/${item.id}`)}
							className='text-red-600 trash w-5 h-5'
							color='red'
							icon={faPencilAlt}
						/>
						<FontAwesomeIcon
							className='text-red-600 trash w-5 h-5'
							color='red'
						   onClick={() => 
                            {
                                setBannerId(item.id)
                                setDeleteModal(true);
                           }}
							icon={faTrashAlt}
						/>
						<FontAwesomeIcon
							style={parseInt(item.order) === 1 ? {display: "none"} : {display: "block"}}
							className='text-red-600 trash w-5 h-5'
							color='red'
							icon={faArrowUp}
							onClick={()=>handleOrderChange(item.id,item.order,parseInt(item.order - 1))}
						/>
						<FontAwesomeIcon
							style={parseInt(item.order) === parseInt(totalItems) ? {display: "none"} : {display: "block"}}
							className='text-red-600 trash w-5 h-5'
							color='red'
							icon={faArrowDown}
							onClick={()=>handleOrderChange(item.id,item.order,parseInt(item.order + 1))}
						/>
					</div>
				);
			},
		},
	];
    
	

	useEffect(() =>{
		getBannerLists();
	},[activePage])

	const getBannerLists = () =>{
		setLoading(true);      
		getBannerList(token,activePage,pageSize).then(res =>{

			setTotalItems(res.banners.count);
			// let rows = res.banners.rows
			// 	rows.map((row,id)=>{
			// 		row.idx = id+1;
			// 	})
			setBannerData(res.banners.rows);
			let newStartId = pageSize * (activePage - 1);
			setStartId(newStartId);
			setLoading(false);
			setError(null);
		}).catch(error => {
			setError(error);
			setLoading(false);
		})
	}
    const handleDelete = () =>{
		deleteBanner(token, bannerId)
		.then((res) => {
			getBannerLists();
			setDeleteModal(false);
		})
		.catch((error) => {
			console.log(error);
		});
	}
	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};
	return (
		<>
			<div className='main-content md:pb-5 flex-1 p-8 px-2' style={{ overflowY: 'auto', height: '100vh' }}>
				<div id='recipients' className='p-4 md:p-8 mt-6 lg:mt-0 rounded shadow bg-white'>
					<h1 className='text-xl'>Banner Management</h1>
				
					<div className='flex flex-wrap -mx-3 mb-6 mt-5' style={{justifyContent: 'space-between' }}>
							<div style={{position: "relative",left: "89%"}}>
							<button
								style={{ height: '3rem' }}
								onClick={() => history.push('/banners/banner')}
								className='shadow bg-blue-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
								type='button'>
								Add New
							</button>
						</div>
					</div>
					<br />
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
					   	data={bannerData}
						className='-highlight'
						columns={columns}
						// style={{
						// 	width: '100%',
						// 	marginTop: '60px',
						// }}
						loading={loading}
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
			</div>

            {deleteModal && <DeleteModal  {...{deleteModal,setDeleteModal, name:'Banner', handleDelete}}/>}
		
		</>
	);
};

export default BannerManagement;
