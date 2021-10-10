/**
 * The file is covered under Algoworks Work Product License for Design & Development of Mobile Application for “Hotspot”.
 * Please review the license for full details.
 * This program is not free software: You cannot redistribute it for any use under the terms of the Algoworks Work Product License for Design & Development of Mobile Application for “Hotspot”.
 * However the source can be modified and updated for the working of the application Design & Development of Mobile Application for “Hotspot” for which it was licensed.
*/

import React, { useEffect, useState } from 'react';
import CommonTable from './commonTable';
import { getFeeList, listRestaurant, getTipAmount } from '../../api';
import { useSelector } from 'react-redux';
import { addFee, editFee, editRestaurantFee, deleteDriverFee } from '../../api';
import ChangeFeeSetting from './changeFeeSetting/changeFeeSetting';
import DeleteModal from '../deleteModal/deleteModal';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TipModal from './changeFeeSetting/tipModal';

toast.configure();
const FeeSettings = () => {
	const token = useSelector((state) => state.auth.isSignedIn);

	const [driverFee, setDriverFee] = useState([]);
	const [restaurantFee, setRestaurantFee] = useState([]);
	const [tipAmount, setTipAmount] = useState([]);
	const [hotspotFee, setHotspotFee] = useState([]);

	const [feeType, setFeeType] = useState(null);
	const [orderRangeFrom, setOrderRangeFrom] = useState(null);
	const [orderRangeTo, setOrderRangeTo] = useState(null);
	const [percentageFee, setPercentageFee] = useState(0);
	const [restaurantName, setRestaurantName] = useState(null)
	const [fee, setFee] = useState(null);

	const [editTip, setEditTip] = useState([])
	const [modalIsOpen, setIsOpen] = useState(false);
	const [isRestaurant, setIsRestaurant] = useState(false);
	const [title, setTitle] = useState('');
	const [id, setId] = useState(null);
	const [tipModal, setTipModal] = useState(false);

	const [feeDetails, setFeeDetails] = useState(null);
	const [deleteModal, setDeleteModal] = useState(false);
	const [driverFeeId, setDriverFeeId] = useState(null);
	const [successMsg, setSuccessMsg] = useState(null);

	useEffect(() => {
		driverFeeSetting();
		hotspotFeeSetting();
		restaurantFeeSetting();
		tipAmountFetch();
	}, [modalIsOpen]);

	const driverFeeSetting = () => {
		getFeeList(token, 'driver')
			.then((resp) => {
				setDriverFee(resp.driverFeeList.rows);
			})
			.catch((error) => {
				setDriverFee([]);
				console.log(error);
			});
	};
	const hotspotFeeSetting = () => {
		getFeeList(token, 'hotspot')
			.then((resp) => {
				setHotspotFee(resp.hotspotCommissionList);
				setTimeout(() => {
					setSuccessMsg(null);
				}, 1000);
				
			})
			.catch((error) => {
				console.log(error);
				setSuccessMsg(null);
			});
	};
	const restaurantFeeSetting = () => {
		let data={
			query:{
				is_pagination:1,
				page:1,
				page_size:10,
			}
		}
		listRestaurant(token,
			data)
			.then((resp) => {
				setRestaurantFee(resp.restaurantList.rows);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const tipAmountFetch = () => {
		let searchText = '', currentPage = '', pageSize = '';
		getTipAmount(token)
			.then((resp) => {
				setTipAmount(resp.tips);
				setTimeout(() => {
					setSuccessMsg(null);
				}, 1000);
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

	const handleDelete = () => {
		deleteDriverFee(token, driverFeeId)
			.then((res) => {
				driverFeeSetting();
				setDeleteModal(false);				
			})
			.catch((error) => {
				toast.error(error, 
				{position: toast.POSITION.TOP_CENTER})
				console.log(error);
			});
	}

	return (
		<>

			<div className='main-content pb-16 md:pb-5 flex-1 pt-20 px-2' style={{ overflowY: 'scroll', height: '100vh' }}>
			{successMsg && (
						<div
							style={{
								backgroundColor: '#9ACD32',
								padding: '10px',
								marginLeft: 'auto',
								marginRight: 'auto',
								marginTop: '24px',
								width: 'fit-content',
							}}>
							{successMsg}
						</div>
					)}
				<div style={{ display: 'flex' }}>
					<h1 className='text-xl'>
						Fee Setting
					</h1>
					<button
						style={{
							height: '3rem',
							marginLeft: '60%'
						}}
						className='shadow bg-blue-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
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
						setIsRestaurant,
						percentageFee,
						restaurantName,
						setPercentageFee,
						setSuccessMsg,
						successMsg
					}}
				/>
				<TipModal  {...{setTipModal,setEditTip,tipModal,editTip,setSuccessMsg,tipAmountFetch}}></TipModal>
				<CommonTable
					{...{
						title: 'Driver Fee',
						type: 'driver',
						feeSetting: driverFee,
						setIsOpen,
						setTitle,
						setId,
						setDriverFeeId,
						setDeleteModal,
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
				<CommonTable
					{...{
						title: 'Tip Amount',
						type: 'Tip',
						feeSetting: tipAmount,
						setTipModal,
						setEditTip,
					}}
				/>
			</div>
			{deleteModal && <DeleteModal  {...{ deleteModal, setDeleteModal, name: 'Driver Fee', handleDelete }} />}
		</>
	);
};

export default FeeSettings;
