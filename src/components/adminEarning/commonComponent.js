import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router';

const CommonComponent = () => {
	const history = useHistory();
	const { pathname } = useLocation();

	return (
		<>
			<div style={{ marginLeft: '1rem', fontSize: '2rem' }}>
				Admin Earning
				</div>
			<div style={{ display: 'flex' }}>
				<button
					style={{ height: '3rem', width: '50%', marginRight: '-10px' }}
					className={
						pathname === '/hotspotEarning'
							? 'shadow mt-10 bg-blue-500 ml-3 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-1 px-4 rounded'
							: 'shadow bg-500 mt-10 ml-3 hover:bg-white-400 focus:shadow-outline focus:outline-none text-black font-bold py-1 px-4 rounded'
					}
					type='button'
					onClick={() => history.push('/hotspotEarning')}>
					Hotspot Delivery
					</button>
				<button
					style={{ height: '3rem', width: '50%' }}
					onClick={() => history.push('/pickupEarning')}
					className={
						pathname === '/pickupEarning'
							? 'shadow mt-10 bg-blue-500 ml-3 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-1 px-4 rounded'
							: 'shadow bg-500 mt-10 ml-3 hover:bg-white-400 focus:shadow-outline focus:outline-none text-black font-bold py-1 px-4 rounded'
					}
					type='button'>
					Pickup
					</button>
			</div>
		</>
	);
};

export default CommonComponent;
