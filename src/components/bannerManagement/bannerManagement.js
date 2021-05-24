import React, { useEffect, useState } from 'react';
import ReactTable from 'react-table';
import Pagination from 'react-js-pagination';
import { useHistory } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import DeleteModal from '../deleteModal/deleteModal';
import {getBannerList, deleteBanner} from '../../api';
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
	const [pageSize, setPageSize] = useState(10);
	const [totalItems, setTotalItems] = useState(null);
	const [activePage, setCurrentPage] = useState(1);


    const[bannerId, setBannerId] = useState(null);
    const[deleteModal,setDeleteModal]= useState(false);

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
						<img src={item.image_url}/>
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
		{
			id: 5,
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
			id: 6,
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
							 onClick={() => history.push(`/editBanner/${item.id}`)}
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
			<div
				className='main-content pb-16 md:pb-5 flex-1 pt-20 px-2'
				style={{ overflowY: 'scroll', height: '90vh', marginTop: '30px' }}>
				<div style={{ marginLeft: '1rem', fontSize: '2rem' }}>
					Banner Management
				</div>
				<div
					id='recipients'
					className='p-4 md:p-8 mt-6 lg:mt-0 rounded shadow bg-white'>
					<div style={{ marginLeft: '90%', marginTop: '-70px' }}>
						<button
							style={{ height: '3rem' }}
							onClick={() => history.push('/addBanner')}
							className='shadow bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
							type='button'>
							Add New
						</button>
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
						defaultPageSize={10}
					   data={bannerData}
						className='-highlight'
						columns={columns}
						style={{
							width: '100%',
							marginTop: '60px',
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

            {deleteModal && <DeleteModal  {...{deleteModal,setDeleteModal, name:'Banner', handleDelete}}/>}
		
		</>
	);
};

export default BannerManagement;
