import React, { useEffect, useState } from 'react';
import CommonTable from './commonTable';
import { getFeeList } from '../../api';
import { useSelector } from 'react-redux';
import { addFee, editFee } from '../../api';
import ChangeFeeSetting from './changeFeeSetting/changeFeeSetting';

const FeeSettings = () => {
	const token = useSelector((state) => state.auth.isSignedIn);

	const [driverFee, setDriverFee] = useState([]);
	const [restaurantFee, setRestaurantFee] = useState([]);
	const [hotspotFee, setHotspotFee] = useState([]);

	const [feeType, setFeeType] = useState(null);
	const [orderRangeFrom, setOrderRangeFrom] = useState(null);
	const [orderRangeTo, setOrderRangeTo] = useState(null);
	const [fee, setFee] = useState(null);

	const [modalIsOpen, setIsOpen] = useState(false);
	const [title, setTitle] = useState('');
	const [id, setId] = useState(null);

	const [feeDetails, setFeeDetails] = useState(null);

	useEffect(() => {
		driverFeeSetting();
		hotspotFeeSetting();
		restaurantFeeSetting();
	}, [modalIsOpen]);

	const driverFeeSetting = () => {
		getFeeList(token, 'driver')
			.then((resp) => {
				setDriverFee(resp.driverFeeList);
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
		getFeeList(token, 'restaurant')
			.then((resp) => {
				setRestaurantFee(resp.restaurantCommissionList);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		if (feeDetails) {
			const { fee_type, order_range_from, order_range_to, fee } = feeDetails;
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

			setOrderRangeFrom(order_range_from);
			setOrderRangeTo(order_range_to);
			setFee(fee);
		}
	}, [feeDetails]);

	const handleFee = () => {
		let data = {
			order_range_from: orderRangeFrom,
			order_range_to: orderRangeTo,
			fee_type: feeType.value,
			fee: fee,
		};
		if (title === 'Add') {
			addFee(token, data)
				.then((resp) => {
					setIsOpen(false);
				})
				.catch((error) => {
					console.log(error);
				});
		} else if (title === 'Edit') {
			editFee(token, id, data)
				.then((resp) => {
					setIsOpen(false);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};
	return (
		<>
			<div className='main-content pb-16 md:pb-5 flex-1 pt-20 px-2' style={{overflowY: 'scroll', height: '100vh'}}>
				<div style={{ display: 'flex' }}>
					<h1 style={{ fontSize: '40px' }} className='text-xl mt-10 ml-10'>
						Fee Setting
					</h1>
					<button
						style={{ height: '3rem',
						marginLeft:'60%'
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
						Add New
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
					}}
				/>
				<CommonTable
					{...{
						title: 'Restaurant commission',
						type: 'restaurant',
						feeSetting: restaurantFee,
						setIsOpen,
						setTitle,
						setId,
					}}
				/>
				<CommonTable
					{...{
						title: 'Hotspot commission',
						type: 'hotspot',
						feeSetting: hotspotFee,
						setIsOpen,
						setTitle,
						setId,
					}}
				/>
			</div>
		</>
	);
};

export default FeeSettings;
