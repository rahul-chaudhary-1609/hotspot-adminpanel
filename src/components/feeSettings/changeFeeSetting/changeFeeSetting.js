import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import { getFee } from '../../../api';

const ChangeFeeSetting = (props) => {
	const customsStyles = {
		content: {
			width: '40%',
			top: '50%',
			left: '50%',
			right: 'auto',
			bottom: 'auto',
			marginRight: '-50%',
			transform: 'translate(-50%, -50%)',
		},
	};

	const customStyles = {
		control: (provided, state) => ({
			...provided,
			width: '98%',
			backgroundColor: '#fafafa',
			borderColor: 'grey',
		}),
		container: (provided, state) => ({
			...provided,
			width: '60%',
			fontSize: '12px',
			marginLeft: '15px',
		}),
	};

	const token = useSelector((state) => state.auth.isSignedIn);

	const closeModal = () => {
		props.setIsOpen(false);
	};

	useEffect(() => {
		if (props.id) {
			getFeeDetails();
		}
	}, [props.id]);

	const getFeeDetails = () => {
		let id = props.id;
		getFee(token, id)
			.then((resp) => {
				props.setFeeDetails(resp.fee);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	return (
		<>
			<Modal
				isOpen={props.modalIsOpen}
				onRequestClose={closeModal}
				style={customsStyles}>
				<h1 style={{ fontSize: '30px', textAlign: 'center' }}>
					{props.title} Fee
				</h1>
				<div className='flex flex-row items-center mt-5  '>
					<div className='   w-1/3 text-left '>Fee Type</div>
					<Select
						value={props.feeType}
						styles={customStyles}
						options={[
							{
								label: 'Driver Fee',
								value: 'driver',
							},
							{
								label: 'Restaurant Fee',
								value: 'restaurant',
							},
							{
								label: 'Hotspot Fee',
								value: 'hotspot',
							},
						]}
						inputId='order_type'
						placeholder='Select the type..'
						onChange={(selectedValue) => props.setFeeType(selectedValue)}
					/>
				</div>
				<div className='flex flex-row  mt-5  '>
					<div className='w-1/2 text-left '>Order Range</div>
					<input
						className='appearance-none block w-1/3 ml-10 bg-gray-100 border border-100 rounded-half py-2 px-6 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200'
						value={props.orderRangeFrom}
						onChange={(e) => props.setOrderRangeFrom(e.target.value)}
					/>{' '}
					<p style={{ fontSize: '30px', marginTop: '5px' }}>$</p>
					<p className='text-xl ml-3 mr-3'>To</p>
					<input
						className='appearance-none block w-1/3 bg-gray-100 border border-100 rounded-half py-2 px-6 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200'
						value={props.orderRangeTo}
						onChange={(e) => {
							props.setOrderRangeTo(e.target.value);
						}}
					/>
					<p style={{ fontSize: '30px', marginTop: '5px' }}>$</p>
				</div>
				<div className='flex flex-row items-center mt-5  '>
					<div className='w-1/2 text-left '>{`${props.feeType ? props.feeType.label.split(" ")[0]: "Driver"}'s earnings /order`}</div>
					<input
						className='appearance-none ml-5 block w-1/3 bg-gray-100 border border-100 rounded-half py-2 px-8 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200'
						value={props.fee}
						id='fee'
						onChange={(e) => props.setFee(e.target.value)}
					/>{' '}
					<input
						className='appearance-none block w-1/6 text-center bg-red-500 ml-4 border border-100 rounded-half py-2 px-6 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200'
						value='$'
						disabled
					/>
					<input
						className='appearance-none block w-1/6 font-weight-bold text-center bg-white-500 ml-4 text-semibold border border-100 rounded-half py-2 px-6 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200'
						value='%'
						disabled
					/>
				</div>

				<div style={{ display: 'flex', marginTop: '40px' }}>
					<button
						onClick={closeModal}
						style={{
							width: '100%',
							height: '40px',
							backgroundColor: 'red',
							color: 'white',
							
						}}>
						Cancel
					</button>
					<button
						onClick={props.handleFee}
						style={{
							width: '100%',
							height: '40px',
							backgroundColor: 'green',
							color: 'white',
							marginLeft: '5px',
							
						}}>
						Save
					</button>
				</div>
			</Modal>
		</>
	);
};

export default ChangeFeeSetting;
