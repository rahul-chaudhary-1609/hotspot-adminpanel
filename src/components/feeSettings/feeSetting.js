import React, { useEffect, useState } from 'react';
import CommonTable from './commonTable';
import { getFeeList, getRestaurantLists } from '../../api';
import { useSelector } from 'react-redux';
import { addFee, editFee, editRestaurantFee, deleteDriverFee } from '../../api';
import ChangeFeeSetting from './changeFeeSetting/changeFeeSetting';
import DeleteModal from '../deleteModal/deleteModal';


const FeeSettings = () => {
	const token = useSelector((state) => state.auth.isSignedIn);

	const [driverFee, setDriverFee] = useState([]);
	const [restaurantFee, setRestaurantFee] = useState([]);
	const [hotspotFee, setHotspotFee] = useState([]);

	const [feeType, setFeeType] = useState(null);
	const [orderRangeFrom, setOrderRangeFrom] = useState(null);
	const [orderRangeTo, setOrderRangeTo] = useState(null);
	const [percentageFee, setPercentageFee] = useState(0);
	const [restaurantName, setRestaurantName] = useState(null)
	const [fee, setFee] = useState(null);

	const [modalIsOpen, setIsOpen] = useState(false);
	const [isRestaurant, setIsRestaurant] = useState(false);
	const [title, setTitle] = useState('');
	const [id, setId] = useState(null);

	const [feeDetails, setFeeDetails] = useState(null);
	const [deleteModal, setDeleteModal] = useState(false);
	const [driverFeeId, setDriverFeeId] = useState(null);

	useEffect(() => {
		driverFeeSetting();
		hotspotFeeSetting();
		restaurantFeeSetting();
	}, [modalIsOpen]);

	const driverFeeSetting = () => {
		getFeeList(token, 'driver')
			.then((resp) => {
				setDriverFee(resp.driverFeeList.rows);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	const hotspotFeeSetting = () => {
		getFeeList(token, 'hotspot')
			.then((resp) => {
				setHotspotFee(resp.hotspotCommissionList);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	const restaurantFeeSetting = () => {
		let searchText = '', currentPage = '', pageSize = '';
		getRestaurantLists(token,
			searchText,
			currentPage,
			pageSize)
			.then((resp) => {
				setRestaurantFee(resp.restaurantList.rows);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		if (feeDetails) {
			const { fee_type, order_range_from, order_range_to, fee, percentage_fee, restaurant_name } = feeDetails;
			if (fee_type === 'driver') {
				setFeeType({ label: 'Driver Fee', value: 'driver' });
			} else if (fee_type === 'hotspot') {
				setFeeType({
					label: 'Hotspot Fee',
					value: 'hotspot',
				});
			} else if (fee_type === 'restaurant') {
				setFeeType({
					label: 'Restaurant Fee',
					value: 'restaurant',
				});
			}

			setRestaurantName(restaurant_name);
			setPercentageFee(percentage_fee);
			setOrderRangeFrom(order_range_from);
			setOrderRangeTo(order_range_to);
			setFee(fee);
		}
	}, [feeDetails]);

	const handleFee = () => {
		if (isRestaurant) {
			if (percentageFee == '')
				alert('Please nter Restaurant Percentage Fee!');
			else {
				let data = {
					restaurant_id: id,
					percentage_fee: parseInt(percentageFee)
				};
				editRestaurantFee(token, data)
					.then((resp) => {
						setIsOpen(false);
						setIsRestaurant(false);
					})
					.catch((error) => {
						console.log(error);
					});
			}
		}
		else {
			if (title === 'Add') {
				let data = {
					order_range_from: orderRangeFrom,
					order_range_to: orderRangeTo,
					fee: fee,
				};
				addFee(token, data)
					.then((resp) => {
						setIsOpen(false);
					})
					.catch((error) => {
						console.log(error);
					});
			} else if (title === 'Edit') {
				let data = {
					order_range_from: orderRangeFrom,
					order_range_to: orderRangeTo,
					fee_id: id,
					fee: fee,
				};
				editFee(token, id, data)
					.then((resp) => {
						setIsOpen(false);
					})
					.catch((error) => {
						console.log(error);
					});
			}
		}
	};

	const handleDelete = () => {
		deleteDriverFee(token, driverFeeId)
			.then((res) => {
				setDeleteModal(false);
				driverFeeSetting();
			})
			.catch((error) => {
				console.log(error);
			});
	}

	return (
		<>
			<div className='main-content pb-16 md:pb-5 flex-1 pt-20 px-2' style={{ height: '100vh' }}>
				<div style={{ display: 'flex' }}>
					<h1 style={{ fontSize: '40px' }} className='text-xl mt-10 ml-10'>
						Fee Setting
					</h1>
					<button
						style={{
							height: '3rem',
							marginLeft: '60%'
						}}
						className='shadow mt-10 h-2 bg-blue-500 ml-3 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-1 px-4 rounded'
						type='button'
						onClick={() => {
							setOrderRangeFrom(null);
							setOrderRangeTo(null);
							setFeeType(null);
							setFee(null);
							setIsOpen(true);
							setTitle('Add');
						}}>
						Add Driver Fee
					</button>
				</div>
				<ChangeFeeSetting
					{...{
						setIsOpen,
						modalIsOpen,
						handleFee,
						setOrderRangeFrom,
						setOrderRangeTo,
						setFee,
						setFeeType,
						orderRangeTo,
						orderRangeFrom,
						fee,
						feeType,
						title,
						id,
						setFeeDetails,
						isRestaurant,
						percentageFee,
						restaurantName,
						setPercentageFee
					}}
				/>
				<CommonTable
					{...{
						title: 'Driver Fee',
						type: 'driver',
						feeSetting: driverFee,
						setIsOpen,
						setTitle,
						setId,
						setDriverFeeId,
						setDeleteModal
					}}
				/>
				<CommonTable
					{...{
						title: 'Restaurant Fee',
						type: 'restaurant',
						feeSetting: restaurantFee,
						setIsOpen,
						setTitle,
						setId,
						setIsRestaurant
					}}
				/>
			</div>

			{deleteModal && <DeleteModal  {...{ deleteModal, setDeleteModal, name: 'Driver Fee', handleDelete }} />}
		</>
	);
};

export default FeeSettings;
