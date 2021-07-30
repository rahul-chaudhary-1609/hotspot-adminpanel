import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { getNotificationDetails } from '../../../api';
import { useSelector } from 'react-redux';

const ViewNotification = (props) => {
	const history = useHistory();
	const token = useSelector((state) => state.auth.isSignedIn);
	const { id } = useParams();
	const [notification, setNotification] = useState(props.location.state);
	return (
		<div className='main-content md:pb-5 flex-1 p-8 px-2' style={{ overflowY: 'auto', height: '100vh' }}>
				<div id='recipients' className='p-4 md:p-8 mt-6 lg:mt-0 rounded shadow bg-white'>
					<h1 className='text-xl'>Notification Details</h1>

					<button
						style={{ height: '3rem' }}
						onClick={() => history.push('/notification')}
						className='shadow bg-blue-500 ml-3 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
						type='button'>
						Back
					</button>
				

				{notification && (
					<div className='bg-gray-100 form-layout text-base border border-gray-200 mt-10'>
						<div className='flex flex-row items-center '>
							<div className=' font-semibold py-4 px-6 w-1/3 text-right'>
								Title
							</div>
							<div className='px-8' style={{width:"780px"}}>{notification.title}</div>
						</div>
						<div className='flex flex-row items-center border-t border-gray-200'>
							<div className=' font-semibold py-4 px-6 w-1/3 text-right'>
								Description
							</div>
							<div className='px-8' style={{width:"780px"}}>{notification.description}</div>
						</div>
						<div className='flex flex-row items-center border-t border-gray-200'>
							<div className='font-semibold py-4 px-6 w-1/3 text-right'>
								Send To
							</div>
							<div className='px-8' style={{width:"780px"}}>
								{(function () {
									if (notification.type == 1) {
										return 'All Users';
									} else if (notification.type == 2) {
										return 'Driver';
									} else if (notification.type == 3) {
										return 'Customer only';
									} else if (notification.type == 4) {
										return 'Restaurant only';
									}
								})()}
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default ViewNotification;
