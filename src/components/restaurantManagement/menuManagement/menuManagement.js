import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import ToggleOffIcon from '@material-ui/icons/ToggleOff';
import ToggleOnIcon from '@material-ui/icons/ToggleOn';
import 'react-toastify/dist/ReactToastify.css';
import Pagination from 'react-js-pagination';
import 'react-table/react-table.css';
import SearchBox from '../../../globalComponent/layout/search';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getMenuLists, getToggleDishAsRecommended, getToggleDishAsQuickFilter} from '../../../api';
import {
	faEye,
	faPencilAlt,
	faTrashAlt
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteDish, getCategoryList } from '../../../api';
import DeleteModal from '../../deleteModal/deleteModal';

function Menumanagement({ ...props }) {
	const dispatch = useDispatch();
	const history = useHistory();
	const token = useSelector((state) => state.auth.isSignedIn);

	const { id } = useParams();
	const { pathname } = useLocation();
	let path = pathname.split('/')[1];

	const [menuLists, setMenuLists] = useState([]);
	const [activePage, setCurrentPage] = useState(1);

	const val = useSelector((state) => state.auth.orderSearchText);
	let searchText = val ? val : '';

	const [pageSize, setPageSize] = useState(10);
	const [totalItems, setTotalItems] = useState(null);
	const [categoryLists, setCategoryLists] = useState([]);
	const [toggleId, settoggleId] = useState(null);
	const [toggleQuickFilterId, settoggleQuickFilterId] = useState(null);
	const [showStatus, setShowStatus] = useState(false);
	const [quickFilterStatus, setQuickFilterStatus] = useState(false);

	const [loading, setLoading] = useState(false);

	const [deleteModal, setDeleteModal] = useState(false);

	const [dishId, setDishId] = useState(null);

	const [startId, setStartId] = useState(0);
	let endId = startId < 0 ? 0 : startId + menuLists.length;
	let currentId = startId;


	const [error, setError] = useState();

	const [columns, setColumns] = useState([]);

	const column = [
		{
			Header: '#',
			width: 30,
			id: 1,
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<>
						<div
							className='flex items-center'
							style={{ cursor: 'pointer' }}>
							<div className='text-sm'>
								<p className='text-gray-300 leading-none'>{item.idx}</p>
							</div>
						</div>
					</>
				);
			},
		},
		{
			id: 2,
			Header: 'Dish Name',
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{
						padding: '6px', cursor: 'pointer', wordBreak: 'break-word',
						whiteSpace: 'normal'
					}}>
						{item.name}
					</div>
				);
			},
		},
		{
			id: 3,
			Header: 'Dish Picture',
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<img
						style={{
							padding: '6px',
							cursor: 'pointer',
							width: '100%',
							height: '100px',
						}}
						src={item.image_url}
					/>
				);
			},
		},
		{
			id: 4,
			Header: 'Dish As Recommended',
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>
						{item.is_recommended == 1 ? (
							<ToggleOnIcon
								onClick={() => handleStatus(item.id)}
								style={{ color: 'green', fontSize: '35' }}
							/>
						) : (
								<ToggleOffIcon
									onClick={() => handleStatus(item.id)}
									style={{ color: 'red', fontSize: '35' }}
								/>
							)}
					</div>
				);
			},
		},
		{
			id: 5,
			Header: 'Dish As QuickFilter',
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>
						{item.is_quick_filter == 1 ? (
							<ToggleOnIcon
								onClick={() => handleQuickFilterStatus(item.id)}
								style={{ color: 'green', fontSize: '35' }}
							/>
						) : (
								<ToggleOffIcon
									onClick={() => handleQuickFilterStatus(item.id)}
									style={{ color: 'red', fontSize: '35' }}
								/>
							)}
					</div>
				);
			},
		},
		{
			id: 6,
			Header: 'Price per dish',
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>
						$ {item.price}
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
							justifyContent: 'space-evenly',
						}}
						className='text-center'
						onClick={(e) => e.stopPropagation()}>
						<FontAwesomeIcon
							style={{ cursor: 'pointer' }}
							onClick={() =>
								history.push(`/${path}/${id}/viewDish/${item.id}`)
							}
							className='text-red-600 trash w-5 h-5'
							color='red'
							icon={faEye}
						/>
						<FontAwesomeIcon
							style={{ cursor: 'pointer' }}
							onClick={() =>
								history.push(`/${path}/${id}/editDish/${item.id}`)
							}
							className='text-red-600 trash w-5 h-5'
							color='red'
							icon={faPencilAlt}
						/>
						<FontAwesomeIcon
							className='text-red-600 trash w-5 h-5'
							color='red'
							onClick={() => handleDeleteDish(item.id)}
							icon={faTrashAlt}
						/>
					</div>
				);
			},
		},
	];

	useEffect(() => {
		if (categoryLists.length) {
			setColumns(column);
			currentId = 0
		}
	}, [categoryLists]);

	const handleDeleteDish = (id) => {
		setDishId(id);
		setDeleteModal(true);
	};


	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	useEffect(() => {
		getMenuDetails();
	}, [searchText, activePage]);

	const getMenuDetails = async () => {
		try {
			setLoading(true);
			let currentPage = searchText.length > 0 ? 1 : activePage;

			const res = await getMenuLists(token, id, searchText, currentPage, pageSize);
			if (res.status == 200) {
				setLoading(false);
				let newStartId = pageSize * (activePage - 1);
				setStartId(newStartId);
				setError(null);
				setTotalItems(res.dishes.count);
				let rows = res.dishes.rows
				rows.map((row, id) => {
					row.idx = id + 1;
				})
				setMenuLists(rows);
				if (searchText.length) {
					setCurrentPage(1);
				}
			}
		} catch (error) {
			setLoading(false);
			setError(error);
			let newStartId = startId - 1;
			setStartId(newStartId);
			setTotalItems(0);
			setMenuLists([]);
		}
	};

	useEffect(() => {
		getCategoryList(token)
			.then((res) => {
				setCategoryLists(res.dishCategories);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const handleDelete = () => {
		deleteDish(token, dishId)
			.then((res) => {
				getMenuDetails();
				setDeleteModal(false);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	const handleStatus = (id) => {
		settoggleId(id);
		setShowStatus(!showStatus);
	};

	const handleQuickFilterStatus = (id) => {
		settoggleQuickFilterId(id);
		setQuickFilterStatus(!quickFilterStatus);
	};

	useEffect(() => {
		if (showStatus) {
			handleStatusChange();
		}
		else if(quickFilterStatus){
			handleQuickFilterStatusChange();
		}
	}, [toggleId, showStatus, toggleQuickFilterId ,quickFilterStatus]);

	const handleStatusChange = async () => {
		try {
			const res = await getToggleDishAsRecommended(token, parseInt(toggleId));
			if (res.status == 200) {
				getMenuDetails();
				setShowStatus(!showStatus);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleQuickFilterStatusChange = async () => {
		try {
			const res = await getToggleDishAsQuickFilter(token, parseInt(toggleQuickFilterId));
			if (res.status == 200) {
				getMenuDetails();
				setQuickFilterStatus(!quickFilterStatus);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<div className='main-content pb-16 md:pb-5 flex-1 pt-20 px-2' style={{ height: '100vh' }}>
				{/* <GlobalFilterData /> */}
				<div style={{ marginLeft: '1rem', fontSize: '2rem' }}>
					Menu Management
				</div>
				<button
					style={{ height: '3rem' }}
					type='button'
					className='shadow bg-500 mt-10 ml-3 hover:bg-white-400 focus:shadow-outline focus:outline-none text-black font-bold py-1 px-4 rounded'
					onClick={() => {
						history.push(`/viewRestaurant/${id}`);
						dispatch({
							type: 'ORDER_SEARCH_TEXT',
							payload: null,
						})
					}}>
					Restaurant Details
				</button>
				<button
					style={{ height: '3rem' }}
					disabled
					className='shadow mt-10 bg-blue-500 ml-3 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-1 px-4 rounded'
					type='button'>
					Menu Management
				</button>

				<div
					id='recipients'
					className='p-4 md:p-8 mt-6 lg:mt-0 rounded shadow bg-white'>
					<div className='flex flex-wrap -mx-3 mb-6'>
						<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
							<SearchBox
								setSearchText={(val) =>
									dispatch({
										type: 'ORDER_SEARCH_TEXT',
										payload: val,
									})
								}
								searchText={searchText}
								placeholder='Search by name,category'
							/>
						</div>

						<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0 search-text'>
							<button
								onClick={() => history.push(`/${path}/${id}/addDish`)}
								className='shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
								type='button'>
								Add New
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
					{categoryLists && (
						<ReactTable
							showPagination={false}
							minRows={0}
							NoDataComponent={() => null}
							defaultPageSize={10}
							data={menuLists}
							loading={loading}
							className='-highlight'
							columns={columns}
							style={{
								width: '100%',
							}}
						/>
					)}
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
			{deleteModal && <DeleteModal  {...{ deleteModal, setDeleteModal, name: 'Dish', handleDelete }} />}
		</>
	);
}

export default Menumanagement;
