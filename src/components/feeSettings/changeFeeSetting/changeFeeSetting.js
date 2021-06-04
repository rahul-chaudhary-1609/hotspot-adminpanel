import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import { getFee, getRestaurantById, addFee, editFee, editRestaurantFee } from '../../../api';

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
	const [error, setError] = useState(null)

	const closeModal = () => {
		props.setIsOpen(false);
		setError(null);
		if (props.isRestaurant)
			props.setIsRestaurant(!props.isRestaurant);

	};

	useEffect(() => {
		if (props.isRestaurant) {
			getRestaurantDetails();
			setError(null);
		}

			getFeeDetails();
	}, [props.id, props.isRestaurant,props.isOpen]);

	const getRestaurantDetails = () => {
		let id = props.id

		getRestaurantById(token, id)
			.then((resp) => {
				props.setFeeDetails(resp.restaurant);
			})
			.catch((error) => {
				console.log(error);
			});
	}
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

	const handleFee = () => {
		if (props.isRestaurant) {
			if (props.percentageFee > 100)
				setError('Restaurant percentage fee cannot exceed 100%!');
			else if (props.percentageFee < 0 || props.percentageFee == 0)
				setError('Restaurant percentage fee cannot be negative or 0% !');
			else if (props.percentageFee == '')
				setError('Please enter Restaurant Percentage Fee!');
			else {
				let data = {
					restaurant_id: props.id,
					percentage_fee: parseFloat(props.percentageFee)
				};
				editRestaurantFee(token, data)
					.then((resp) => {
						props.setIsOpen(false);
						props.setIsRestaurant(false);
						setError(null);
					})
					.catch((error) => {
						setError(error)
						console.log(error);
					});
			}
		}
		else {
			if (props.title === 'Add') {
				let data = {
					order_range_from: parseInt(props.orderRangeFrom),
					order_range_to: parseInt(props.orderRangeTo),
					fee: parseFloat(props.fee).toFixed(2),
				};
				addFee(token, data)
					.then((resp) => {
						props.setIsOpen(false);
						setError(null);
					})
					.catch((error) => {
						setError(error)
						console.log(error);
					});
			} else if (props.title === 'Edit') {
				if (parseInt(props.fee) < 0 || parseInt(props.fee) == 0)
					setError('Driver Fee cannot be negative or 0!');
				else {
					let data = {
						order_range_from: parseInt(props.orderRangeFrom),
						order_range_to: parseInt(props.orderRangeTo),
						fee_id: parseInt(props.id),
						fee: parseFloat(props.fee).toFixed(2)
					};
					editFee(token, props.id, data)
						.then((resp) => {
							props.setIsOpen(false);
							setError(null);
						})
						.catch((error) => {
							setError(error)
							console.log(error);
						});
				}
			}
		}
	};

	return (
		<>
			{props.isRestaurant == true ?
				<Modal
					isOpen={props.modalIsOpen}
					onRequestClose={closeModal}
					style={customsStyles}>
					<h1 style={{ fontSize: '30px', textAlign: 'center' }}>
						Edit Restaurant Fee
			</h1>
					<div className='flex flex-row items-center mt-5  '>
						<div className='   w-1/3 text-left '>Fee Type</div>
						<b style={{ marginBottom: "0px", paddingLeft: "100px" }}>Restaurant Fee</b>
					</div>
					<div className='flex flex-row items-center mt-5  '>
						<div className='   w-1/3 text-left '>Restaurant Name</div>
						<b style={{ marginBottom: "0px", paddingLeft: "100px" }}>{props.restaurantName}</b>
					</div>
					<div className='flex flex-row items-center mt-5  '>
						<div className='w-1/2 text-left '>Percentage Fee</div>
						<input
							type="number"
							min="0"
							max="100"
							className='appearance-none block w-1/3 bg-gray-100 border border-100 rounded-half py-2 px-8 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200'
							value={props.percentageFee}
							id='fee'
							onChange={(e) => props.setPercentageFee(e.target.value)}
						/>{' '}
						<input
							className='appearance-none block w-1/6 text-center bg-red-500 ml-4 border border-100 rounded-half py-2 px-6 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200'
							value='%'
							disabled
						/>
					</div>
					<div>{error && (
						<p
							style={{
								color: 'red',
								fontSize: '20px',
								textAlign: 'center',
								width: '100%',
							}}>
							{error}
						</p>
					)}</div>
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
							type='submit'
							onClick={handleFee}
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
				: <Modal
					isOpen={props.modalIsOpen}
					onRequestClose={closeModal}
					style={customsStyles}>
					<h1 style={{ fontSize: '30px', textAlign: 'center' }}>
						{props.title} Driver Fee
				</h1>
					<div className='flex flex-row items-center mt-5  '>
						<div className='   w-1/3 text-left '>Fee Type</div>
						<b style={{ marginBottom: "0px", paddingLeft: "8px" }}>Driver Fee</b>
					</div>
					<div className='flex flex-row  mt-5  '>
						<div className='w-1/2 text-left ' style={{ marginTop: "27px" }}>Order Range</div>
						<input
							className='appearance-none block w-1/3 ml-10 bg-gray-100 border border-100 rounded-half py-2 px-6 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200'
							value={props.orderRangeFrom}
							style={{ marginLeft: "-10px" }}
							onChange={(e) => props.setOrderRangeFrom(e.target.value)}
						/>{' '}
						<p style={{ fontSize: '30px', marginTop: '15px',paddingLeft: '7px' }}>$</p>
						<p className='text-xl ml-3 mr-3' style={{ marginTop: "23px" }}>To</p>
						<input
							className='appearance-none block w-1/3 bg-gray-100 border border-100 rounded-half py-2 px-6 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200'
							value={props.orderRangeTo}
							onChange={(e) => {
								props.setOrderRangeTo(e.target.value);
							}}
						/>
						<p style={{ fontSize: '30px', marginTop: '15px' ,paddingLeft: '7px'}}>$</p>
					</div>
					<div className='flex flex-row items-center mt-5  '>
						<div className='w-1/2 text-left '>{`${props.feeType ? props.feeType.label.split(" ")[0] : "Driver"}'s earnings`}</div>
						<input
							type="number"
							min="0"
							className='appearance-none block w-1/3 bg-gray-100 border border-100 rounded-half py-2 px-8 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200'
							style={{ marginLeft: "-96px" }}
							value={props.fee}
							id='fee'
							onChange={(e) => props.setFee(e.target.value)}
						/>
						<p style={{ fontSize: '30px', marginTop: '15px',paddingLeft: '7px' }}>$</p>
					</div>
					<div>{error && (
						<p
							style={{
								color: 'red',
								fontSize: '20px',
								textAlign: 'center',
								width: '100%',
							}}>
							{error}
						</p>
					)}</div>
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
							onClick={handleFee}
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
				</Modal>}
		</>
	);
};

export default ChangeFeeSetting;
