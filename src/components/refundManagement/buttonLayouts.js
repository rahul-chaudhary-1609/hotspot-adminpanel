import React from 'react';
import { useHistory, useLocation } from 'react-router';
import {  useDispatch } from 'react-redux';

const ButtonLayouts = () => {
	const history = useHistory();
	const { pathname } = useLocation();
	const dispatch = useDispatch();
	return (
		<>
			<div style={{display:'flex'}}>
				<button
					style={{ height: '3rem', width: '100%'}}
					className={
						pathname === '/payments'
						? 'shadow bg-blue-500  hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-1 px-4 rounded'
						: 'shadow bg-500  hover:bg-white-400 focus:shadow-outline focus:outline-none text-black font-bold py-1 px-4 rounded'
					}
					type='button'
					disabled={pathname === '/payments'}
					onClick={() => {
						dispatch({
							type: 'SEARCH_TEXT',
							payload: null,
						});
						dispatch({
							type: 'STATUS',
							payload: null,
						});
						history.push('/payments');
					}}>
					{/* {pathname === '/order' ? 'New Orders' : 'Orders'} */}
					Payments
				</button>
				<button
					style={{ height: '3rem', width: '100%'}}
					onClick={() => {
						dispatch({
							type: 'SEARCH_TEXT',
							payload: null,
						});
						dispatch({
							type: 'STATUS',
							payload: null,
						});
						history.push('/refunds');
					}}
					className={
						pathname === '/refunds'
						? 'shadow bg-blue-500  hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-1 px-4 rounded'
							: 'shadow bg-500  hover:bg-white-400 focus:shadow-outline focus:outline-none text-black font-bold py-1 px-4 rounded'
					}
					type='button'
					disabled={pathname === '/refunds'}>
					Refunds
				</button>
			</div>
		</>
	);
};

export default ButtonLayouts;
