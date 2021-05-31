import React from 'react';
import { useHistory, useLocation } from 'react-router';
import {  useDispatch } from 'react-redux';

const ButtonLayouts = () => {
	const history = useHistory();
	const { pathname } = useLocation();
	const dispatch = useDispatch();
	return (
		<>
			<div>
				<button
					style={{ height: '2rem' }}
					className={
						pathname === '/order'
							? 'bg-blue-500 ml-3 hover:bg-blue-400 shadow mt-10 focus:shadow-outline focus:outline-none text-white font-bold py-1 px-4 rounded'
							: 'shadow bg-500 mt-10 ml-3 h-2 hover:bg-white-400 focus:shadow-outline focus:outline-none text-black font-bold py-1 px-4 rounded'
					}
					type='button'
					disabled={pathname === '/order'}
					onClick={() => {
						dispatch({
							type: 'SEARCH_TEXT',
							payload: null,
						});
						dispatch({
							type: 'STATUS',
							payload: null,
						});
						history.push('/order');
					}}>
					{/* {pathname === '/order' ? 'New Orders' : 'Orders'} */}
					Active Orders
				</button>
				<button
					style={{ height: '2rem' }}
					onClick={() => {
						dispatch({
							type: 'SEARCH_TEXT',
							payload: null,
						});
						dispatch({
							type: 'STATUS',
							payload: null,
						});
						history.push('/scheduledOrders');
					}}
					className={
						pathname === '/scheduledOrders'
							? 'bg-blue-500 ml-3 hover:bg-blue-400 shadow mt-10 focus:shadow-outline focus:outline-none text-white font-bold py-1 px-4 rounded'
							: 'shadow bg-500 mt-10 ml-3 h-2 hover:bg-white-400 focus:shadow-outline focus:outline-none text-black font-bold py-1 px-4 rounded'
					}
					type='button'
					disabled={pathname === '/scheduledOrders'}>
					Scheduled Orders
				</button>
				<button
					style={{ height: '2rem' }}
					onClick={() => {
						dispatch({
							type: 'SEARCH_TEXT',
							payload: null,
						});
						history.push('/completedOrders');
					}}
					className={
						pathname === '/completedOrders'
							? 'bg-blue-500 ml-3 hover:bg-blue-400 shadow mt-10 focus:shadow-outline focus:outline-none text-white font-bold py-1 px-4 rounded'
							: 'shadow bg-500 mt-10 ml-3 h-2 hover:bg-white-400 focus:shadow-outline focus:outline-none text-black font-bold py-1 px-4 rounded'
					}
					type='button'
					disabled={pathname === '/completedOrders'}>
					Completed Orders
				</button>
			</div>
		</>
	);
};

export default ButtonLayouts;
