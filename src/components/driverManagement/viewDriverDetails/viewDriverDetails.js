import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getDriverById, approveDriver, changeDriverStatus } from '../../../api';
import { useSelector } from 'react-redux';
import DriverForm from './driverForm';
import StatusManagement from '../../statusManagement/statusManagement';

const ViewDriverDetails = () => {
	const history = useHistory();
	const [modalIsOpen, setIsOpen] = useState(false);
	const { id } = useParams();
	const [loading, setLoading] = useState(false);
	const [driverDetails, setDriverDetails] = useState(null);
	const token = useSelector((state) => state.auth.isSignedIn);

	useEffect(() => {
		getDriverDetails();
	}, []);

	const getDriverDetails = async () => {
		try {
			setLoading(true);
			const res = await getDriverById(token, id);
			if (res.status == 200) {
				let updatedDetails = { ...res };
				let phone = res.personalDetails.phone_no;

				res.personalDetails['phone_no'] = `(${phone.slice(0, 3)}) ${phone.slice(
					3,
					6
				)}-${phone.slice(6)}`;

				setDriverDetails(updatedDetails);
				setLoading(false);
			}
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};

	const handleApproveDriver = async () => {
		try {
			const res = await approveDriver(token, id);
			console.log(res);
			if (res.status == 200) {
				history.push('/driver');
			}
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};

	const handleStatusChange = async () => {
		try {
			const status = driverDetails.personalDetails.status == 1 ? 0 : 1;
			const res = await changeDriverStatus(token, id, status);
			if (res.status == 200) {
				history.push('/driver');
				setIsOpen(false);
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<>
			<div
				className='main-content pb-16 md:pb-5 flex-1 pt-20 px-2'
				style={{ overflowY: 'scroll', height: '100vh' }}>
				<div className='p-4 md:p-8 mt-6 lg:mt-0 rounded shadow bg-white'>
					<div style={{ display: 'flex' }}>
						<h3 className='text-2xl text-gray-400 font-bold mb-6'>
							Driver Details
						</h3>
						{/* {driverDetails && driverDetails.personalDetails.is_approved && (
							<button
								style={{ height: '3rem', position: 'absolute', right: '50px' }}
								onClick={() => history.push('/driver')}
								className='shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
								type='button'>
								View Calendar
							</button>
						)} */}
					</div>

					<button
						style={{ height: '3rem' }}
						onClick={() => history.push('/driver')}
						className='shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
						type='button'>
						Back
					</button>
					{driverDetails && driverDetails.personalDetails.approval_status == 1 && (
						<>
							<button
								style={{ height: '3rem' }}
								onClick={() => {
									setIsOpen(true);
								}}
								className='shadow bg-blue-500 ml-3 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
								type='button'>
								Active/Deactive
							</button>
						</>
					)}

					{driverDetails && (
						<StatusManagement
							{...{
								setIsOpen,
								modalIsOpen,
								details: driverDetails.personalDetails,
								handleStatusChange,
								name: 'Driver',
							}}
						/>
					)}

					<DriverForm {...{ driverDetails, disable: true }} />
					{driverDetails && driverDetails.personalDetails.approval_status == 0 && (
						<div
							style={{
								marginLeft: '72%',
								marginTop: '-74px',
							}}>
							{/* <button
								style={{ height: '3rem' }}
								// onClick={() => {setIsOpen(true);}}
								className='shadow bg-blue-500  ml-3 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
								type='button'>
								Reject
							</button> */}
							<button
								style={{ height: '3rem' }}
								onClick={handleApproveDriver}
								className='shadow bg-blue-500  ml-3 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
								type='button'>
								Approve
							</button>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default ViewDriverDetails;
