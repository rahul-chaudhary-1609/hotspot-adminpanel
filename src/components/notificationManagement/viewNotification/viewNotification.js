import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { getNotificationDetails } from '../../../api';
import { useSelector } from 'react-redux';

const ViewNotification = () => {
	const history = useHistory();
	const token = useSelector((state) => state.auth.isSignedIn);
	const { id } = useParams();

	const [notification, setNotification] = useState(null);
	useEffect(() => {
		getNotificationDetails(token, id)
			.then((resp) => {
				setNotification(resp);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);
	return (
		<div className='main-content pb-16 md:pb-5 flex-1 pt-20 px-2'>
			<div className='p-4 md:p-8 mt-6 lg:mt-0 rounded shadow bg-white'>
				<h3 className='text-2xl text-gray-400 font-bold mb-6'>
					Notification Details
				</h3>

					<button
						style={{ height: '3rem' }}
						onClick={() => history.push('/notification')}
						className='shadow bg-blue-500 ml-3 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
						type='button'>
						Back
					</button>
				

				{notification && (
					<div className='form-layout text-base border border-gray-200 mt-10' >
						<div className='flex flex-row items-center '>
							<div className='bg-gray-100 font-semibold py-4 px-6 w-1/3 text-right'>
								Title
							</div>
							<div className='px-8'>{notification.title}</div>
						</div>
						<div className='flex flex-row items-center border-t border-gray-200'>
							<div className='bg-gray-100 font-semibold py-4 px-6 w-1/3 text-right'>
								Description
							</div>
							<div className='px-8'>{notification.description}</div>
						</div>
						<div className='flex flex-row items-center border-t border-gray-200'>
							<div className='bg-gray-100 font-semibold py-4 px-6 w-1/3 text-right'>
								Send To
							</div>
							<div className='px-8'>
								{(function () {
									if (notification.sender_id == 1) {
										return 'All Users';
									} else if (notification.sender_id == 2) {
										return 'Driver';
									} else if (notification.sender_id == 3) {
										return 'Customer only';
									} else if (notification.sender_id == 4) {
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
