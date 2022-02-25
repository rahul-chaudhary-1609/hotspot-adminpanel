import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getCustomerById, changeCustomerStatus } from '../../../api';
import StatusManagement from '../../statusManagement/statusManagement';
import {formatDate} from '../../../utils/redableDateTime'
import moment from 'moment';

const ViewCustomerDetails = () => {
	const history = useHistory();
	const { id } = useParams();

	const token = useSelector((state) => state.auth.isSignedIn);
	const [customerDetails, setCustomerDetails] = useState(null);
	const [modalIsOpen, setIsOpen] = useState(false);

	useEffect(() => {
		getCustomer();
	}, []);

	const getCustomer = async () => {
		try {
			const res = await getCustomerById(token, id);
			if (res.status == 200) {
				setCustomerDetails(res.customer);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleStatusChange = async () => {
		try {
			const status = customerDetails.status == 1 ? 0 : 1;
			const res = await changeCustomerStatus(token, id, status);
			if (res.status == 200) {
				history.push('/customer');
				setIsOpen(false);
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<>
			{customerDetails && (
				<div className='main-content md:pb-5 flex-1 p-8 px-2' style={{ overflowY: 'auto', height: '100vh' }}>
				<div id='recipients' className='p-4 md:p-8 mt-6 lg:mt-0 rounded shadow bg-white'>
					<h1 className='text-xl'>Customer Details</h1>
						<button
							style={{ height: '3rem' }}
							onClick={() => history.push('/customer')}
							className='shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
							type='button'>
							Back
						</button>
						<button
							style={{ height: '3rem' }}
							onClick={() => {
								setIsOpen(true);
							}}
							className='shadow bg-blue-500 ml-3 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
							type='button'>
							Active/Deactive
						</button>

						<StatusManagement
							{...{
								setIsOpen,
								modalIsOpen,
								details: customerDetails,
								name: 'Customer',
								handleStatusChange,
							}}
						/>

						<div class='flex flex-wrap -mx-3 justify-center'>
							<div class='w-40 px-3 mb-6 mt-4 flex justify-center flex-wrap'>
								<div class='border rounded-full overflow-hidden w-24 h-24'>
									<img
										id='avtar'
										class='rounded-full h-full w-full'
										alt='profile-img'
										src={
											customerDetails.profilePictureURL == null
												? require('../../../assets/img/icon-user.png')
												: customerDetails.profilePictureURL
										}
										accept='image/*'
									/>
								</div>
							</div>
						</div>
					
						<div className='form-layout text-base border border-gray-200'>
						<div className='flex flex-row items-center '>
							<div className='bg-gray-100 font-semibold py-4 px-6 w-1/3 text-right'>
								Name
							</div>
							<div className='px-8'>{customerDetails.name}</div>
						</div>
						<div className='flex flex-row items-center border-t border-gray-200 '>
							<div className='bg-gray-100 font-semibold py-4 px-6 w-1/3 text-right '>
								Email Address
							</div>
							<div className='px-8'>{customerDetails.email}</div>
						</div>
						<div className='flex flex-row items-center border-t border-gray-200'>
							<div className='bg-gray-100 font-semibold py-4 px-6 w-1/3 text-right'>
								Phone Number
							</div>
							<div className='px-8'>
								{customerDetails.phone && customerDetails.phone.trim()?`(${customerDetails.phone.slice(0, 3)}) ${customerDetails.phone.slice(3, 6)}-${customerDetails.phone.slice(6)}`:null}
								
							</div>
						</div>
						<div className='flex flex-row items-center border-t border-gray-200'>
							<div className='bg-gray-100 font-semibold py-4 px-6 w-1/3 text-right'>
								Registered ON
							</div>
							<div className='px-8'>
								{moment(customerDetails.signupDate,"YYYY-MM-DDTHH:mm:ssZ").format("M/D/YYYY h:mm a")}
							</div>
						</div>
						<div className='flex flex-row items-center border-t border-gray-200'>
							<div className='bg-gray-100 font-semibold py-4 px-6 w-1/3 text-right'>
								City
							</div>
							<div className='px-8'>{customerDetails?.city}</div>
						</div>
						<div className='flex flex-row items-center border-t border-gray-200'>
							<div className='bg-gray-100 font-semibold py-4 px-6 w-1/3 text-right'>
								State
							</div>
							<div className='px-8'>{customerDetails?.state}</div>
						</div>
						<div className='flex flex-row items-center border-t border-gray-200'>
							<div className='bg-gray-100 font-semibold py-4 px-6 w-1/3 text-right'>
								Status
							</div>
							<div className='px-8'>
								{customerDetails.status == 1 ? 'Active' : 'Deactive'}
							</div>
						</div>
						<div className='flex flex-row items-center border-t border-gray-200'>
							<div className='bg-gray-100 font-semibold py-4 px-6 w-1/3 text-right'>
								Hotspot Credits
							</div>
							<div className='px-8'>
								{customerDetails.hotspot_credit}
							</div>
						</div>
					</div>
					</div>
				</div>
			)}
		</>
	);
};

export default ViewCustomerDetails;
