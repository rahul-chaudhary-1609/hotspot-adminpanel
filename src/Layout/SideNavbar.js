import React from 'react';
import { NavLink } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import '../css/disableField.css';
import { useLocation } from 'react-router';
import { useDispatch } from 'react-redux';

function SideNavbar() {
	const dispatch = useDispatch();
	const handleSearch = () => {
		dispatch({
			type: 'SEARCH_TEXT',
			payload: null,
		});
	};

	const { pathname } = useLocation();
	console.log("pathname",pathname.split('/')[1])
	
	return (
		<div style={{width: '23rem',height: "100vh",overflow:"scroll" }} className='bg-gray-dark md:pt-16 '>
			<ul className='flex flex-row md:flex-col  md:mt-5'>
				{SidebarData.map((item, index) => {
					return (
						<li key={index} className='nav-link md:py-1' onClick={handleSearch}>
							<NavLink
								to={item.to}
								className={item.cName}
								activeClassName='md:border-l-2 border-b-2 md:border-b-0 active'>
								{item.icon}
								<span className='md:ml-3 whitespace-no-wrap block md:inline-block text-sm md:text-lg'>
									{' '}
									{item.label}
								</span>
							</NavLink>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export default SideNavbar;
