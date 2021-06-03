import React from 'react';
import { NavLink } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import '../css/disableField.css';
import { useDispatch } from 'react-redux';

function SideNavbar() {
	const dispatch = useDispatch();
	const handleSearch = () => {
		dispatch({
			type: 'SEARCH_TEXT',
			payload: null,
		});
	};
	return (
		<div
			style={{ width: '23rem', height: 'calc(100vh - 68px)' }}
			className='bg-gray-dark  fixed bottom-0 md:relative md:min-h-screen z-10 w-full md:w-64 md:pt-24 md:pb-5 md:mt-0 overflow-x-scroll md:overflow-x-hidden'>
			<div
				className='brand-logo justify-center hidden md:flex'
				style={{ backgroundColor: 'white' , height:'150px', marginTop:'-28px'}}>
				<img
					src={require('../assets/img/hotspotLogo.png')}
					alt=''
					style={{
						maxWidth: '35%',
						// backgroundColor: 'white',
						height:'100px',
						marginTop:'20px',
						borderRadius: '.5rem',
						padding: '10px',
					}}
				/>
			</div>
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
